import { ThemedView } from '@/components_2/core/ThemedView';
import { BookmarkHeader } from '@/components_2/features/bookmarks/BookmarkHeader';
import { BookmarkList } from '@/components_2/features/bookmarks/BookmarkList';
import { spacing } from '@/constants/theme';
import { StyleSheet, View } from 'react-native';
import PagerView from 'react-native-pager-view';

export function BookmarkScreen() {
    return (
        <ThemedView style={styles.container}>
            <View style={styles.headerContainer}>
                <BookmarkHeader />
            </View>
            <PagerView style={styles.pagerView} initialPage={0}>
                <View key="1" style={styles.page}>
                    <BookmarkList type="event" />
                </View>
                <View key="2" style={styles.page}>
                    <BookmarkList type="food" />
                </View>
            </PagerView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        paddingTop: spacing.xxl,
    },
    pagerView: {
        flex: 1,
    },
    page: {
        flex: 1,
    },
});
