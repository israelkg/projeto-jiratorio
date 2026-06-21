import { create } from "zustand";
import { botJoin, botState, botAnswer, answerFor } from "./bots";

const POLL_MS = 2000;
const MAX_BOTS = 16;

// Estado vivo fora do ciclo de vida do React, para os bots seguirem rodando
// mesmo o professor navegando entre as telas (sorteio, pergunta, rodada...).
let bots = []; // [{ name, token }]
let answered = new Map(); // token -> round_id já respondido
let intervalId = null;

async function pollOnce(set) {
  for (const bot of bots) {
    try {
      const s = await botState(bot.token);
      const r = s.active_round;
      if (r && r.i_am_victim && !r.already_answered && answered.get(bot.token) !== r.round_id) {
        const ans = answerFor(r.question);
        await botAnswer(bot.token, ans);
        answered.set(bot.token, r.round_id);
        set({ lastAction: `${bot.name} respondeu: "${ans}"` });
      }
    } catch {
      /* ignora erros transitórios */
    }
  }
}

export const useBotStore = create((set, get) => ({
  active: false,
  starting: false,
  count: 0,
  lastAction: null,

  start: async (code, names) => {
    if (!code || !names?.length || get().active || get().starting) return;
    set({ starting: true });
    const joined = [];
    for (const name of names.slice(0, MAX_BOTS)) {
      try {
        const token = await botJoin(code, name);
        joined.push({ name, token });
      } catch {
        /* pula aluno que não entrou */
      }
    }
    bots = joined;
    answered = new Map();
    set({ count: joined.length, starting: false });
    if (joined.length === 0) return;
    set({ active: true });
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => pollOnce(set), POLL_MS);
  },

  stop: () => {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
    bots = [];
    answered = new Map();
    set({ active: false, count: 0, lastAction: null });
  },
}));
