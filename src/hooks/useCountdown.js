import { useEffect, useState } from "react";
import { getTimeLeft } from "../utils/date.js";

// Re-renders every second with the time remaining until `targetDate`.
export function useCountdown(targetDate) {
  const targetMs = targetDate ? targetDate.getTime() : NaN;
  const [now, setNow] = useState(() => Date.now());

  const timeLeft = getTimeLeft(targetMs, now);
  const isDone = !timeLeft || timeLeft.isPast;

  useEffect(() => {
    if (isDone) return undefined; // nothing left to count
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [isDone]);

  return timeLeft;
}
