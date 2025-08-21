import { SheetWrapper } from "../../components/sheet-wrapper";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { InviteUserForm } from "./invite-user-form";

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
      <InviteUserForm />
    </SheetWrapper>
  );
};
