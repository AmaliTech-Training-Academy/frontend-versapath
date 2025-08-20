import { SheetWrapper } from "../../components/sheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const AddUserSheet = () => {
  return (
    <SheetWrapper
      headerTitle="Invite User"
      headerDescription="Send an invitation to join the platform with a specific role. Use comma (,) to separate emails"
      trigger={
        <Button>
          <Plus /> Add User
        </Button>
      }
    >
      Adding user will be implemented soon.
    </SheetWrapper>
  );
};
