# Archived designs

Kinetic, Editorial, Blueprint and Hazard. The site ships Matchday only; these
are kept so nothing is lost. None of this is compiled: `archive/` is excluded
in `tsconfig.json`, and nothing under `app/` or `components/` imports it.

```
designs/<name>/      the design's components, as they were at launch
designs/tokens.css   their colour/font blocks and textures from globals.css
shared/              the design picker, its cookie sync, and Hazard's barcode
designs.ts           lib/designs.ts with all five ids and the picker settings
registry.ts          components/designs/registry.ts with all five
design-frame.tsx     the page frame that read ?design= and the cookie
```

## Bringing one back

1. Move `designs/<name>` back to `components/designs/<name>`.
2. Add its id to `DESIGN_IDS` and its entry to `DESIGNS` (see the copies here).
3. Paste its block from `designs/tokens.css` into `app/globals.css`, and add its
   fonts back in `app/layout.tsx` (Kinetic: Anton + IBM Plex Mono; Editorial:
   Instrument Serif + Newsreader; Blueprint: IBM Plex Sans Condensed; Hazard:
   Archivo with the `wdth` axis).
4. For the picker as well, restore `shared/` and `design-frame.tsx`.

They were written against the shared code as it was on 2026-10-01, so expect
small fixes if `lib/content.ts` or the shared components have moved on since.
