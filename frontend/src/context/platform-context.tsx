import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  BOOKMARK_GROWTH,
  LANGUAGE_DISTRIBUTION,
  MOODS,
  TRENDING_TAGS,
  VERSIONS,
  WRITERS,
  WRITING_ACTIVITY,
  type Writing,
} from "@/lib/demo-data";
import { apiClient } from "@/lib/api";

interface Content {
  _id: string;
  title: string;
  genre: string;
  language: string;
  contentType: 'lyrics' | 'story' | 'poem' | 'screenplay';
  quillDelta: { ops: Array<{ insert?: string; attributes?: Record<string, unknown> }> };
  authorId: string;
  bookmarkCount: number;
  ratingSum: number;
  ratingCount: number;
  createdAt: string;
}

type AuthUser = {
  id: string;
  name: string;
  avatar: string;
  mode: "member" | "guest";
};

type Settings = {
  language: string;
  theme: "parchment" | "midnight";
  editorFont: "serif" | "display" | "mono";
  notifications: boolean;
  ambientMotion: boolean;
};

type PlatformContextValue = {
  ready: boolean;
  user: AuthUser | null;
  writings: Writing[];
  bookmarks: string[];
  settings: Settings;
  selectedSidebarPath: string;
  sidebarCollapsed: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  continueAsGuest: () => Promise<void>;
  signOut: () => void;
  toggleBookmark: (writingId: string) => void;
  isBookmarked: (writingId: string) => boolean;
  saveSidebarPath: (path: string) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  updateSettings: (patch: Partial<Settings>) => void;
};

const STORAGE_KEY = "akshar.demo.state.v1";

const defaultSettings: Settings = {
  language: "Hindi",
  theme: "parchment",
  editorFont: "serif",
  notifications: true,
  ambientMotion: true,
};

type PersistedState = {
  ready: boolean;
  user: AuthUser | null;
  bookmarks: string[];
  settings: Settings;
  selectedSidebarPath: string;
  sidebarCollapsed: boolean;
};

const defaultPersisted: PersistedState = {
  ready: false,
  user: null,
  bookmarks: ["wr-1", "wr-4"],
  settings: defaultSettings,
  selectedSidebarPath: "/dashboard",
  sidebarCollapsed: false,
};

const PlatformContext = createContext<PlatformContextValue | null>(null);

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const [persistedState, setPersistedState] = useState<PersistedState>(defaultPersisted);
  const [mongoWritings, setMongoWritings] = useState<Writing[]>([]);
  const [mongoLoading, setMongoLoading] = useState(true);
  const { ready: localStorageReady, user, bookmarks, settings, selectedSidebarPath, sidebarCollapsed } = persistedState;

  // ready should consider both localStorage and MongoDB loading
  const ready = localStorageReady && !mongoLoading;
  console.log('[PlatformContext] render, localStorageReady:', localStorageReady, 'mongoLoading:', mongoLoading, 'ready:', ready, 'writings:', mongoWritings.length);

  // Apply theme immediately on mount to prevent FOUC (flash of unstyled content)
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", settings.theme === "midnight");
  }

  // Fetch writings from MongoDB
  useEffect(() => {
    console.log('[PlatformContext] Fetching writings from MongoDB...');
    const fetchWritings = async () => {
      try {
        console.log('[PlatformContext] API call starting...');
        const response = await apiClient.getContentByLanguage('english');
        console.log('[PlatformContext] API response:', response);
        if (response && response.data && Array.isArray(response.data)) {
          const categoryMap: Record<string, any> = {
            poem: 'Poetry',
            story: 'Stories',
            lyrics: 'Lyrics',
            screenplay: 'Screenplays',
          };
          const writings = response.data.map((content: Content): Writing => ({
            id: content._id,
            title: content.title,
            category: categoryMap[content.contentType] || 'Poetry',
            language: content.language as any,
            genre: content.genre,
            mood: "Tender",
            rating: content.ratingCount > 0 ? content.ratingSum / content.ratingCount : 0,
            bookmarks: content.bookmarkCount,
            authorId: content.authorId,
            excerpt: content.quillDelta?.ops?.[0]?.insert?.substring(0, 100) || "",
            body: content.quillDelta?.ops?.map((op: any) => op.insert || "").join("") || "",
            publishedAt: content.createdAt,
          }));
          setMongoWritings(writings);
          console.log('[PlatformContext] MongoDB writings loaded:', writings.length);
        }
      } catch (error) {
        console.error('[PlatformContext] Failed to fetch writings from MongoDB:', error);
        setMongoWritings([]);
      } finally {
        setMongoLoading(false);
        console.log('[PlatformContext] MongoDB loading complete');
      }
    };

    fetchWritings();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PersistedState;
        setPersistedState({
          ready: true,
          user: parsed.user ?? null,
          bookmarks: parsed.bookmarks ?? defaultPersisted.bookmarks,
          settings: parsed.settings ?? defaultPersisted.settings,
          selectedSidebarPath: parsed.selectedSidebarPath ?? defaultPersisted.selectedSidebarPath,
          sidebarCollapsed: Boolean(parsed.sidebarCollapsed),
        });
      } else {
        setPersistedState((prev) => ({ ...prev, ready: true }));
      }
    } catch {
      setPersistedState((prev) => ({ ...prev, ready: true }));
    }
  }, []);

  useEffect(() => {
    if (!ready || typeof window === "undefined") return;
    const payload = {
      user,
      bookmarks,
      settings,
      selectedSidebarPath,
      sidebarCollapsed,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [ready, user, bookmarks, settings, selectedSidebarPath, sidebarCollapsed]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", settings.theme === "midnight");
  }, [settings.theme]);

  const value = useMemo<PlatformContextValue>(
    () => ({
      ready,
      user,
      writings: mongoWritings.length > 0 ? mongoWritings : [],
      bookmarks,
      settings,
      selectedSidebarPath,
      sidebarCollapsed,
      signIn: async (email, password) => {
        console.log('[PlatformContext] signIn called with:', email);
        try {
          const response = await apiClient.signIn(email, password);
          console.log('[PlatformContext] signIn success:', response);
          setPersistedState((prev) => ({
            ...prev,
            user: {
              id: response.data.user.id,
              name: response.data.user.name,
              avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=240&q=80",
              mode: "member",
            },
          }));
        } catch (error) {
          console.error('[PlatformContext] Sign in failed:', error);
          // Fallback to demo mode if API fails
          console.log('[PlatformContext] Falling back to demo mode');
          setPersistedState((prev) => ({
            ...prev,
            user: {
              id: "u-demo",
              name: email.split("@")[0] || "Writer",
              avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=240&q=80",
              mode: "member",
            },
          }));
        }
      },
      signUp: async (email, password, name) => {
        console.log('[PlatformContext] signUp called with:', email, name);
        try {
          const response = await apiClient.signUp(email, name || "New Writer", password);
          console.log('[PlatformContext] signUp success:', response);
          setPersistedState((prev) => ({
            ...prev,
            user: {
              id: response.data.user.id,
              name: response.data.user.name,
              avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=240&q=80",
              mode: "member",
            },
          }));
        } catch (error) {
          console.error('[PlatformContext] Sign up failed:', error);
          // Fallback to demo mode if API fails
          console.log('[PlatformContext] Falling back to demo mode');
          setPersistedState((prev) => ({
            ...prev,
            user: {
              id: "u-new",
              name: name || email.split("@")[0] || "New Writer",
              avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=240&q=80",
              mode: "member",
            },
          }));
        }
      },
      continueAsGuest: async () => {
        setPersistedState((prev) => ({
          ...prev,
          user: {
            id: "u-guest",
            name: "Guest Writer",
            avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=240&q=80",
            mode: "guest",
          },
        }));
      },
      signOut: () => {
        apiClient.signOut();
        setPersistedState((prev) => ({ ...prev, user: null }));
      },
      toggleBookmark: (writingId) =>
        setPersistedState((prev) => ({
          ...prev,
          bookmarks: prev.bookmarks.includes(writingId)
            ? prev.bookmarks.filter((id) => id !== writingId)
            : [writingId, ...prev.bookmarks],
        })),
      isBookmarked: (writingId) => bookmarks.includes(writingId),
      saveSidebarPath: (path) =>
        setPersistedState((prev) => ({ ...prev, selectedSidebarPath: path })),
      setSidebarCollapsed: (collapsed) =>
        setPersistedState((prev) => ({ ...prev, sidebarCollapsed: collapsed })),
      updateSettings: (patch) =>
        setPersistedState((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } })),
    }),
    [bookmarks, ready, selectedSidebarPath, settings, sidebarCollapsed, user],
  );

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error("usePlatform must be used within PlatformProvider");
  }
  return context;
}

export function useDemoAnalytics() {
  const { writings, bookmarks } = usePlatform();

  const categoryCount = writings.reduce<Record<string, number>>((acc, writing) => {
    acc[writing.category] = (acc[writing.category] ?? 0) + 1;
    return acc;
  }, {});

  return {
    categoryCount,
    totalWritings: writings.length,
    totalBookmarks: bookmarks.length,
    draftVersions: VERSIONS,
    featuredWriters: WRITERS,
    trends: TRENDING_TAGS,
    moods: MOODS,
    bookmarkGrowth: BOOKMARK_GROWTH,
    writingActivity: WRITING_ACTIVITY,
    languageDistribution: LANGUAGE_DISTRIBUTION,
  };
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}
