import { useSession } from "next-auth/react";
import { Roles } from "../types";

export const useCheckRole = () => {
  const { data: userSession } = useSession();
  const isAdmin = userSession?.user.role === Roles.ADMIN;
  const isMentor = userSession?.user.role === Roles.MENTOR;
  const isLearner = userSession?.user.role === Roles.LEARNER;
  return {
    isAdmin,
    isMentor,
    isLearner,
  };
};
