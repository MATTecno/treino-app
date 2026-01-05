export const theme = {
    colors: {
        bg: '#0B0B0C',
        surface: '#121214',
        surfaceAlt: '#1C1C1F',
        text: '#FFFFFF',
        textDim: '#B5B5BD',
        primary: '#7C3AED',
        primaryAlt: '#9F67FF',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        border: '#2A2A2E',
    },
    spacing: (n: number) => n * 4, // 4px grid
    radius: {
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        full: 999,
    },
    typography: {
        h1: { size: 28, lineHeight: 34, weight: '700' as const },
        h2: { size: 22, lineHeight: 28, weight: '700' as const },
        h3: { size: 18, lineHeight: 24, weight: '600' as const },
        body: { size: 16, lineHeight: 22, weight: '400' as const },
        caption: { size: 13, lineHeight: 18, weight: '400' as const },
    },
    shadow: {
        card: { elevation: 2 },
    },
} as const;

export type Theme = typeof theme;
