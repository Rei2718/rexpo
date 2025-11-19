import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

export function useBookmark(id: string, type: 'event' | 'food') {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const storageKey = `bookmarks:${type}`;

  useEffect(() => {
    let isMounted = true;
    const checkBookmarkStatus = async () => {
      try {
        const storedBookmarks = await AsyncStorage.getItem(storageKey);
        if (storedBookmarks && isMounted) {
          const bookmarks = JSON.parse(storedBookmarks) as string[];
          setIsBookmarked(bookmarks.includes(id));
        }
      } catch (error) {
        console.error('Failed to load bookmarks', error);
      }
    };

    checkBookmarkStatus();

    return () => {
      isMounted = false;
    };
  }, [id, storageKey]);

  const toggleBookmark = useCallback(async () => {
    // Optimistic update
    setIsBookmarked((prev) => !prev);

    try {
      const storedBookmarks = await AsyncStorage.getItem(storageKey);
      let bookmarks: string[] = storedBookmarks ? JSON.parse(storedBookmarks) : [];

      if (bookmarks.includes(id)) {
        bookmarks = bookmarks.filter((bookmarkId) => bookmarkId !== id);
      } else {
        bookmarks.push(id);
      }

      await AsyncStorage.setItem(storageKey, JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Failed to update bookmarks', error);
      // Revert on error
      setIsBookmarked((prev) => !prev);
    }
  }, [id, storageKey]);

  return { isBookmarked, toggleBookmark };
}
