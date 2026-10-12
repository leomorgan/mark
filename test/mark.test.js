import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LeoMark, LeoMarkGlyph, HREF, TEAL } from "../index.js";

const html = (props) => renderToStaticMarkup(h(LeoMark, props));
const glyph = (props) => renderToStaticMarkup(h(LeoMarkGlyph, props));

// <LeoMark /> as v1.0.0 rendered it.
const V1_0_0 = readFileSync(new URL("./v1.0.0.html", import.meta.url), "utf8").trim();
const HIT_AREA = /padding:(\d+)px 0;margin:-(\d+)px 0/;

test("links to leomorgan.ai with a readable name", () => {
  const out = html();
  assert.match(out, new RegExp(`^<a href="${HREF}" aria-label="leomorgan.ai"`));
  assert.match(out, /<svg[^>]*aria-hidden="true"/);
});

test("letters take the text colour and the full stop is teal", () => {
  const out = html();
  assert.match(out, /<path d="M[^"]+" fill="currentColor"/);
  assert.match(out, new RegExp(`<circle[^>]*fill="${TEAL}"`));
});

test("apps can place it but can't change where it goes", () => {
  const out = html({ className: "mt-4", href: "https://example.com", style: { marginTop: 8 } });
  assert.match(out, /class="mt-4"/);
  assert.match(out, new RegExp(`href="${HREF}"`));
  assert.doesNotMatch(out, /example\.com/);
  assert.match(out, /margin-top:8px/);
});

test("the link is at least 44px square but takes no more room than the mark", () => {
  const out = html();
  const [, padding, margin] = out.match(HIT_AREA).map(Number);
  const width = Number(out.match(/<svg width="([\d.]+)"/)[1]);
  const height = Number(out.match(/<svg[^>]* height="([\d.]+)"/)[1]);
  assert.ok(height + 2 * padding >= 44, `the link is ${height + 2 * padding}px tall`);
  assert.ok(width >= 44, `the link is ${width}px wide`);
  assert.equal(margin, padding, "the negative margin takes back all the padding");
});

test("<LeoMark /> renders as v1.0.0 did, apart from the hit area", () => {
  const out = html();
  assert.notEqual(out, V1_0_0, "the hit area grew");
  assert.equal(out.replace(HIT_AREA, ""), V1_0_0.replace(HIT_AREA, ""));
});

test("the glyph is the same SVG with no link", () => {
  const out = glyph();
  assert.equal(out, html().match(/<svg.*<\/svg>/)[0]);
  assert.doesNotMatch(out, /<a |href/);
});

test("the glyph is hidden from screen readers unless it has a title", () => {
  assert.match(glyph(), /^<svg[^>]* aria-hidden="true"/);
  const named = glyph({ title: "leomorgan.ai" });
  assert.doesNotMatch(named, /aria-hidden/);
  assert.match(named, /^<svg[^>]* role="img"[^>]*><title>leomorgan.ai<\/title><path /);
});

test("the glyph takes a className and nothing else", () => {
  const out = glyph({ className: "h-4 w-auto", style: { color: "red" }, onClick: () => {}, href: "/" });
  assert.match(out, /^<svg[^>]* class="h-4 w-auto"/);
  assert.doesNotMatch(out, /red|href/);
});
