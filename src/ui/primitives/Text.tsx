import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { t } from '../../design/typography';
import { theme } from '../../design/theme';

type Variant = 'h1' | 'h2' | 'h3' | 'body' | 'caption';
type Props = TextProps & { variant?: Variant; dim?: boolean; style?: TextStyle | TextStyle[] };

export function Text({ variant='body', dim, style, ...rest }: Props) {
  const base = t(variant, dim ? theme.colors.textDim : theme.colors.text);
  return <RNText style={[base, style]} {...rest} />;
}
