"use client";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/api/routes";
import { clsx } from "clsx";
import { Check, Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";

type FormValues = {
    selectedRoutes: string[];
};

const toggleRoute = (routeId: string, current: string[]) =>
    current.includes(routeId)
        ? current.filter((id) => id !== routeId)
        : [...current, routeId];

export const OnboardingForm = () => {
    const { data: session } = useSession();
    const firstName = session?.user.firstName || "";

    const { handleSubmit, control, watch, formState } = useForm<FormValues>({
        defaultValues: { selectedRoutes: [] },
        mode: "onChange",
    });

    const selectedRoutes = watch("selectedRoutes");

    const onSubmit = async (data: FormValues) => {
        // For demonstration, we log the selected routes. After integration, this will be sent to the backend.
        await new Promise((r) => setTimeout(r, 2000));

        console.log("Selected Routes:", data.selectedRoutes);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <section className="w-fit mx-auto rounded-xl p-6 flex flex-col items-center gap-6 bg-base-white shadow-lg">
                <article className="space-y-2 text-center">
                    <h5 className="font-semibold text-[32px] text-gray-text-strong">
                        Hi {firstName}, ready to grow?
                    </h5>
                    <p>Select routes that interest you and we will make recommandations for you</p>
                </article>

                <Controller
                    name="selectedRoutes"
                    control={control}
                    render={({ field }) => (
                        <article className="grid grid-cols-3 gap-4">
                            {
                                routes.map((route) => {
                                    const selected = field.value.includes(route.id);
                                    return (
                                        <div
                                            key={route.id}
                                            className="relative w-[230px] h-[150px] rounded-xl overflow-hidden cursor-pointer"
                                            onClick={() => field.onChange(toggleRoute(route.id, field.value))}
                                            role="checkbox"
                                            aria-checked={selected}
                                            tabIndex={0}
                                        >
                                            <Image src={route.cover} alt={route.title} width={1000} height={667} className="rounded-xl object-cover" />
                                            <div className="absolute inset-0 bg-gray-text-weak w-full h-full p-2 flex flex-col justify-between">
                                                {/* Visual check indicator (no events, no internal state) */}
                                                <span
                                                    className={clsx(
                                                        "ml-auto h-4 w-4 rounded border flex items-center justify-center bg-brand-primary-text border-brand-primary-text",
                                                        {
                                                            "bg-transparent border-transparent": !selected,
                                                        },
                                                    )}
                                                    aria-hidden="true"
                                                >
                                                    {selected ? <Check className="h-3 w-3 text-base-white" /> : null}
                                                </span>
                                                <p className="font-semibold text-sm text-base-white relative bottom-0">{route.title}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </article>
                    )}
                ></Controller>
                {
                    formState.isSubmitting ? (
                        <div className="flex flex-col items-center gap-2">
                            <Loader size={24} className="animate-spin text-brand-primary-text" />
                            <p className="font-semibold text-lg text-gray-text-strong">
                                Hang on while we personalize your roadmap
                            </p>
                        </div>
                    ) : (
                        <Button type="submit" className="cursor-pointer" disabled={selectedRoutes.length === 0}>
                            Let's Get Started
                        </Button>
                    )
                }
            </section>
        </form>
    );
}