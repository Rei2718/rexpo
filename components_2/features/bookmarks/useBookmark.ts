import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { BookmarkProps } from './types';

type UseBookmarkProps = {
  id?: string;
  type: BookmarkProps['type'];
};

export function useBookmark({ id, type }: UseBookmarkProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const storageKey = `bookmarks:${type}`;

  const loadBookmarks = useCallback(async () => {
    try {
      const storedBookmarks = await AsyncStorage.getItem(storageKey);
      if (storedBookmarks) {
        const bookmarks = JSON.parse(storedBookmarks) as string[];
        setBookmarkedIds(bookmarks);
        if (id) {
          setIsBookmarked(bookmarks.includes(id));
        }
      } else {
        setBookmarkedIds([]);
        setIsBookmarked(false);
      }
    } catch (error) {
      console.error('Failed to load bookmarks', error);
    }
  }, [id, storageKey]);

  useEffect(() => {
    let isMounted = true;
    loadBookmarks();
    return () => {
      isMounted = false;
    };
  }, [loadBookmarks]);

  const toggleBookmark = useCallback(async () => {
    if (!id) return;

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
      setBookmarkedIds(bookmarks); // Update local list
    } catch (error) {
      console.error('Failed to update bookmarks', error);
      // Revert on error
      setIsBookmarked((prev) => !prev);
    }
  }, [id, storageKey]);

  return { isBookmarked, toggleBookmark, bookmarkedIds };
}
