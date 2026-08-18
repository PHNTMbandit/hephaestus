# Accessibility Feature Spec — Colour Palette

Brief design sheet for the palette **Accessibility** tab. Scope: recommend the best
foreground (text) colour for every swatch, and grade every foreground/background pair
against **WCAG 2.2** and **APCA**. This is a spec only — no implementation here.

> Note: the `Accessibility` tab already exists in `PalettePanelTabs` but currently has no
> `<TabsPanel value="accessibility">`, so it renders nothing. This spec defines what should
> fill it. A `getForeground` + `getWCAGRating` helper already lives in
> `src/features/color/utils/accessibility.ts` and can be extended.

---

## 1. Goals

- For each colour in the palette, suggest the **best on-colour text** (a "black or white",
  or tuned tint/shade — Material-style `onColor`).
- Show a **contrast grade** for each suggested pair using both WCAG 2.2 and APCA.
- Let the user pick the grading standard and the **use case** (normal text, large text, UI).
- Make failures obvious and offer a one-click "fix to pass" suggestion.

## 2. Terminology

| Term                   | Meaning                                                     |
| ---------------------- | ----------------------------------------------------------- |
| Background             | The palette swatch colour.                                  |
| Foreground / on-colour | The text/icon colour placed on the swatch.                  |
| Pair                   | A (background, foreground) combination that gets graded.    |
| Standard               | The contrast algorithm: `WCAG21/22` (ratio) or `APCA` (Lc). |

---

## 3. Foreground recommendation ("onColor")

Two selectable strategies, default = **Tuned**:

1. **Binary (black/white)** — pick pure black or white, whichever has the higher contrast
   against the swatch. Simplest, matches many design tokens.
2. **Tuned (Material-style)** — derive a tinted foreground from the swatch itself for a more
   harmonious look (e.g. very light tint of the hue on dark colours, dark shade on light
   colours), then verify it still passes the chosen threshold; fall back to binary if it fails.

Recommendation algorithm (per swatch):

```
input:  background, standard, useCase (normal | large | ui)
1. candidateFg = strategy(background)          // binary or tuned
2. score = contrast(standard, background, candidateFg)
3. if score meets threshold(standard, useCase) -> return { fg, score, pass: true }
4. else escalate: push candidate toward pure black/white until it passes or is exhausted
5. return best { fg, score, pass }
```

Output per swatch:

- `foreground` (hex)
- `onColorRole` (e.g. `on-light` / `on-dark`) — useful for exporting design tokens
- `pass` / grade (see below)

---

## 4. WCAG 2.2 grading

Contrast ratio = `(L1 + 0.05) / (L2 + 0.05)` on relative luminance (already available via
`chroma.contrast`). WCAG 2.2 keeps the same **1.4.3 / 1.4.6 / 1.4.11** thresholds as 2.1, so
the existing `WCAG_GRADES` table can be reused.

| Use case                           | AA    | AAA   |
| ---------------------------------- | ----- | ----- |
| Normal text (< 18pt / < 14pt bold) | ≥ 4.5 | ≥ 7.0 |
| Large text (≥ 18pt / ≥ 14pt bold)  | ≥ 3.0 | ≥ 4.5 |
| UI components & graphics (1.4.11)  | ≥ 3.0 | —     |

Display: badge per pair — `AAA` / `AA` / `AA Large` / `Fail` (reuse `ColorWCAG`).
Show the raw ratio (e.g. `5.31:1`) next to the badge.

WCAG 2.2 additions worth surfacing (non-contrast, informational only): 2.4.11 Focus Not
Obscured, 2.5.8 Target Size (min 24×24px). List as guidance, not computed.

---

## 5. APCA grading

APCA (used by WCAG 3 drafts) returns a polarity-aware **Lc** value (roughly −108…+106) rather
than a ratio. It models text weight/size instead of a single pass/fail.

- Compute Lc for the (text, background) pair. Sign indicates polarity (dark-on-light vs
  light-on-dark) — keep the absolute value for grading, keep the sign for display.
- Grade against a **Lc lookup by font size + weight** rather than one number.

Suggested simplified thresholds (abs Lc):

| Use case                        | Target Lc |
| ------------------------------- | --------- |
| Body text (~16px 400)           | ≥ 75      |
| Large / bold text (~24px 700)   | ≥ 60      |
| Non-text UI / large headings    | ≥ 45      |
| Minimum for any meaningful text | ≥ 30      |

Display: numeric `Lc 78` plus a pass/near/fail chip against the selected use case.

> Library: use a dedicated APCA package (e.g. `apca-w3` / `apca-w3` `APCAcontrast`) rather than
> hand-rolling. `chroma-js` does **not** compute APCA.

---

## 6. UI / interaction

Accessibility tab contents (top → bottom):

1. **Controls row**
   - Standard toggle: `WCAG 2.2` | `APCA` | `Both`.
   - Use-case select: `Normal text` | `Large text` | `UI / non-text`.
   - Foreground strategy: `Binary` | `Tuned`.
2. **Per-colour list** (one row per palette colour):
   - Swatch preview with the recommended foreground rendered as sample text ("Aa 123").
   - Recommended foreground hex + copy button.
   - Grade badge(s): WCAG label + ratio, and/or APCA Lc.
   - `Fix` action → nudge foreground (or swatch) to the nearest passing value.
3. **Summary bar**: e.g. "8/10 pass AA · 5/10 pass AAA · 7/10 pass APCA body".

States: pass = success tone, fail = error tone (reuse existing `Badge` tones).

---

## 7. Data shape (suggested)

```ts
type ContrastStandard = 'wcag22' | 'apca'
type UseCase = 'normal' | 'large' | 'ui'
type ForegroundStrategy = 'binary' | 'tuned'

type PairResult = {
  background: string
  foreground: string
  wcag: { ratio: number; grade: 'AAA' | 'AA' | 'AA Large' | 'Fail' }
  apca: { lc: number; pass: boolean }
}
```

---

## 8. Suggested build order

1. Add `getForegroundTuned` alongside existing `getForeground`; add `getAPCA` helper (new dep).
2. Extend `WCAG_GRADES` usage with the `useCase` threshold (normal vs large vs ui).
3. Build `<TabsPanel value="accessibility">` content + controls state.
4. Wire the per-colour list to the current palette `colors` from `usePalette()`.
5. Add `Fix` action (dispatch `UPDATE` with the corrected hex).

## 9. Out of scope (for now)

- Colour-blindness simulation / CVD-safe palette checks.
- Automatic re-generation of an entire accessible palette.
- Exporting accessibility report (PDF/CSV).
