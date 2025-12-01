/**
 * Type definitions for react-ai-highlight-parser
 */

/** Highlight mode options */
export type HighlightMode = 'highlights' | 'underline' | 'both' | 'none';

/** Available color palettes */
export type PaletteName = 'vibrant' | 'natural';

/** 
 * Highlight codes used in AI responses
 * Y=Yellow, B=Blue, O=Orange, G=Green, R=Red, P=Pink, L=Light blue, GR=Gray, H=Purple, BR=Brown
 */
export type HighlightCode = 'Y' | 'B' | 'O' | 'G' | 'R' | 'P' | 'L' | 'GR' | 'H' | 'BR';

/** Color palette structure */
export interface ColorPalette {
  background: Record<HighlightCode, string>;
  underline: Record<HighlightCode, string>;
}

/** Parser options */
export interface ParseOptions {
  mode?: HighlightMode;
  palette?: PaletteName;
}

/** Props for HighlightRenderer component */
export interface HighlightRendererProps {
  /** The AI response text containing highlight codes */
  content: string;
  /** Display mode: highlights, underline, both, or none */
  mode?: HighlightMode;
  /** Color palette to use */
  palette?: PaletteName;
  /** Additional CSS class */
  className?: string;
}

/** Semantic meanings for each highlight code */
export const HIGHLIGHT_MEANINGS: Record<HighlightCode, string> = {
  'Y': 'Important/Key points',
  'B': 'Concepts/Definitions', 
  'O': 'Steps/Sequences',
  'G': 'Success/Positive',
  'R': 'Warnings/Errors',
  'P': 'Examples',
  'L': 'Data/Numbers',
  'GR': 'Code/Technical',
  'H': 'Emphasis/Highlights',
  'BR': 'Context/Background'
};
