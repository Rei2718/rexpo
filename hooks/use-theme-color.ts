import { Colors } from '@/constants/theme';
import { useColorScheme } from 'react-native';

export function useThemeColor(): typeof Colors.light;
export function useThemeColor(colorName: keyof typeof Colors.light & keyof typeof Colors.dark): string;
export function useThemeColor(
  colorName?: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  if (colorName) {
    return Colors[theme][colorName];
  }
  return Colors[theme];
}