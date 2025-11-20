import { BookmarkProps } from '@/components_2/features/bookmarks/types';
import { useBookmark } from '@/components_2/features/bookmarks/useBookmark';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface BookmarkButtonProps extends BookmarkProps {
    style?: ViewStyle;
}

export function BookmarkButton({ id, type, style }: BookmarkButtonProps) {
    const { isBookmarked, toggleBookmark } = useBookmark({ id, type });
    const iconColor = useThemeColor('textPrimary');

    return (
        <TouchableOpacity
            onPress={toggleBookmark}
            style={[styles.button, style]}
            activeOpacity={0.7}
        >
            <Ionicons
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                size={24}
                color={iconColor}
            />
        </TouchableOpacity>
    );
}

import { spacing } from '@/constants/theme';

const styles = StyleSheet.create({
    button: {
        padding: spacing.s,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
