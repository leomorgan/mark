# mark

The maker's mark for my apps: `leomorgan●ai`, linking to [leomorgan.ai](https://leomorgan.ai).

It's one React component with no props to set. The letters are outlines of Mona Sans Medium, so no app loads the font. They take the surrounding text colour, and the full stop is teal (`#0fa89b`) unless the app gives it one of its own colours. It renders on the server and ships no JavaScript.

## Install

```sh
pnpm add github:leomorgan/mark#v1.2.0
```

## Use

```tsx
import { LeoMark } from "@leomorgan/mark";

<LeoMark />
```

Put it where a screen ends: below the main view, at the foot of a sheet or a sign-in page. `className` and `style` are passed through for placing it. The link and the look are fixed here, so every app stays the same.

## Colour the dot

Each app can give the full stop one of its own colours by setting `--leomark-dot` in its CSS, on `:root` or on anything
around the mark. Left unset, it's teal. Only the dot changes: the letters always take the text colour.

```css
/* M808: the dot in the agent's violet */
:root { --leomark-dot: var(--agent); }
```

The link is at least 44px tall, so it's easy to tap, and a negative margin takes the extra height back, so it takes no more room than the letters.

## On leomorgan.ai only

leomorgan.ai uses the mark as its header logo, linked home with its own `next/link`, because a link to `https://leomorgan.ai` would take staging visitors to production. For that one place there's the bare glyph, with no link:

```tsx
import Link from "next/link";
import { LeoMarkGlyph } from "@leomorgan/mark";

<Link href="/" aria-label="leomorgan.ai">
  <LeoMarkGlyph />
</Link>
```

It takes `className` and an optional `title`, nothing else. With no title it's hidden from screen readers, so the link around it gives the name. Every other app uses `<LeoMark />`.

## Change it

Edit `index.js`, or regenerate the outlines with `scripts/outline.py` and Mona Sans from [google/fonts](https://github.com/google/fonts/tree/main/ofl/monasans). Then tag a new version and bump it in each app.

Mona Sans is by GitHub, under the SIL Open Font License 1.1.
