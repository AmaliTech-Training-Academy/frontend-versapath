
import { PageLocator } from "@/components/custom/page-locator";
import { ProfileSidebar } from "../profile/components/profile-sidebar";
import { CategoryList } from "./components/categories";

export default async function CategoryPage() {
    
    return (
        <>
            <PageLocator from="Dashboard" to="Category" />
            <section className="grid grid-cols-4 gap-6 p-5 rounded-xl">
                <ProfileSidebar />
                 <CategoryList />
            </section>
        </>
    );
}