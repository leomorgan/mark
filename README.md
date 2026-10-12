# mark

The maker's mark for my apps: `leomorgan●ai`, linking to [leomorgan.ai](https://leomorgan.ai).

It's one React component with no props to set. The letters are outlines of Mona Sans Medium, so no app loads the font. They take the surrounding text colour, and the full stop is always teal (`#0fa89b`). It renders on the server and ships no JavaScript.

## Install

```sh
pnpm add github:leomorgan/mark#v1.0.0
```

## Use

```tsx
import { LeoMark } from "@leomorgan/mark";

<LeoMark />
```

Put it where a screen ends: below the main view, at the foot of a sheet or a sign-in page. `className` and `style` are passed through for placing it. The link and the look are fixed here, so every app stays the same.

## Change it

Edit `index.js`, or regenerate the outlines with `scripts/outline.py` and Mona Sans from [google/fonts](https://github.com/google/fonts/tree/main/ofl/monasans). Then tag a new version and bump it in each app.

Mona Sans is by GitHub, under the SIL Open Font License 1.1.
