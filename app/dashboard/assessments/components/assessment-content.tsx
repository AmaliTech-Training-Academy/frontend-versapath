import { MentorAssessment } from "@/lib/api/assesments";
import { Dot } from "lucide-react";

export const AssessmentContent = ({ assessment }: { assessment: MentorAssessment }) => {
    // Handle the 3 types of assessments: labs, projects and quiz questions.
    if ("questions" in assessment && assessment.questions?.length) {
        return (
            <div className="space-y-6 py-4">
                <h3 className="text-lg font-semibold">Questions</h3>
                <ol className="list-decimal pl-5 space-y-4">
                    {assessment.questions.map((q, i) => (
                        <li key={i + q.question} className="space-y-2">
                            <p className="font-medium">{i + 1}. {q.question}</p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {q.options.map((opt, j) => (
                                    <li key={j + opt} className="rounded-md border px-3 py-2 text-sm">{opt}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ol>
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
                        <div className="text-gray-text-weak">
                            {
                                tasks.map((task, idx) => (
                                    <div key={idx + task.task} className="rounded-lg border p-3">
                                        <p className="font-medium">{task.task}</p>
                                        {!!task.subtasks?.length && (
                                            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                                                {task.subtasks.map((subtask, j) => (
                                                    <li key={j + subtask}>{subtask}</li>
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