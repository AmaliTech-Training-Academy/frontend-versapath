"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { BadgeIcon } from "./badge-icon";

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
      <CardContent>
        <div className="flex gap-8 items-center">
          <div className="">
            {" "}
            <BadgeIcon
              size={240}
              className=""
              showSubject={true}
              subjectLine1="JavaScript"
              subjectLine2="Essentials"
            />
          </div>
          <div className="space-y-2">
            <div>
              <h2 className="text-2xl font-semibold text-gray-text-strong/90 mb-2">
                {badge.title}
              </h2>
              <div className="flex gap-4 text-xs text-gray-text-strong/60">
                <span>Date Issued: {badge.dateIssued}</span>
                <span>Expires: {badge.expiresDate}</span>
              </div>
            </div>

            <p className="text-gray-text-strong/70 text-sm leading-relaxed">
              {badge.description}
            </p>

            {/* Skills */}
            <div>
              <h3 className="font-semibold text-gray-text-strong mb-3">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {badge.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-0.5 border bg-gray-stroke-weak  text-gray-text-strong/70 rounded-md text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Earning Criteria */}
            <div>
              <h3 className="font-semibold text-gray-text-strong mb-2">
                Earning Criteria
              </h3>
              <p className="text-gray-text-strong/70 text-sm">
                {badge.earningCriteria}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                className="bg-brand-primary-text/80 text-base-light-white"
                onClick={onDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                className="bg-brand-primary-text/7 border-none font-semibold"
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
