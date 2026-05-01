import { describe, it, expect, beforeEach } from "vitest";
import { useRoundStore } from "./roundStore";

describe("roundStore", () => {
  beforeEach(() => {
    useRoundStore.getState().reset();
  });

  it("estado inicial: roundNumber=1, sem inquisitor/victim", () => {
    const s = useRoundStore.getState();
    expect(s.roundNumber).toBe(1);
    expect(s.inquisitorId).toBeNull();
    expect(s.victimId).toBeNull();
    expect(s.timer).toBe(30);
    expect(s.timerRunning).toBe(false);
    expect(s.history).toEqual([]);
  });

  it("setRoles armazena ids", () => {
    useRoundStore.getState().setRoles(1, 2);
    expect(useRoundStore.getState().inquisitorId).toBe(1);
    expect(useRoundStore.getState().victimId).toBe(2);
  });

  it("setQuestion adiciona id em questionsUsed sem duplicar", () => {
    useRoundStore.getState().setQuestion(5);
    useRoundStore.getState().setQuestion(5);
    expect(useRoundStore.getState().questionsUsed).toEqual([5]);
  });

  it("startTimer / pauseTimer alteram timerRunning", () => {
    useRoundStore.getState().startTimer();
    expect(useRoundStore.getState().timerRunning).toBe(true);
    useRoundStore.getState().pauseTimer();
    expect(useRoundStore.getState().timerRunning).toBe(false);
  });

  it("tickTimer só decrementa quando running", () => {
    expect(useRoundStore.getState().timer).toBe(30);
    useRoundStore.getState().tickTimer();
    expect(useRoundStore.getState().timer).toBe(30); // não decremento, parado

    useRoundStore.getState().startTimer();
    useRoundStore.getState().tickTimer();
    expect(useRoundStore.getState().timer).toBe(29);
  });

  it("tickTimer para timer em 0 e desliga", () => {
    useRoundStore.setState({ timer: 1, timerRunning: true });
    useRoundStore.getState().tickTimer();
    expect(useRoundStore.getState().timer).toBe(0);
    expect(useRoundStore.getState().timerRunning).toBe(false);
  });

  it("addTime soma e clampa em 999", () => {
    useRoundStore.getState().addTime(15);
    expect(useRoundStore.getState().timer).toBe(45);
    useRoundStore.getState().addTime(9999);
    expect(useRoundStore.getState().timer).toBe(999);
  });

  it("resetTimer restaura timerInitial", () => {
    useRoundStore.setState({ timer: 5, timerRunning: true });
    useRoundStore.getState().resetTimer();
    expect(useRoundStore.getState().timer).toBe(30);
    expect(useRoundStore.getState().timerRunning).toBe(false);
  });

  it("swapRoles troca inquisitor com victim", () => {
    useRoundStore.getState().setRoles(1, 2);
    useRoundStore.getState().swapRoles();
    expect(useRoundStore.getState().inquisitorId).toBe(2);
    expect(useRoundStore.getState().victimId).toBe(1);
  });

  it("addHistory acumula entradas com id", () => {
    useRoundStore.getState().addHistory({ actor: "X", event: "ok", type: "correct" });
    useRoundStore.getState().addHistory({ actor: "Y", event: "no", type: "wrong" });
    const h = useRoundStore.getState().history;
    expect(h).toHaveLength(2);
    expect(h[0].actor).toBe("X");
    expect(h[1].type).toBe("wrong");
  });

  it("nextRound incrementa roundNumber e limpa estado da rodada", () => {
    useRoundStore.getState().setRoles(1, 2);
    useRoundStore.getState().setResult("correct");
    useRoundStore.getState().nextRound();
    const s = useRoundStore.getState();
    expect(s.roundNumber).toBe(2);
    expect(s.inquisitorId).toBeNull();
    expect(s.victimId).toBeNull();
    expect(s.result).toBeNull();
  });
});
