# Mike

Education customized to take you further.

A mobile prototype built from the Figma file **Mike Microcredentials**, section
`Mobile experience` (node `58:8500`).

## Stack

Vite + React 19 + TypeScript + Tailwind 4 + React Router 7, matching the
conventions used in the portfolio repo (no semicolons, single quotes,
`@theme` tokens rather than a Tailwind config file).

```bash
npm install
npm run dev
```

The root route `/` is a directory of every screen in the prototype. It is not
a designed screen, just a way to reach all 16 routes without clicking through
the whole flow.

## Design tokens

`src/index.css` mirrors the variables published on the Figma section, keeping
Figma's names so design and code refer to the same swatch:

| Token | Value | Figma |
| --- | --- | --- |
| `--color-jetblue-700` | `#5271ff` | primary button background |
| `--color-jetblue-500` | `#4285f4` | link colour, secondary button |
| `--color-grey-200` | `#e8e8e8` | disabled primary background |
| `--color-slate-100` | `#b5b2b2` | disabled primary text |
| `--color-slate-300` | `#424242` | body text (`AppMode/TextColor`) |
| `--color-chip-demand` | `#efd3fa` | "high demand in NYC" chip (sampled) |
| `--color-chip-competition` | `#d3fae4` | "low competition" chip (sampled) |

The full ramp (`jetblue` 100 to 800, greys, slates, button and app-mode
tokens) is in `src/index.css`.

## Frames vs routes

The section holds roughly 25 frames but only 16 destinations. Several frames
are states of the same screen rather than separate screens: Join Mike has an
empty and a filled frame, and "What can we help with?" has empty, selected,
keyboard-open and filled. Those become component state here. `src/data/screens.ts`
records which Figma frames each route covers.

## Status

Scaffold complete: tokens, routing, phone frame, and the button and text field
primitives taken from the style sheet board.

Screens are still placeholders. They are being filled in one at a time from
the Figma Dev Mode MCP server, which is needed for exact spacing and for the
exported icon and image assets (the Mike mark, Google and LinkedIn logos, tab
bar icons, avatars). The remote Figma MCP truncates on this file because the
whole section is a single 13488x3184 node, so per-frame access is required.

### Not yet confirmed against design

- **Typeface.** Inter is a stand-in. The real text styles have not been read
  from Figma yet.
- **Chip geometry.** The corner radius and padding on the market-signal chips
  are approximations. The fill colours are exact.
- **Dark mode.** The style sheet board includes dark variants of the buttons
  and the sign-in screen; not implemented yet.
