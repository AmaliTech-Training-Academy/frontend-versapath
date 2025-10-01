"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";
import { SheetWrapper } from "../dashboard/components/sheet-wrapper";


export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full overflow-x-hidden bg-base-light-white">
      <div className="flex h-16 items-center justify-between lg:px-16 md:px-8 px-4 py-4 w-full">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.svg"
            alt="People learning together"
            width={52}
            height={52}
          />
          <span className="font-bold text-xl">VersaPath</span>
        </Link>

        <div className="hidden md:flex items-center ">
          <Button asChild>
            <Link href="/login">Log in</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <SheetWrapper
            trigger={
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            }
            headerTitle=""
            headerDescription=""
          >
            <nav className="flex flex-col gap-4 mt-8">
              <div className="flex flex-col gap-3 mt-6 pt-6 ">
                <Button asChild>
                  <Link href="/login">Log In</Link>
                </Button>
              </div>
            </nav>
          </SheetWrapper>
        </div>
      </div>
    </header>
  );
};
