import Image from "next/image";
import logo from "@/public/Logo.svg";
import { OnboardingForm } from "./components/onboarding-form";

export default function OnboardingPage() {
    return (
        <main className="min-h-screen bg-[url(/images/auth-background.jpg)] bg-cover bg-no-repeat bg-bottom space-y-2">
            <section className="flex items-center gap-1 py-4 px-8">
                <Image src={logo} alt="VersaPath logo" width={52} height={52} />
                <span className="font-semibold text-2xl text-gray-text-strong">VersaPath</span>
            </section>
            <OnboardingForm />
        </main>
    );
}