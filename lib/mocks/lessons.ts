import {
  PlayCircleIcon,
  DocumentTextIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
export const lessonsMocks = [
  {
    id: 1,
    title: "Introduction to JavaScript",
    type: "lesson",
    icon: PlayCircleIcon,
  },
  {
    id: 2,
    title: "JavaScript Basics",
    type: "lesson",

    icon: DocumentTextIcon,
  },
  {
    id: 3,
    title: "JavaScript Functions",
    type: "lesson",
    icon: PlayCircleIcon,
  },
  {
    id: 4,
    title: "JavaScript Objects",

    type: "lesson",
    icon: DocumentTextIcon,
  },
  {
    id: 5,
    title: "JavaScript Arrays",
    type: "quiz",
    icon: LightBulbIcon,
  },
  {
    id: 6,
    title: "JavaScript DOM Manipulation",
    type: "lesson",
    icon: PlayCircleIcon,
  },
  {
    id: 7,
    title: "JavaScript Events",
    type: "lesson",
    icon: PlayCircleIcon,
  },
  {
    id: 8,
    title: "JavaScript ES6 Features",
    type: "quiz",
    icon: LightBulbIcon,
  },
];

export const dummyMentees = [
  {
    id: "1",
    name: "Alexander Agyemang",
    avatarUrl: "/images/category-placeholder.jpg",
    date: "23 hours ago",
    lastFeedback: "Provided feedback on React components",
    lastActivity: "23 hours ago",
  },
  {
    id: "2",
    name: "Linda Boateng",
    avatarUrl: "/images/profile.png",
    date: "2 days ago",
    lastFeedback: "Reviewed JavaScript assignment",
    lastActivity: "2 days ago",
  },
];
