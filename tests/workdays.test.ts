// Run: npm test  (Node's built-in test runner via tsx)
import { test } from "node:test";
import assert from "node:assert/strict";
import { addWorkingDays, dispatchDate, istDate, isWorkingDay, formatYmd } from "../lib/workdays";
import { campaignState, countdownParts } from "../config/campaigns";

test("order on Wed 14 Oct 2026 dispatches Wed 28 Oct 2026 (brief v2 acceptance test)", () => {
  assert.equal(addWorkingDays("2026-10-14"), "2026-10-28");
  assert.equal(formatYmd("2026-10-28"), "Wed 28 Oct 2026");
});

test("order on Mon 9 Nov 2026 dispatches Tue 24 Nov 2026, skipping the 10 Nov holiday", () => {
  assert.equal(addWorkingDays("2026-11-09"), "2026-11-24");
});

test("weekends and holidays are skipped", () => {
  assert.equal(isWorkingDay("2026-10-17"), false); // Sat
  assert.equal(isWorkingDay("2026-11-10"), false); // holiday
  assert.equal(isWorkingDay("2026-10-20"), true); // studio works 20, 21, 26 Oct
  assert.equal(isWorkingDay("2026-10-26"), true);
  assert.equal(addWorkingDays("2026-10-16", 1), "2026-10-19"); // Fri -> Mon
});

test("IST date is used regardless of the instant's UTC date", () => {
  // 14 Oct 23:30 IST is still 14 Oct in IST (18:00 UTC)
  assert.equal(istDate(Date.parse("2026-10-14T23:30:00+05:30")), "2026-10-14");
  // 15 Oct 00:10 IST is 14 Oct in UTC, but 15 Oct in IST
  assert.equal(istDate(Date.parse("2026-10-15T00:10:00+05:30")), "2026-10-15");
  assert.equal(dispatchDate(Date.parse("2026-10-14T12:00:00+05:30")), "2026-10-28");
  // 23:30 IST on 14 Oct is still a 14 Oct order, even though it's 18:00 UTC
  assert.equal(dispatchDate(Date.parse("2026-10-14T23:30:00+05:30")), "2026-10-28");
});

test("banner switches at the right IST instants", () => {
  assert.equal(campaignState(Date.parse("2026-10-06T12:00:00+05:30")), "countdown");
  assert.equal(campaignState(Date.parse("2026-10-14T23:59:00+05:30")), "countdown");
  assert.equal(campaignState(Date.parse("2026-10-15T00:00:00+05:30")), "gift-promise");
  assert.equal(campaignState(Date.parse("2026-11-08T23:59:59+05:30")), "gift-promise");
  assert.equal(campaignState(Date.parse("2026-11-09T00:00:00+05:30")), "none");
  // same instants written in other zones give the same answer
  assert.equal(campaignState(Date.parse("2026-10-14T18:30:00Z")), "gift-promise");
  assert.equal(campaignState(Date.parse("2026-10-14T11:29:00-07:00")), "countdown");
});

test("countdown parts", () => {
  assert.deepEqual(countdownParts(Date.parse("2026-10-13T22:59:59+05:30")), { d: 1, h: 1, m: 0 });
  assert.deepEqual(countdownParts(Date.parse("2026-10-20T00:00:00+05:30")), { d: 0, h: 0, m: 0 });
});
