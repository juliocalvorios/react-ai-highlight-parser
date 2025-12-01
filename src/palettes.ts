/**
 * Color Palettes for Highlight System
 */

import type { ColorPalette, PaletteName, HighlightCode } from './types';

/**
 * Vibrant palette - Bright, saturated colors
 */
export const VIBRANT: ColorPalette = {
  background: {
    'Y': '#FFF4C3',  // Yellow - Important/key points
    'B': '#D5FEFF',  // Blue - Concepts/definitions
    'O': '#FFD5C3',  // Orange - Steps/sequences
    'G': '#DCFCE7',  // Green - Success/positive
    'R': '#fee2e2',  // Red - Warnings/errors
    'P': '#FEECFF',  // Pink - Examples
    'L': '#E6F3FF',  // Light blue - Data/numbers
    'GR': '#E8E6E5', // Gray - Code/technical
    'H': '#ede9fe',  // Purple - Emphasis/highlights
    'BR': '#f5e8dd'  // Brown - Context/background info
  },
  underline: {
    'Y': '#FFC41A',
    'B': '#5DCFFF',
    'O': '#FF7744',
    'G': '#22C55E',
    'R': '#ef4444',
    'P': '#FC90FF',
    'L': '#8DC5FF',
    'GR': '#ACA8A4',
    'H': '#8b5cf6',
    'BR': '#92400e'
  }
};

/**
 * Natural palette - Earth tones, muted colors
 */
export const NATURAL: ColorPalette = {
  background: {
    'Y': '#F5F0E8',  // Beige/cream
    'B': '#E8F0F4',  // Steel blue light
    'O': '#F5E8DD',  // Tan light
    'G': '#E8EDE6',  // Sage green
    'R': '#F5E8EA',  // Dusty rose
    'P': '#F0EAF5',  // Lavender light
    'L': '#E6EEF3',  // Slate light
    'GR': '#E8E6E5', // Gray
    'H': '#EAE8F0',  // Soft purple
    'BR': '#F0E8E0'  // Warm beige
  },
  underline: {
    'Y': '#9A8B7A',
    'B': '#2C5F6F',
    'O': '#92400E',
    'G': '#6B7056',
    'R': '#7C2D3F',
    'P': '#9B8BA8',
    'L': '#5C7B8B',
    'GR': '#ACA8A4',
    'H': '#7C6B8A',
    'BR': '#8B6B47'
  }
};

/** All available palettes */
export const PALETTES: Record<PaletteName, ColorPalette> = {
  vibrant: VIBRANT,
  natural: NATURAL
};

/** Get a palette by name */
export function getPalette(name: PaletteName = 'vibrant'): ColorPalette {
  return PALETTES[name] || PALETTES.vibrant;
}

/** Get background color for a highlight code */
export function getBackgroundColor(palette: PaletteName, code: HighlightCode): string {
  return getPalette(palette).background[code] || getPalette(palette).background['Y'];
}

/** Get underline color for a highlight code */
export function getUnderlineColor(palette: PaletteName, code: HighlightCode): string {
  return getPalette(palette).underline[code] || getPalette(palette).underline['O'];
}
