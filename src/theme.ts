import { themeQuartz } from '@ag-grid-community/theming'

export const gridTheme = themeQuartz.withParams({
  accentColor: '#16A34A',
  backgroundColor: '#000000',
  borderColor: '#203C2A',
  browserColorScheme: 'dark',
  chromeBackgroundColor: {
    ref: 'foregroundColor',
    mix: 0.07,
    onto: 'backgroundColor'
  },
  fontFamily: 'inherit',
  foregroundColor: '#E4E7E5',
  headerFontSize: 14
})
