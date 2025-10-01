export interface Mentee {
  id: string;
  name: string;
  avatarUrl?: string;
  date?: string;
  lastFeedback?: string;
  lastActivity?: string;
}

export interface MenteesListProps {
  mentees: Mentee[];
}