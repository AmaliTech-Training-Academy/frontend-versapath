import { DashboardHeader } from "../components/header";

export default function LearnersPage() {
    return (
        <>
            <DashboardHeader title="Learners" />
            <section className="bg-base-white rounded-xl p-4 space-y-6">
                <article className="py-2 px-3 text-gray-stroke-strong">
                    <p className="font-semibold text-gray-text-weak">
                        This page shows a list of assigned learners
                    </p>
                </article>
            </section>
        </>
    );
}