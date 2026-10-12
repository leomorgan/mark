import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LeoMark, HREF, TEAL } from "../index.js";

const html = (props) => renderToStaticMarkup(h(LeoMark, props));

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
