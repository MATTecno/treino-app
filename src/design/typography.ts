// src/design/typography.ts
import { TextStyle } from 'react-native';
import { theme } from './theme';

export function t(style: keyof typeof theme.typography, color: string = theme.colors.text): TextStyle {
  const s = theme.typography[style];
  return { fontSize: s.size, lineHeight: s.lineHeight, fontWeight: s.weight, color };
}
