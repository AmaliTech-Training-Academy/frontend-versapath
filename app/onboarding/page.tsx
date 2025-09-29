"use client";
import Image from "next/image";
import logo from "@/public/Logo.svg";
import { useSession } from "next-auth/react";

export default function OnboardingPage() {
    const { data: session } = useSession();
    const firstName = session?.user.firstName || "";
    return (
        <main className="min-h-screen bg-[url(/images/auth-background.jpg)] bg-cover bg-no-repeat bg-bottom">
            <section className="flex items-center gap-1 py-4 px-8">
                <Image src={logo} alt="VersaPath logo" width={52} height={52} />
                <span className="font-semibold text-2xl text-gray-text-strong">VersaPath</span>
            </section>
            <section className="w-fit mx-auto rounded-xl p-6 space-y-6 bg-base-white shadow-lg">
                <article className="space-y-2 text-center">
                    <h5 className="font-semibold text-[32px] text-gray-text-strong">Hi {firstName}, ready to grow?</h5>
                    <p>Select routes that interest you and we will make recommandations for you</p>
                </article>
                <article className="grid grid-cols-3 gap-4"></article>
            </section>
        </main>
    );
}