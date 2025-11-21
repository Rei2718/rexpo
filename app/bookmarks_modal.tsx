import { BookmarkScreen } from '@/components_2/features/bookmarks/BookmarkScreen';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

export default function BookmarksModal() {
    return (
        <>
            <BookmarkScreen />
            {/* Use a light status bar on iOS to account for the modal presentation */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </>
    );
}
