"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import Image from "next/image";

interface BadgeCardDetailProps {
  badge: {
    id: string;
    title: string;
    description: string;
    dateIssued: string;
    expiresDate: string;
    skills: string[];
    earningCriteria: string;
  };
  onDownload?: () => void;
  onShare?: () => void;
}

export function BadgeCardDetail({
  badge,
  onDownload,
  onShare,
}: BadgeCardDetailProps) {
  return (
    <Card className="bg-white">
      <CardContent className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Badge Icon */}
          <div className="flex items-center justify-center">
            <svg
              width="280"
              height="280"
              viewBox="0 0 280 280"
              className="drop-shadow-xl"
            >
              <defs>
                <linearGradient
                  id="badgeGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#00708A" />
                  <stop offset="100%" stopColor="#00252E" />
                </linearGradient>
              </defs>
              {/* Hexagon polygon */}
              <polygon
                points="140,20 240,75 240,185 140,240 40,185 40,75"
                fill="url(#badgeGradient)"
                stroke="#0e7490"
                strokeWidth="2"
              />
              <Image src="/Logo.svg" alt="logo" width={52} height={52} className="text-base-white" />

              {/* Badge text */}
              <text
                x="140"
                y="100"
                textAnchor="middle"
                fill="white"
                fontSize="16"
                fontWeight="600"
              >
                VersaPath
              </text>
              <text
                x="140"
                y="125"
                textAnchor="middle"
                fill="white"
                fontSize="16"
                fontWeight="600"
              >
                Certified
              </text>
              <text
                x="140"
                y="155"
                textAnchor="middle"
                fill="white"
                fontSize="20"
                fontWeight="700"
              >
                JavaScript
              </text>
              <text
                x="140"
                y="180"
                textAnchor="middle"
                fill="white"
                fontSize="20"
                fontWeight="700"
              >
                Essentials
              </text>
            </svg>
          </div>

          {/* Right: Badge Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {badge.title}
              </h2>
              <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>Date Issued: {badge.dateIssued}</span>
                <span>Expires: {badge.expiresDate}</span>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {badge.description}
            </p>

            {/* Skills */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {badge.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Earning Criteria */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Earning Criteria
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {badge.earningCriteria}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
                onClick={onDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 dark:border-gray-600 bg-transparent"
                onClick={onShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
