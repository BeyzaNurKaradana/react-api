import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FavoritesState {
    favorites: number[];
    addToFavorites: (photoId: number) => void;
    removeFavorites: (photoId: number) => void,
    posts: number [];
    addToPosts: (postId: number) => void;
    removePost: (postId: number) => void;
  }
  
  export const useFavoriteStore = create<FavoritesState>(
    persist(
      (set) => ({
        favorites: [],
        posts: [],
        addToFavorites: (photoId) =>
          set((state) => ({ favorites: [...state.favorites, photoId] })),
        removeFavorites: (photoId) =>
          set((state) => ({
            favorites: state.favorites.filter((id) => id !== photoId),
          })),
        addToPosts: (postId) =>
          set((state) => ({ posts: [...state.posts, postId] })),
        removePost: (postId) =>
          set((state) => ({
            posts: state.posts.filter((id) => id !== postId),
          })),
      }),
      {
        name: "favorite-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );