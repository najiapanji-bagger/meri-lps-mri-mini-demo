import { describe, expect, it } from "vitest";
import { formatCountdownValue, getCountdownParts, LAUNCH_AT } from "./countdown";

describe("launch countdown", () => {
  it("targets 10:00 Jakarta time on 9 September 2026", () => {
    expect(LAUNCH_AT.toISOString()).toBe("2026-09-09T03:00:00.000Z");
  });

  it("calculates stable date parts", () => {
    const result = getCountdownParts(new Date("2026-09-08T03:00:00.000Z"));
    expect(result).toEqual({ days: 1, hours: 0, minutes: 0, seconds: 0, complete: false });
  });

  it("never returns a negative countdown", () => {
    const result = getCountdownParts(new Date("2026-09-11T00:00:00.000Z"));
    expect(result).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0, complete: true });
  });

  it("formats flip-card values with two digits", () => {
    expect(formatCountdownValue(4)).toBe("04");
    expect(formatCountdownValue(24)).toBe("24");
  });
});
