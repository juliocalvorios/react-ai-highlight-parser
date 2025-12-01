/**
 * react-ai-highlight-parser
 * 
 * Parse and render AI streaming responses with semantic highlighting.
 * Supports multiple modes (highlights, underline, both) and color palettes.
 * 
 * @example
 * ```tsx
 * import { parseHighlights, HighlightRenderer } from 'react-ai-highlight-parser';
 * 
 * // Option 1: Parse to HTML string
 * const html = parseHighlights(aiResponse, 'both', 'vibrant');
 * 
 * // Option 2: Use React component
 * <HighlightRenderer content={aiResponse} mode="both" palette="vibrant" />
 * ```
 * 
 * @packageDocumentation
 */

// Types
export type { 
  HighlightMode, 
  PaletteName, 
  HighlightCode, 
  ColorPalette,
  ParseOptions,
  HighlightRendererProps 
} from './types';

export { HIGHLIGHT_MEANINGS } from './types';

// Parser functions
export { 
  parseHighlights,
  processResponse,
  removeHighlightCodes,
  hasHighlights,
  extractHighlightCodes
} from './parser';

// Palettes
export { 
  PALETTES,
  VIBRANT,
  NATURAL,
  getPalette,
  getBackgroundColor,
  getUnderlineColor
} from './palettes';

// Components
export { 
  HighlightRenderer,
  HighlightSpan
} from './components/HighlightRenderer';

// Default export
export { HighlightRenderer as default } from './components/HighlightRenderer';
