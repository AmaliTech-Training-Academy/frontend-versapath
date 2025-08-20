import React from "react";

export const DashboardHeader = ({ title }: { title: string }) => {
  return (
    <section className="w-full pb-4 text-3xl font-semibold">{title}</section>
  );
};
