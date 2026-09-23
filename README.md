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

## Figma sections

| Section | Node | Frames |
| --- | --- | --- |
| Sign In | `58:8318` | 9 |
| Profile Setup | `58:8319` | 6 |
| App Experience | `58:8320` | 8 |
| subcomponents | `58:8323` | buttons, logo, colours |

Per-frame context comes from the Figma **Dev Mode MCP server**, which must be
enabled in Figma desktop (Figma menu, Preferences, Enable Dev Mode MCP
Server). The remote Figma MCP cannot read this file: the whole section is one
13488x3184 node and its responses truncate.

Exported assets are committed under `src/assets/`. The Dev Mode server serves
them from `localhost:3845`, which only works while it is running, so the bytes
are checked in rather than referenced.

## Known generator quirks

Two things the code generator reports incorrectly, both confirmed by
rendering the nodes on their own:

- **Status bar.** It exports the base component's black glyphs and omits the
  SystemBlue pill behind the time. Figma renders the pill on every screen,
  white label on `#007aff` for light screens and `#0a84ff` on the splash. The
  pill is drawn in `StatusBar` and the exported glyph vector is tinted through
  a CSS mask so the real letterforms are still used.
- **Frame padding.** It reports symmetric `py-80`. On Join the frame actually
  places its content at y=80 inside a 964 tall frame, leaving 44px beneath.
  Check a frame's own geometry before trusting the reported padding.

Also note Tailwind's preflight sets `line-height: 1.5` while every Figma text
node uses Auto leading (about 1.21 for Inter). The few px per line compound:
on sign-in it pushed the form 19px past the bottom of the frame. Base
line-height is set to `normal` for this reason.

## Status

Built from design context, verified against the Figma render:

- `/splash` — Sign In/0 (`29:1149`)
- `/sign-in` — Sign In/1 (`3:2010`)
- `/join` — Sign In/2 (`3:2093`) and Sign In/wForm (`48:7201`)

The remaining 13 routes still render `PendingScreen`.

### Open items

- **Checkbox and password icons.** Figma exports only the checked checkbox and
  only the `visibility_off` glyph. Both controls toggle, but the unchecked box
  falls back to a plain bordered square and the reveal icon does not change.
  Both paired states need exporting.
- **Chip geometry.** The corner radius and padding on the market-signal chips
  are approximations. The fill colours are exact.
- **Dark mode.** The style sheet board includes dark variants of the buttons
  and the sign-in screen; not implemented.
- **"Forgot password?"** is drawn on Join but set to transparent, so it is kept
  as a spacer. Worth confirming that is deliberate.
