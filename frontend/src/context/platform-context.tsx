import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  BOOKMARK_GROWTH,
  LANGUAGE_DISTRIBUTION,
  MOODS,
  TRENDING_TAGS,
  VERSIONS,
  WRITERS,
  WRITING_ACTIVITY,
  WRITINGS,
  type Writing,
} from "@/lib/demo-data";

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
  signIn: (name: string) => Promise<void>;
  signUp: (name: string) => Promise<void>;
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
  user: AuthUser | null;
  bookmarks: string[];
  settings: Settings;
  selectedSidebarPath: string;
  sidebarCollapsed: boolean;
};

const defaultPersisted: PersistedState = {
  user: null,
  bookmarks: ["wr-1", "wr-4"],
  settings: defaultSettings,
  selectedSidebarPath: "/dashboard",
  sidebarCollapsed: false,
};

const PlatformContext = createContext<PlatformContextValue | null>(null);

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(defaultPersisted.user);
  const [bookmarks, setBookmarks] = useState<string[]>(defaultPersisted.bookmarks);
  const [settings, setSettings] = useState<Settings>(defaultPersisted.settings);
  const [selectedSidebarPath, setSelectedSidebarPath] = useState(
    defaultPersisted.selectedSidebarPath,
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(defaultPersisted.sidebarCollapsed);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PersistedState;
        setUser(parsed.user ?? null);
        setBookmarks(parsed.bookmarks ?? defaultPersisted.bookmarks);
        setSettings(parsed.settings ?? defaultPersisted.settings);
        setSelectedSidebarPath(parsed.selectedSidebarPath ?? defaultPersisted.selectedSidebarPath);
        setSidebarCollapsed(Boolean(parsed.sidebarCollapsed));
      }
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready || typeof window === "undefined") return;
    const payload: PersistedState = {
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
      writings: WRITINGS,
      bookmarks,
      settings,
      selectedSidebarPath,
      sidebarCollapsed,
      signIn: async (name) => {
        await wait(500);
        setUser({
          id: "u-demo",
          name: name.trim() || "Writer",
          avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=240&q=80",
          mode: "member",
        });
      },
      signUp: async (name) => {
        await wait(700);
        setUser({
          id: "u-new",
          name: name.trim() || "New Writer",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=240&q=80",
          mode: "member",
        });
      },
      continueAsGuest: async () => {
        await wait(350);
        setUser({
          id: "u-guest",
          name: "Guest Writer",
          avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=240&q=80",
          mode: "guest",
        });
      },
      signOut: () => setUser(null),
      toggleBookmark: (writingId) =>
        setBookmarks((prev) =>
          prev.includes(writingId) ? prev.filter((id) => id !== writingId) : [writingId, ...prev],
        ),
      isBookmarked: (writingId) => bookmarks.includes(writingId),
      saveSidebarPath: setSelectedSidebarPath,
      setSidebarCollapsed,
      updateSettings: (patch) => setSettings((prev) => ({ ...prev, ...patch })),
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
