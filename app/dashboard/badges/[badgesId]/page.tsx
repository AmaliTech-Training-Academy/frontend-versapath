import  BadgeDetail  from "../components/badge-detail";

export default function BadgeDetailPage({params,}: {params: { id: string };}) {
  return (
    <div className="space-y-6">
      <BadgeDetail badgeId={params.id} />
    </div>
  );
}
