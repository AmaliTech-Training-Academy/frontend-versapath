import { SheetWrapper } from "../../components/sheet-wrapper";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {AddSkillAtomForm} from "./add-skill-atom-form";

export const AddSkillAtom = () => {
  return (
    <SheetWrapper
      headerTitle="Add a Lesson"
      headerDescription="Add a new skill category to organize your tags"
      trigger={
        <Button>
          <Plus /> Add Lesson
        </Button>
      }
    >
      <AddSkillAtomForm/>
    </SheetWrapper>
  );
};
