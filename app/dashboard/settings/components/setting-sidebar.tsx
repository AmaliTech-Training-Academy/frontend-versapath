"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Account Information", href: "/dashboard/settings" },
  { label: "Manage Categories", href: "/dashboard/settings/category" },
  { label: "General", href: "/dashboard/settings/general" },
];

export function SettingSidebar() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-2 border-r px-2">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`px-2 py-2 rounded-md text-left transition-colors duration-150 ${
            pathname === tab.href
              ? "bg-brand-primary-text/50 text-sm font-semibold"
              : "text-gray-text-strong"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
