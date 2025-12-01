# react-ai-highlight-parser

A parser for rendering AI responses with semantic highlighting. Built this because I needed a way to make AI outputs more readable in my projects.

![npm](https://img.shields.io/npm/v/react-ai-highlight-parser)
![license](https://img.shields.io/npm/l/react-ai-highlight-parser)

## What it does

Takes AI responses with highlight codes like `[Y]important[/Y]` and renders them with colors. Three modes: background highlights, underlines, or both. Two color palettes included.

Handles messy AI outputs gracefully. Protects code blocks, cleans up orphaned tags, works fine with streaming responses.

## Demo

Used in production at [veraOS](https://veraos.ai)

## Installation

```bash
npm install react-ai-highlight-parser
```

## Quick Start

### Using the React Component

```tsx
import { HighlightRenderer } from 'react-ai-highlight-parser';

function ChatMessage({ content }) {
  return (
    <HighlightRenderer 
      content={content}
      mode="both"        // 'highlights' | 'underline' | 'both' | 'none'
      palette="vibrant"  // 'vibrant' | 'natural'
    />
  );
}
```

### Using the Parser Function

```tsx
import { parseHighlights } from 'react-ai-highlight-parser';

const aiResponse = "This is [Y]important[/Y] and this is [B]a concept[/B]";
const html = parseHighlights(aiResponse, 'highlights', 'vibrant');

// Returns HTML string with styled spans
```

## Highlight Codes

The AI uses these codes to mark semantic content:

| Code | Color | Meaning |
|------|-------|---------|
| `[Y]` | Yellow | Important/Key points |
| `[B]` | Blue | Concepts/Definitions |
| `[O]` | Orange | Steps/Sequences |
| `[G]` | Green | Success/Positive |
| `[R]` | Red | Warnings/Errors |
| `[P]` | Pink | Examples |
| `[L]` | Light Blue | Data/Numbers |
| `[GR]` | Gray | Code/Technical |
| `[H]` | Purple | Emphasis |
| `[BR]` | Brown | Context/Background |

### Example AI Response

```
Here's how to [O]set up your project[/O]:

1. [Y]Install dependencies[/Y] — this is crucial
2. [B]Configure your environment[/B]
3. [G]Run the tests[/G]

[R]Warning: Don't skip step 1![/R]
```

## Modes

### `highlights` (default)
Applies background colors only.

### `underline`
Applies colored underlines only.

### `both`
Combines background colors with underlines.

### `none`
Removes all highlight codes, returns plain text.

## Palettes

### `vibrant` (default)
Bright, saturated colors for high contrast.

### `natural`
Earth tones and muted colors for a softer look.

## API Reference

### `parseHighlights(text, mode?, palette?)`

Parses text and returns HTML string with highlight styles.

```ts
parseHighlights(
  text: string,
  mode?: 'highlights' | 'underline' | 'both' | 'none',
  palette?: 'vibrant' | 'natural'
): string
```

### `<HighlightRenderer />`

React component that renders highlighted content.

```tsx
<HighlightRenderer
  content={string}
  mode={'highlights' | 'underline' | 'both' | 'none'}
  palette={'vibrant' | 'natural'}
  className={string}
/>
```

### `<HighlightSpan />`

Same as `HighlightRenderer` but renders as `<span>` instead of `<div>`.

### `processResponse(text)`

Cleans AI response: removes invalid codes, protects code blocks, fixes orphaned tags.

### `removeHighlightCodes(text)`

Strips all highlight codes, keeping only the text content.

### `hasHighlights(text)`

Returns `true` if text contains any highlight codes.

### `extractHighlightCodes(text)`

Returns array of highlight codes used in the text.

## Prompting Your AI

To get the AI to use these codes, add this to your system prompt:

```
When responding, use semantic highlighting codes to emphasize important content:
- [Y]text[/Y] for important points
- [B]text[/B] for concepts/definitions
- [O]text[/O] for steps/sequences
- [G]text[/G] for positive/success
- [R]text[/R] for warnings/errors
- [P]text[/P] for examples
- [L]text[/L] for data/numbers
- [GR]text[/GR] for code/technical
- [H]text[/H] for emphasis
- [BR]text[/BR] for context

Use sparingly for clarity. Don't highlight entire paragraphs.
```

## License

MIT © [Julio Calvo](https://juliocalvo.dev)
