"use client";
import { Button } from "@/components/ui/button";
import { useRoutes } from "@/lib/api/routes";
import { useTracks } from "@/lib/api/growth-tracks";
import { clsx } from "clsx";
import { Check, Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import placeholder from "@/public/images/category-placeholder.jpg";
import { apiRequest } from "@/lib/api/api-request";
import { ItemData, Route } from "@/lib/types/api";
import { extractErrorMessage } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FormValues = {
    selectedRoute: string;
    selectedTrack: string;
};

export const OnboardingForm = () => {
    const { data: session, update } = useSession();
    const firstName = session?.user.firstName || "";
    const { routes } = useRoutes(true);
    const router = useRouter();

    const { handleSubmit, control, watch, formState } = useForm<FormValues>({
        defaultValues: {
            selectedRoute: "",
            selectedTrack: "",
        },
        mode: "onChange",
    });

    const selectedRoute = watch("selectedRoute");
    const relevantTracks = routes.find(route => route.talentRouteId === selectedRoute)?.tracks || [];

    const onSubmit = async (data: FormValues) => {
        const body = {
            learnerId: session?.user.userId,
            talentRouteId: data.selectedRoute,
            growthTrackId: data.selectedTrack
        }

        const res = await apiRequest<ItemData<Route>>('/roadmap/learner-onboarding', 'POST', body);

        if (!res.success) {
            toast.error(extractErrorMessage(res.errors as string[], res.message));
            return;
        }

        await update({
            user: {
                ...session?.user,
                requiresOnboarding: false,
            }
        });

        toast.success(res.message || "You have been successfully onboarded");
        router.push('/dashboard');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <section className="w-fit mx-auto rounded-xl p-6 flex flex-col items-center gap-6 bg-base-white shadow-lg">
                <article className="space-y-2 text-center">
                    <h5 className="font-semibold text-[32px] text-gray-text-strong">
                        Hi {firstName}, ready to grow?
                    </h5>
                    <p>Select a route and growth track that interest you and we will make recommendations for you</p>
                </article>

                {
                    selectedRoute === "" && (
                        <Controller
                            name="selectedRoute"
                            control={control}
                            render={({ field }) => (
                                <article className="grid grid-cols-3 gap-4">
                                    {
                                        routes.map((route) => {
                                            const selected = field.value === route.talentRouteId;
                                            return (
                                                <div
                                                    key={route.talentRouteId}
                                                    className="relative w-[230px] h-[150px] rounded-xl overflow-hidden cursor-pointer"
                                                    onClick={() => field.onChange(route.talentRouteId)}
                                                    role="checkbox"
                                                    aria-checked={selected}
                                                    tabIndex={0}
                                                >
                                                    <Image src={placeholder} alt={route.routeName} width={1000} height={667} priority className="rounded-xl object-cover" />
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
                                                        <p className="font-semibold text-sm text-base-white relative bottom-0">{route.routeName}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </article>
                            )}
                        />
                    )
                }

                {
                    selectedRoute !== "" && relevantTracks.length > 0 && (
                        <Controller
                            name="selectedTrack"
                            control={control}
                            render={({ field }) => (
                                <article className="grid grid-cols-3 gap-4">
                                    {
                                        relevantTracks.map((track) => {
                                            const selected = field.value === track.growthTrackId;
                                            return (
                                                <div
                                                    key={track.growthTrackId}
                                                    className="relative w-[230px] h-[150px] rounded-xl overflow-hidden cursor-pointer"
                                                    onClick={() => field.onChange(track.growthTrackId)}
                                                    role="checkbox"
                                                    aria-checked={selected}
                                                    tabIndex={0}
                                                >
                                                    <Image src={placeholder} alt={track.trackName} width={1000} height={667} priority className="rounded-xl object-cover" />
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
                                                        <p className="font-semibold text-sm text-base-white relative bottom-0">{track.trackName}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </article>
                            )}
                        />
                    )
                }

                {
                    formState.isSubmitting ? (
                        <div className="flex flex-col items-center gap-2">
                            <Loader size={24} className="animate-spin text-brand-primary-text" />
                            <p className="font-semibold text-lg text-gray-text-strong">
                                Hang on while we personalize your roadmap
                            </p>
                        </div>
                    ) : (
                        <Button type="submit" className="cursor-pointer" disabled={!selectedRoute}>
                            Let's Get Started
                        </Button>
                    )
                }
            </section>
        </form>
    );
}