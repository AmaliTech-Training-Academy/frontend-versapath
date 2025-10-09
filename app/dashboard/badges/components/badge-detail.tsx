"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BadgeCardDetail } from "./badge-card";
import { DashboardHeader } from "../../components/header";
import { ChevronRight } from "lucide-react";
import { useMyBadges } from "@/lib/api/use-my-badges";

interface BadgeDetailProps {
  badgeId: string;
}

const BadgeDetail: React.FC<BadgeDetailProps> = ({ badgeId }) => {
  const { badges, loading, error } = useMyBadges();

  type BackendAtom = { name: string };
  type BackendBadge = {
    badgeId: string;
    title: string;
    description: string;
    issuedOn: string;
    expiresOn?: string;
    verificationCode?: string;
    atoms?: BackendAtom[];
  };
  const badge =
    (badges as BackendBadge[] | undefined)?.find(
      (b) => b.badgeId === badgeId
    ) || (badges as BackendBadge[] | undefined)?.[0];

  const mappedBadge = badge
    ? {
        id: badge.badgeId,
        title: badge.title,
        description: badge.description,
        dateIssued: badge.issuedOn,
        expiresDate: badge.expiresOn || "No expiration date",
        skills: badge.atoms?.map((a: BackendAtom) => a.name) || [],
        earningCriteria: badge.verificationCode
          ? `Verification Code: ${badge.verificationCode}`
          : "-",
      }
    : undefined;

  const handleDownload = () => {};
  const handleShare = () => {};

  if (loading) return <div>Loading badge...</div>;
  if (error) return <div>Error loading badge: {error}</div>;
  if (!mappedBadge) return <div>No badge found.</div>;

  return (
    <div>
      <DashboardHeader title="Badges & Achievement" />
      <div className="flex items-center gap-2 text-xs py-4">
        <Link
          href="/dashboard/badges"
          className="hover:text-brand-primary-text"
        >
          Badges
        </Link>
        <ChevronRight size={17} />
        <span className="text-brand-primary-text">{mappedBadge.title}</span>
      </div>

      <BadgeCardDetail
        badge={mappedBadge}
        onDownload={handleDownload}
        onShare={handleShare}
      />
    </div>
  );
};
export default BadgeDetail;
