/**
 * AI Highlight Parser
 * 
 * Parses AI responses containing highlight codes like [Y]text[/Y]
 * and converts them to styled HTML.
 */

import type { HighlightMode, PaletteName, HighlightCode } from './types';
import { getPalette } from './palettes';

// Valid highlight codes
const VALID_CODES: HighlightCode[] = ['Y', 'B', 'O', 'G', 'R', 'P', 'L', 'GR', 'H', 'BR'];

/**
 * Clean and preprocess AI response
 * - Protects code blocks from being processed
 * - Removes invalid/invented codes
 * - Cleans orphaned tags
 */
export function processResponse(text: string): string {
  if (!text) return text;

  let processed = text;

  // 1. Protect code blocks (replace with placeholders)
  const codeBlocks: string[] = [];
  processed = processed.replace(/(```[\s\S]*?```)/g, (match) => {
    const idx = codeBlocks.length;
    codeBlocks.push(match);
    return `___CODE_BLOCK_${idx}___`;
  });

  // 2. Clean invalid codes (full words instead of abbreviations)
  processed = processed
    .replace(/\[GREEN\]([^\[]*)\[\/GREEN\]/gi, '$1')
    .replace(/\[RED\]([^\[]*)\[\/RED\]/gi, '$1')
    .replace(/\[BLUE\]([^\[]*)\[\/BLUE\]/gi, '$1')
    .replace(/\[YELLOW\]([^\[]*)\[\/YELLOW\]/gi, '$1')
    .replace(/\[ORANGE\]([^\[]*)\[\/ORANGE\]/gi, '$1')
    .replace(/\[PURPLE\]([^\[]*)\[\/PURPLE\]/gi, '$1');

  // 3. Clean orphaned tags for each valid code
  VALID_CODES.forEach(code => {
    const validPairRegex = new RegExp(`\\[${code}\\]([^\\[]*)\\[\\/${code}\\]`, 'g');
    const validPairs: string[] = [];
    
    // Find and protect valid pairs
    let tempText = processed.replace(validPairRegex, (match) => {
      const idx = validPairs.length;
      validPairs.push(match);
      return `___VALID_${code}_${idx}___`;
    });
    
    // Remove orphaned tags
    tempText = tempText
      .replace(new RegExp(`\\[${code}\\]`, 'g'), '')
      .replace(new RegExp(`\\[\\/${code}\\]`, 'g'), '');
    
    // Restore valid pairs
    validPairs.forEach((pair, idx) => {
      tempText = tempText.replace(`___VALID_${code}_${idx}___`, pair);
    });
    
    processed = tempText;
  });

  // 4. Restore code blocks
  codeBlocks.forEach((block, idx) => {
    processed = processed.replace(`___CODE_BLOCK_${idx}___`, block);
  });

  return processed;
}

/**
 * Remove all highlight codes from text, keeping only the content
 */
export function removeHighlightCodes(text: string): string {
  let cleaned = text;
  
  VALID_CODES.forEach(code => {
    const regex = new RegExp(`\\[${code}\\]([^\\[]*)\\[\\/${code}\\]`, 'g');
    cleaned = cleaned.replace(regex, '$1');
  });
  
  return cleaned;
}

/**
 * Wrap content with appropriate HTML style based on code and mode
 */
function wrapWithStyle(
  content: string, 
  code: HighlightCode, 
  mode: HighlightMode,
  palette: PaletteName
): string {
  const colors = getPalette(palette);
  const bgColor = colors.background[code] || colors.background['Y'];
  const underlineColor = colors.underline[code] || colors.underline['O'];

  if (mode === 'underline') {
    return `<span style="text-decoration:underline ${underlineColor};text-decoration-thickness:2px;text-underline-offset:2px;text-decoration-skip-ink:none">${content}</span>`;
  } 
  
  if (mode === 'highlights') {
    return `<span style="background-color:${bgColor};padding:1px 3px 0 3px;border-radius:3px;display:inline">${content}</span>`;
  } 
  
  if (mode === 'both') {
    return `<span style="background-color:${bgColor};text-decoration:underline ${underlineColor};text-decoration-thickness:2px;text-underline-offset:2px;text-decoration-skip-ink:none;padding:1px 3px 0 3px;border-radius:3px">${content}</span>`;
  }

  return content;
}

/**
 * Parse highlight codes and apply styles
 * Uses a token-based approach to handle nested tags correctly
 */
export function parseHighlights(
  text: string, 
  mode: HighlightMode = 'highlights',
  palette: PaletteName = 'vibrant'
): string {
  if (!text || mode === 'none') {
    return mode === 'none' ? removeHighlightCodes(text) : text;
  }

  // First, process and clean the response
  let processed = processResponse(text);

  // Process basic markdown (bold, italic, inline code)
  processed = processed.replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>');
  processed = processed.replace(/\*([^*]+?)\*/g, '<em>$1</em>');
  processed = processed.replace(/`([^`]+)`/g, '<code style="background:#f1f1f1;padding:2px 4px;border-radius:3px;font-family:monospace;font-size:0.9em">$1</code>');

  // Check if there are highlight codes
  const hasHighlightCodes = new RegExp(`\\[(${VALID_CODES.join('|')})\\]`).test(processed);
  
  if (!hasHighlightCodes) {
    return processed;
  }

  // Tokenize: split into tags and plain text
  const tokenPattern = new RegExp(`(\\[\\/?(?:${VALID_CODES.join('|')})\\])`, 'g');
  const tokens = processed.split(tokenPattern).filter(t => t.length > 0);

  // Process tokens with a stack for proper nesting
  const stack: Array<{ code: HighlightCode; startIndex: number }> = [];
  const output: string[] = [];

  for (const token of tokens) {
    // Check for opening tag
    const openMatch = token.match(new RegExp(`^\\[(${VALID_CODES.join('|')})\\]$`));
    if (openMatch) {
      stack.push({
        code: openMatch[1] as HighlightCode,
        startIndex: output.length
      });
      continue;
    }

    // Check for closing tag
    const closeMatch = token.match(new RegExp(`^\\[\\/(${VALID_CODES.join('|')})\\]$`));
    if (closeMatch) {
      const code = closeMatch[1] as HighlightCode;
      
      // Find matching opening tag
      let matchIndex = -1;
      for (let j = stack.length - 1; j >= 0; j--) {
        if (stack[j].code === code) {
          matchIndex = j;
          break;
        }
      }

      if (matchIndex !== -1) {
        const open = stack[matchIndex];
        const content = output.slice(open.startIndex).join('');
        
        // Remove collected content from output
        output.splice(open.startIndex);
        
        // Apply styling and add to output
        output.push(wrapWithStyle(content, code, mode, palette));
        
        // Remove from stack
        stack.splice(matchIndex, 1);
      }
      continue;
    }

    // Plain text - add to output
    output.push(token);
  }

  return output.join('');
}

/**
 * Check if text contains any highlight codes
 */
export function hasHighlights(text: string): boolean {
  return new RegExp(`\\[(${VALID_CODES.join('|')})\\]`).test(text);
}

/**
 * Extract all highlight codes used in text
 */
export function extractHighlightCodes(text: string): HighlightCode[] {
  const codes = new Set<HighlightCode>();
  
  VALID_CODES.forEach(code => {
    if (new RegExp(`\\[${code}\\]`).test(text)) {
      codes.add(code);
    }
  });
  
  return Array.from(codes);
}
