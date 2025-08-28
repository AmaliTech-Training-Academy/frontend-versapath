import { SheetWrapper } from "../../components/sheet-wrapper";
import React from "react";

export interface SheetActionProps {
  headerTitle: string;
  headerDescription: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export const SheetAction: React.FC<SheetActionProps> = ({
  headerTitle,
  headerDescription,
  trigger,
  children,
}) => {
  return (
    <SheetWrapper
      headerTitle={headerTitle}
      headerDescription={headerDescription}
      trigger={trigger}
    >
      {children}
    </SheetWrapper>
  );
};
