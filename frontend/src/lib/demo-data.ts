export type WritingCategory = "Poetry" | "Lyrics" | "Stories" | "Screenplays";

export type Writing = {
  id: string;
  title: string;
  category: WritingCategory;
  language: "Hindi" | "Tamil" | "Bengali" | "English" | "Gujarati";
  genre: string;
  mood: string;
  rating: number;
  bookmarks: number;
  authorId: string;
  excerpt: string;
  body: string;
  publishedAt: string;
};

export type Writer = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  languages: string[];
  achievements: string[];
  streakDays: number;
};

export type DraftVersion = {
  id: string;
  writingId: string;
  label: string;
  note: string;
  snapshot: string;
  timestamp: string;
};

export const WRITERS: Writer[] = [
  {
    id: "w-1",
    name: "Aarav Mehta",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    bio: "Poet of rain-soaked cities and memory lanes.",
    languages: ["Hindi", "English", "Gujarati"],
    achievements: ["Monsoon Laureate", "Sahitya Rising Voice"],
    streakDays: 28,
  },
  {
    id: "w-2",
    name: "Nila Krishnan",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400&q=80",
    bio: "Lyricist sketching silence into melody.",
    languages: ["Tamil", "English"],
    achievements: ["Indie Lyrics Award", "Southern Script Circle"],
    streakDays: 41,
  },
  {
    id: "w-3",
    name: "Riya Das",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    bio: "Writes stories where nostalgia meets rebellion.",
    languages: ["Bengali", "English", "Hindi"],
    achievements: ["Bengal Story Guild", "New Voices Fellowship"],
    streakDays: 17,
  },
  {
    id: "w-4",
    name: "Kavya Patel",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    bio: "Screenwriter framing Gujarati roots in modern cinema.",
    languages: ["Gujarati", "Hindi", "English"],
    achievements: ["Scriptroom Select", "Festival Finalist"],
    streakDays: 33,
  },
];

export const WRITINGS: Writing[] = [
  {
    id: "wr-1",
    title: "मिट्टी की खुशबू",
    category: "Poetry",
    language: "Hindi",
    genre: "Monsoon",
    mood: "Tender",
    rating: 4.8,
    bookmarks: 1240,
    authorId: "w-1",
    excerpt: "बारिश की पहली बूँद ने मिट्टी से कहा — आज फिर मिलेंगे...",
    body: "बारिश की पहली बूँद ने मिट्टी से कहा — आज फिर मिलेंगे, थोड़ी देर ठहर जाओ।",
    publishedAt: "2026-04-12T09:20:00Z",
  },
  {
    id: "wr-2",
    title: "தனிமையின் பாடல்",
    category: "Lyrics",
    language: "Tamil",
    genre: "Romance",
    mood: "Wistful",
    rating: 4.7,
    bookmarks: 910,
    authorId: "w-2",
    excerpt: "இரவைத் தழுவும் காற்றில், உன் பெயர் ஒரு மெலடி...",
    body: "இரவைத் தழுவும் காற்றில், உன் பெயர் ஒரு மெலடி; இதயம் ஒவ்வொரு தாளத்திலும் உன்னை மீண்டும் பாடுகிறது.",
    publishedAt: "2026-03-08T17:00:00Z",
  },
  {
    id: "wr-3",
    title: "চাঁদের চিঠি",
    category: "Poetry",
    language: "Bengali",
    genre: "Letters",
    mood: "Melancholic",
    rating: 4.7,
    bookmarks: 845,
    authorId: "w-3",
    excerpt: "একটা চিঠি লিখেছিলাম তোমায়, কিন্তু চাঁদ পড়ে নিল আগে…",
    body: "একটা চিঠি লিখেছিলাম তোমায়, কিন্তু চাঁদ পড়ে নিল আগে; রাত জুড়ে তাই জোৎস্না ভেজা বাক্য।",
    publishedAt: "2026-02-18T05:11:00Z",
  },
  {
    id: "wr-4",
    title: "The Last Letter from Bombay",
    category: "Stories",
    language: "English",
    genre: "Historical Fiction",
    mood: "Nostalgic",
    rating: 4.9,
    bookmarks: 2104,
    authorId: "w-3",
    excerpt: "She folded the paper twice, the way her father had taught her...",
    body: "She folded the paper twice, the way her father had taught her, and pressed it inside the train ticket sleeve.",
    publishedAt: "2026-01-10T13:40:00Z",
  },
  {
    id: "wr-5",
    title: "પવનનો પત્ર",
    category: "Stories",
    language: "Gujarati",
    genre: "Village Life",
    mood: "Luminous",
    rating: 4.6,
    bookmarks: 730,
    authorId: "w-4",
    excerpt: "પવન આજે પણ એ જ વાડીએ અટકે છે, જ્યાં તું નામ લખ્યું હતું...",
    body: "પવન આજે પણ એ જ વાડીએ અટકે છે, જ્યાં તું નામ લખ્યું હતું. ગામે યાદોને વેણીમાં બાંધી રાખી છે.",
    publishedAt: "2026-04-22T11:33:00Z",
  },
  {
    id: "wr-6",
    title: "Monsoon, Interrupted",
    category: "Screenplays",
    language: "English",
    genre: "Drama",
    mood: "Fierce",
    rating: 4.6,
    bookmarks: 678,
    authorId: "w-4",
    excerpt: "INT. SMALL CAFE — RAJ stares out the window. A cup of cutting chai trembles...",
    body: "INT. SMALL CAFE — RAJ stares out the window. A cup of cutting chai trembles as thunder rolls over the old city.",
    publishedAt: "2026-05-02T18:20:00Z",
  },
  {
    id: "wr-7",
    title: "Ghazal for a Returning Train",
    category: "Lyrics",
    language: "English",
    genre: "Ghazal",
    mood: "Devotional",
    rating: 4.5,
    bookmarks: 562,
    authorId: "w-1",
    excerpt: "In every station lamp, your shadow waits for dawn...",
    body: "In every station lamp, your shadow waits for dawn. I learn to rhyme my longing with the whistle of return.",
    publishedAt: "2026-04-30T07:55:00Z",
  },
  {
    id: "wr-8",
    title: "ફિલ્મના અંતે વરસાદ",
    category: "Screenplays",
    language: "Gujarati",
    genre: "Romantic Drama",
    mood: "Tender",
    rating: 4.8,
    bookmarks: 812,
    authorId: "w-4",
    excerpt: "INT. સિંગલ સ્ક્રીન સિનેમા — અંતિમ દૃશ્ય પછી પણ બેસી રહેલો પ્રેમ...",
    body: "INT. સિંગલ સ્ક્રીન સિનેમા — અંતિમ દૃશ્ય પછી પણ બેસી રહેલો પ્રેમ. બહાર વરસાદ પલકોથી પત્ર લખે છે.",
    publishedAt: "2026-03-21T16:45:00Z",
  },
];

export const VERSIONS: DraftVersion[] = [
  {
    id: "v-07",
    writingId: "wr-1",
    label: "v.07",
    note: "tightened the second stanza",
    snapshot: "बारिश की पहली बूँद ने मिट्टी से कहा...",
    timestamp: "2026-05-15T16:21:00Z",
  },
  {
    id: "v-06",
    writingId: "wr-1",
    label: "v.06",
    note: "added refrain",
    snapshot: "बारिश और इंतज़ार, दोनों ने दरवाज़ा खटखटाया...",
    timestamp: "2026-05-15T14:08:00Z",
  },
  {
    id: "v-05",
    writingId: "wr-1",
    label: "v.05",
    note: "first complete draft",
    snapshot: "मिट्टी की खुशबू ने यादों को जगाया...",
    timestamp: "2026-05-14T10:00:00Z",
  },
  {
    id: "v-04",
    writingId: "wr-1",
    label: "v.04",
    note: "scene break + dialogue pass",
    snapshot: "खिड़की के शीशे पर गिरती रेखाएँ...",
    timestamp: "2026-05-13T08:42:00Z",
  },
];

export const TRENDING_TAGS = [
  "monsoon longing",
  "urban folklore",
  "mother tongue",
  "night letters",
  "scripted memory",
  "rain ghazals",
  "village noir",
  "intimate cinema",
];

export const GENRE_CLOUD = [
  "Poetry",
  "Lyrics",
  "Stories",
  "Screenplays",
  "Ghazal",
  "Flash Fiction",
  "Romance",
  "Mythic Realism",
  "Memoir",
];

export const MOODS = [
  "Tender",
  "Wistful",
  "Luminous",
  "Fierce",
  "Nostalgic",
  "Melancholic",
  "Devotional",
];

export const LANGUAGE_DISTRIBUTION = [
  { language: "English", value: 34 },
  { language: "Hindi", value: 23 },
  { language: "Tamil", value: 17 },
  { language: "Bengali", value: 14 },
  { language: "Gujarati", value: 12 },
];

export const BOOKMARK_GROWTH = [
  { month: "Jan", bookmarks: 310 },
  { month: "Feb", bookmarks: 480 },
  { month: "Mar", bookmarks: 590 },
  { month: "Apr", bookmarks: 740 },
  { month: "May", bookmarks: 940 },
];

export const WRITING_ACTIVITY = [
  { day: "Mon", words: 420 },
  { day: "Tue", words: 980 },
  { day: "Wed", words: 620 },
  { day: "Thu", words: 1150 },
  { day: "Fri", words: 860 },
  { day: "Sat", words: 1410 },
  { day: "Sun", words: 530 },
];
