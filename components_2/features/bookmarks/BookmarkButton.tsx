import { useBookmark } from '@/components_2/features/bookmarks/useBookmark';
import { BookmarkProps } from '@/constants/types';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface BookmarkButtonProps extends BookmarkProps {
    style?: ViewStyle;
}

export function BookmarkButton({ id, type, style }: BookmarkButtonProps) {
    const { isBookmarked, toggleBookmark } = useBookmark(id, type);
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

const styles = StyleSheet.create({
    button: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
