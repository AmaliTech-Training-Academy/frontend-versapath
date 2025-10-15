"use client";
import { useEffect, useState } from "react";
function extractQuestionData(rawHtml: string) {
  const html = rawHtml.replace(/^"|"$/g, "").replace(/\\"/g, '"');
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const questionContainer = doc.querySelector(".que");
  const questionType = questionContainer?.classList?.[1] || "unknown";
  const qubaid = questionContainer?.getAttribute("id")?.replace("q", "") || "";

  const questionText = doc.querySelector(".qtext p")?.textContent.trim() || "";

  const answers = Array.from(doc.querySelectorAll(".answer input")).map(
    (input) => {
      const label = doc
        .querySelector(`label[for="${input.id}"]`)
        ?.textContent.trim();
      return {
        value: (input as HTMLInputElement).value,
        label: label || input.nextSibling?.textContent?.trim() || "",
      };
    }
  );

  return { questionText, answers, questionType, qubaid };
}

const QUESTION_TYPES = [
  { type: "truefalse", inputType: "radio" },
  { type: "multichoice", inputType: "checkbox" },
  // future types can easily be added here 👇
  // { type: "shortanswer", inputType: "text" },
];

export default function Question({ html }: { readonly html: string }) {
  const [data, setData] = useState<{
    questionText: string;
    answers: { value: string; label: string }[];
    questionType: string;
    qubaid: string;
  }>({
    questionText: "",
    answers: [],
    questionType: "",
    qubaid: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setData(extractQuestionData(html));
    }
  }, [html]);

  if (!data.questionText) return null;

  const inputType =
    QUESTION_TYPES.find((q) => data.questionType.includes(q.type))?.inputType ||
    "radio";

  return (
    <div
      className="p-4 border rounded-xl shadow-sm bg-white mb-4"
      data-qubaid={data.qubaid}
      data-type={data.questionType}
    >
      <h4 className="font-semibold mb-3">{data.questionText}</h4>
      <div className="space-y-2">
        {data.answers.map((a, i) => (
          <label
            key={"label-" + i}
            className="flex items-center gap-2 hover:bg-gray-50 rounded-md p-2 transition"
          >
            <input type={inputType} name={`q-${data.qubaid}`} value={a.value} />
            <span>{a.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
