"use client";
import { DashboardHeader } from "../components/header";
import { TopActions } from "../components/top-actions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CategoryList } from "./components/category-list";
import { SheetWrapper } from "../components/sheet-wrapper";
import { AddCategoryForm } from "./components/add-category-form";

export default function SkillClustersPage() {
    return (
        <>
            <DashboardHeader title="Skill Categories" />
            <section className="bg-sidebar p-3 rounded-lg flex-grow">
                <TopActions
                    searchPlaceholder="Search by skill categories"
                    rightActions={
                        <SheetWrapper
                            headerTitle="Add New Category"
                            headerDescription="Add a new skill category to organize your tags"
                            trigger={
                                <Button>
                                    <Plus /> Add Skill Category
                                </Button>
                            }
                        >
                            <AddCategoryForm />
                        </SheetWrapper>
                    }
                />
                <CategoryList />
            </section>
        </>
    );
}
