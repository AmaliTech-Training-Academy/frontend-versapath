import React from "react";

interface StatCardProps {
  value: number | string;
  title: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, title}) => (
  <div className="flex flex-col items-center rounded shadow-sm px-6 py-3 min-w-[140px]">
     <span className="text-md text-gray-text-weak">{title}</span>
    <span className="text-2xl font-bold">{value}</span>
  </div>
);

export default StatCard;
