import { test } from "node:test";
import assert from "node:assert/strict";
import { quoteFor, tierFor, SETUP_FEE } from "../config/custom";

test("one piece pays the standard price plus the setup fee", () => {
  const q = quoteFor(549, 1);
  assert.equal(q.unit, 549);
  assert.equal(q.setup, SETUP_FEE);
  assert.equal(q.total, 549 + SETUP_FEE);
});

test("tiers switch at 5, 10 and 25 and the setup fee is waived from 5", () => {
  assert.equal(tierFor(4).discount, 0);
  assert.equal(tierFor(5).discount, 0.1);
  assert.equal(tierFor(9).discount, 0.1);
  assert.equal(tierFor(10).discount, 0.2);
  assert.equal(tierFor(24).discount, 0.2);
  assert.equal(quoteFor(1000, 5).setup, 0);
  assert.equal(quoteFor(1000, 10).total, 8000);
});

test("25 or more is quoted by hand; bad quantities fall back to 1", () => {
  assert.equal(quoteFor(1000, 25).byHand, true);
  assert.equal(quoteFor(1000, 24).byHand, false);
  assert.equal(quoteFor(1000, 0).total, 1000 + SETUP_FEE);
  assert.equal(quoteFor(1000, NaN).total, 1000 + SETUP_FEE);
});
