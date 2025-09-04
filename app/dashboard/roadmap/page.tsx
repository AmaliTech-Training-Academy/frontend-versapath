import { DashboardHeader } from "../components/header";
import { roadmap } from "@/lib/api/roadmap";
import { GrowthTrackOverview } from "./components/growth-track-overview";
import { CapsuleBox } from "./components/capsule-box";

export default function SkillClustersPage() {
    const { name, description, progress, capsules } = roadmap;
    return (
        <div className="space-y-6">
            <DashboardHeader title="Roadmap" />
            <GrowthTrackOverview data={{ name, description, progress }} />
            <section className="bg-[url(/images/auth-background.jpg)] bg-cover bg-no-repeat bg-bottom rounded-md">
                <div className="bg-[#00708a]/20">
                    {
                        capsules.map((capsule, index) => (
                            <CapsuleBox key={index} capsule={capsule} />
                        ))
                    }
                </div>
            </section>
        </div>
    );
}
