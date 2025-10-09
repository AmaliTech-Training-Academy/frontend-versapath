export interface BadgeIconProps {
  size?: number;
  className?: string;
  showSubject?: boolean;
  subjectLine1?: string;
  subjectLine2?: string;
}

export interface BadgeCardDetailProps {
  badge: {
    id: string;
    title: string;
    description: string;
    dateIssued: string;
    expiresDate: string;
    skills: string[];
    earningCriteria: string;
  };
  onDownload?: () => void;
  onShare?: () => void;
}

  export type BackendBadge = {
    badgeId: string;
    title: string;
    description: string;
    issuedOn: string;
  };