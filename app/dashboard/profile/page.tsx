import { PageLocator } from "@/components/custom/page-locator";
import { ProfileSidebar } from "./components/profile-sidebar";
import { ProfileForm } from "./components/profile-form";

export default async function ProfilePage() {
    return (
        <>
            <PageLocator from="Dashboard" to="Profile" />
            <section className="grid grid-cols-4 gap-6 p-5 rounded-xl">
                <ProfileSidebar />
                <ProfileForm />
            </section>
        </>
    );
}