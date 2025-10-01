import { Button } from "@/components/ui/button";
import { MentorAssessment } from "@/lib/api/assesments";
import { Dot } from "lucide-react";

export const AssessmentContent = ({ assessment }: { assessment: MentorAssessment }) => {
    // Handle the 3 types of assessments: labs, projects and quiz questions.
    if ("questions" in assessment && assessment.questions?.length) {
        return (
            <div className="space-y-6 pb-6">
                <ol className="list-decimal pl-6 space-y-4 font-semibold">
                    {assessment.questions.map((q, i) => (
                        <li key={i + q.question} className="space-y-1">
                            <p className="text-lg text-gray-text-strong">{q.question}</p>
                            <ul className="text-gray-text-weak space-y-1 font-normal">
                                {
                                    q.options.map((opt, j) => (
                                        <li key={j + opt}>{opt}</li>
                                    ))
                                }
                            </ul>
                            <div className="rounded-lg py-1 px-2 bg-brand-primary-fill border-l-4 border-brand-primary-text-weak font-normal">
                                <p className="text-brand-primary-text">Answer: {q.answer}</p>
                            </div>
                        </li>
                    ))}
                </ol>

                {/* Control buttons */}
                <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" className="p-6 border-none bg-brand-primary-fill text-brand-primary-stroke-strong">
                        Cancel
                    </Button>
                    <Button className="p-6 text-base-white bg-brand-primary-text border-none">
                        Next
                    </Button>
                </div>
            </div>
        );
    }

    if ("content" in assessment && assessment.content) {
        const { learningObjectives, projectSetup, tasks } = assessment.content;

        return (
            <div className="space-y-2">
                {!!learningObjectives.length && (
                    <section className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-text-strong">Learning Objectives</h3>
                        <ul className="text-gray-text-weak">
                            {learningObjectives.map((obj: string, idx: number) => (
                                <li key={idx + obj} className="flex items-start gap-2">
                                    <Dot size={30} />
                                    <span className="max-w-4/5">{obj}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {!!projectSetup.length && (
                    <section className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-text-strong">Project Setup</h3>
                        <ul className="text-gray-text-weak">
                            {projectSetup.map((step: string, idx: number) => (
                                <li key={idx + step} className="flex items-start gap-2">
                                    <Dot size={30} />
                                    <span className="max-w-4/5">{step}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {!!tasks.length && (
                    <section className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-text-strong">Tasks</h3>
                        <div className="text-gray-text-weak space-y-1">
                            {
                                tasks.map((task, idx) => (
                                    <div key={idx + task.task} className="space-y-1 text-gray-text-weak">
                                        <p className="font-semibold flex items-start gap-2">
                                            <Dot size={30} />
                                            <span className="max-w-4/5">{task.task}</span>
                                        </p>
                                        {!!task.subtasks?.length && (
                                            <ul className="pl-7 space-y-1">
                                                {task.subtasks.map((subtask, j) => (
                                                    <li key={j + subtask} className="flex items-start gap-2">
                                                        <Dot size={30} />
                                                        <span className="max-w-4/5">{subtask}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )
                                )}
                        </div>
                    </section>
                )}
            </div>
        );
    }

    // Fallback
    return <p className="py-4 text-sm text-gray-text-weak">No additional details available for this assessment.</p>;
};