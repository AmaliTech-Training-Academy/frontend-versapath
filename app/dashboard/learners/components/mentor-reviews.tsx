import React from "react";

export const MentorReviewsCard = () => {
    return (
        <section className="space-y-4">
            <header>
                <p className="text-lg font-semibold text-gray-text-strong">
                    Mentor Reviews & Feedback
                </p>
                <p className="text-sm text-gray-text-weak">
                    Recent skill assessments and mentor feedback
                </p>
            </header>
            <article className="space-y-4">
                {Array(3)
                    .fill(0)
                    .map((_, index) => (
                        <div
                            key={"Index~" + index}
                            className="rounded-xl border border-gray-stroke-weak p-4 space-y-2"
                        >
                            <p className="text-sm font-semibold text-black ">
                                React Components
                            </p>
                            <p className="text-gray-text-weak">
                                Great progress on understanding component lifecycle. Continue
                                practicing with hooks.
                            </p>
                        </div>
                    ))}
            </article>
        </section>
    );
};
