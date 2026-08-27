export const LAUNCH_AT = new Date("2026-09-09T10:00:00+07:00");

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  complete: boolean;
};

export function getCountdownParts(now: Date, target = LAUNCH_AT): CountdownParts {
  const remaining = Math.max(0, target.getTime() - now.getTime());
  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
    seconds: Math.floor((remaining / 1_000) % 60),
    complete: remaining === 0,
  };
}

export function formatCountdownValue(value: number) {
  return String(value).padStart(2, "0");
}
