import { MonthTheme, MonthThemeData } from '../types/calendar';

const MONTH_THEMES: MonthThemeData[] = [
  { accent: '#1565C0', rangeLight: '#DBEAFE', chevron: '#1565C0', accentDark: '#64B5F6', rangeLightDark: '#1A365D', chevronDark: '#64B5F6' }, // Jan
  { accent: '#4527A0', rangeLight: '#EDE7F6', chevron: '#4527A0', accentDark: '#B39DDB', rangeLightDark: '#311B92', chevronDark: '#B39DDB' }, // Feb
  { accent: '#2E7D32', rangeLight: '#E8F5E9', chevron: '#2E7D32', accentDark: '#81C784', rangeLightDark: '#1B5E20', chevronDark: '#81C784' }, // Mar
  { accent: '#C62828', rangeLight: '#FFEBEE', chevron: '#C62828', accentDark: '#E57373', rangeLightDark: '#b71c1c', chevronDark: '#E57373' }, // Apr
  { accent: '#00695C', rangeLight: '#E0F2F1', chevron: '#00695C', accentDark: '#4DB6AC', rangeLightDark: '#004D40', chevronDark: '#4DB6AC' }, // May
  { accent: '#F57F17', rangeLight: '#FFF8E1', chevron: '#F57F17', accentDark: '#FFF176', rangeLightDark: '#4E342E', chevronDark: '#FFF176' }, // Jun
  { accent: '#0277BD', rangeLight: '#E1F5FE', chevron: '#0277BD', accentDark: '#4FC3F7', rangeLightDark: '#01579B', chevronDark: '#4FC3F7' }, // Jul
  { accent: '#558B2F', rangeLight: '#F1F8E9', chevron: '#558B2F', accentDark: '#AED581', rangeLightDark: '#33691E', chevronDark: '#AED581' }, // Aug
  { accent: '#E65100', rangeLight: '#FBE9E7', chevron: '#E65100', accentDark: '#FFB74D', rangeLightDark: '#4E342E', chevronDark: '#FFB74D' }, // Sep
  { accent: '#BF360C', rangeLight: '#FBE9E7', chevron: '#BF360C', accentDark: '#FF8A65', rangeLightDark: '#4E342E', chevronDark: '#FF8A65' }, // Oct
  { accent: '#37474F', rangeLight: '#ECEFF1', chevron: '#37474F', accentDark: '#90A4AE', rangeLightDark: '#263238', chevronDark: '#90A4AE' }, // Nov
  { accent: '#1A237E', rangeLight: '#E8EAF6', chevron: '#1A237E', accentDark: '#7986CB', rangeLightDark: '#1A237E', chevronDark: '#7986CB' }, // Dec
];

export function useMonthTheme(monthIndex: number, isDark: boolean = false): MonthTheme {
  const theme = MONTH_THEMES[monthIndex % 12];
  return {
    accent: isDark ? theme.accentDark : theme.accent,
    rangeLight: isDark ? theme.rangeLightDark : theme.rangeLight,
    chevron: isDark ? theme.chevronDark : theme.chevron,
  };
}
