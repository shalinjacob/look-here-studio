import test from "node:test";
import assert from "node:assert/strict";
import { orderShipping } from "../config/shipping";

const magnet = [{ slug: "x-unlisted", qty: 1 }];

test("below minimum: zone fee is added", () => {
  assert.deepEqual(orderShipping("560001", magnet, 349), { fee: 150, zone: "Bengaluru", free: false, toFree: 250 });
  assert.equal(orderShipping("110001", magnet, 900)?.fee, 350);
});
test("Bengaluru free from 599, elsewhere from 999", () => {
  assert.equal(orderShipping("560001", magnet, 599)?.fee, 0);
  assert.equal(orderShipping("110001", magnet, 599)?.fee, 350);
  assert.equal(orderShipping("110001", magnet, 999)?.fee, 0);
  assert.equal(orderShipping("781001", magnet, 999)?.fee, 0);
});
test("bulky extra still applies when free", () => {
  assert.equal(orderShipping("560001", [{ slug: "pink-wavy-mirror", qty: 1 }], 5000)?.fee, 350);
});
test("invalid pincode returns null", () => {
  assert.equal(orderShipping("12", magnet, 5000), null);
});
