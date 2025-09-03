"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {  Loader} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EmailVerificationCard() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const handleOpenEmail = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    window.open("mailto:", "_blank");
  };

  const handleSkip = () => {
    router.push("/login");

  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg border-0 overflow-hidden">
      <CardContent className="space-y-6">
        <div className="flex justify-center items-center">
          <div className="bg-brand-primary-text-weak w-24 h-24 p-2.5 rounded-lg flex justify-center items-center">
            <Image
              src="/undraw_opened_47gd.png"
              alt="Reset Password"
              width={50}
              height={58}
              className="mx-auto"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-gray-text flex justify-center">
            Check your email
          </h1>
          <p className="text-sm text-gray-text-weak">
            We have sent a password reset instructions to your email.
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleOpenEmail}
            disabled={isLoading}
            className="w-full cursor-pointer bg-brand-primary-text hover:bg-brand-primary-text font-medium py-2.5"
          >
            {isLoading ? (
              <div className="flex items-center justify-center text-md gap-2">
                <Loader className="w-6 h-6 animate-spin" />
                Opening Email...
              </div>
            ) : (
              "Open Email"
            )}
          </Button>

          <Button
            onClick={handleSkip}
            variant="ghost"
            className="w-full cursor-pointer  border-1 text-gray-text-strong bg-base-light-background  font-semibold text-sm py-2.5"
          >
            Skip, I'll confirm later
          </Button>
        </div>

        <p className="text-sm text-gray-text-weak leading-relaxed">
          Did not receive the email? <span className="text-brand-primary-stroke-strong">Check your spam or try another email
          address.</span>
        </p>
      </CardContent>
    </Card>
  );
}
