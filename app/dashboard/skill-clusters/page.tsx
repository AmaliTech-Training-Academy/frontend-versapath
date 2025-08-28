"use client";
import { DashboardHeader } from "../components/header";
import { TopActions } from "../components/top-actions";
import { SheetAction } from "../user-management/components/sheet-action";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { InviteUserForm } from "../user-management/components/invite-user-form";
import { CategoryList } from "./components/category-list";

export default function SkillClustersPage() {
    return (
        <>
            <DashboardHeader title="Skill Clusters" />
            <section className="bg-sidebar p-3 rounded-lg flex-grow">
                <TopActions
                    searchPlaceholder="Search by skill clusters"
                    rightActions={
                        <SheetAction
                            headerTitle="Add New Category"
                            headerDescription="Add a new skill category to organize your tags"
                            trigger={
                                <Button>
                                    <Plus /> Add Skill Category
                                </Button>
                            }
                        >
                            <InviteUserForm />
                        </SheetAction>
                    }
                />
                <CategoryList />
            </section>
        </>
    );
}
