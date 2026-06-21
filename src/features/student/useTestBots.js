import { useCallback, useEffect, useRef, useState } from "react";
import { botJoin, botState, botAnswer, answerFor } from "./bots";

const POLL_MS = 2000;
const MAX_BOTS = 16;

/**
 * Gerencia "alunos de teste" que entram na turma e respondem sozinhos quando
 * são sorteados. Roda na aba do professor, sem terminal — para demonstração.
 */
export function useTestBots() {
  const [active, setActive] = useState(false);
  const [starting, setStarting] = useState(false);
  const [count, setCount] = useState(0);
  const [lastAction, setLastAction] = useState(null);
  const botsRef = useRef([]); // [{ name, token }]
  const answeredRef = useRef(new Map()); // token -> último round_id respondido
  const intervalRef = useRef(null);

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    botsRef.current = [];
    answeredRef.current = new Map();
    setActive(false);
    setCount(0);
  }, []);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const poll = useCallback(async () => {
    for (const bot of botsRef.current) {
      try {
        const s = await botState(bot.token);
        const r = s.active_round;
        if (r && r.i_am_victim && !r.already_answered && answeredRef.current.get(bot.token) !== r.round_id) {
          const ans = answerFor(r.question);
          await botAnswer(bot.token, ans);
          answeredRef.current.set(bot.token, r.round_id);
          setLastAction(`${bot.name} respondeu: "${ans}"`);
        }
      } catch {
        /* ignora erros transitórios */
      }
    }
  }, []);

  // names: lista de nomes de alunos da sessão (os bots controlam esses alunos).
  const start = useCallback(async (code, names) => {
    if (!code || !names?.length) return;
    setStarting(true);
    const bots = [];
    for (const name of names.slice(0, MAX_BOTS)) {
      try {
        const token = await botJoin(code, name);
        bots.push({ name, token });
      } catch {
        /* pula aluno que não entrou */
      }
    }
    botsRef.current = bots;
    answeredRef.current = new Map();
    setCount(bots.length);
    setStarting(false);
    if (bots.length === 0) return;
    setActive(true);
    intervalRef.current = setInterval(poll, POLL_MS);
  }, [poll]);

  return { active, starting, count, lastAction, start, stop };
}
