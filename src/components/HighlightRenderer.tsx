/**
 * HighlightRenderer Component
 * 
 * React component that renders AI responses with semantic highlighting
 */

import React from 'react';
import type { HighlightRendererProps } from '../types';
import { parseHighlights } from '../parser';

/**
 * Renders AI response text with semantic highlighting
 * 
 * @example
 * ```tsx
 * <HighlightRenderer 
 *   content="This is [Y]important[/Y] and this is [B]a concept[/B]"
 *   mode="both"
 *   palette="vibrant"
 * />
 * ```
 */
export function HighlightRenderer({
  content,
  mode = 'highlights',
  palette = 'vibrant',
  className = ''
}: HighlightRendererProps): React.ReactElement {
  const html = parseHighlights(content, mode, palette);

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * Inline version that renders as a span instead of div
 */
export function HighlightSpan({
  content,
  mode = 'highlights',
  palette = 'vibrant',
  className = ''
}: HighlightRendererProps): React.ReactElement {
  const html = parseHighlights(content, mode, palette);

  return (
    <span 
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default HighlightRenderer;
