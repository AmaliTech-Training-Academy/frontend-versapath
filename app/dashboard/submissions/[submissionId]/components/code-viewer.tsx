"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, GithubIcon } from "lucide-react"

interface CodeViewerProps {
  code: string
  language: string
  githubUrl?: string
}

export function CodeViewer({ code, language, githubUrl }: CodeViewerProps) {
  const [selectedLine, setSelectedLine] = useState<number | null>(null)

  const lines = code.split("\n")

  return (
    <div className="bg-[#FFFFFF] p-3 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <div>
          <h3 className="font-semibold text-gray-text-strong">Code Review</h3>
          <p className="text-sm text-gray-text-weak">Click on line numbers to add inline feedback</p>
        </div>
        {githubUrl && (
          <Button variant="outline" size="sm" asChild className="bg-white">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="w-4 h-4 mr-2" />
              View on GitHub
            </a>
          </Button>
        )}
      </div>

      <div className="bg-base-dark-background text-green-stroke-strong rounded-2xl overflow-x-auto">
        <div className="flex">
          {/* Line numbers */}
          <div className="bg-gray-800 px-4 py-4 text-right text-sm text-gray-400 select-none min-w-[60px]">
            {lines.map((_, index) => (
              <div
                key={index + 1}
                className={`leading-6 cursor-pointer hover:bg-gray-700 px-2 ${
                  selectedLine === index + 1 ? "bg-blue-600 text-white" : ""
                }`}
                onClick={() => setSelectedLine(selectedLine === index + 1 ? null : index + 1)}
              >
                {index + 1}
              </div>
            ))}
          </div>

          {/* Code content */}
          <div className="flex-1 p-4 overflow-x-auto">
            <pre className="text-sm leading-6">
              <code>
                {lines.map((line, index) => (
                  <div key={index} className="whitespace-pre">
                    {line || " "}
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
