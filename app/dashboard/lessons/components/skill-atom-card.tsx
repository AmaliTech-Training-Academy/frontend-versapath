"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { LessonCardMenu } from "./skill-atom-card-menu";
import { SkillAtom } from "@/lib/types/skill-atom";

interface LessonCardProps {
  skillatom: SkillAtom;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRefresh?: () => void;
}

export const SkillAtomCard: React.FC<LessonCardProps> = ({
  skillatom,
  onView,
  onDelete,
  onRefresh,
}) => {
  return (
    <Card className=" cursor-pointer px-3 py-1 bg-gray-stroke-weak/20 hover:bg-brand-primary-text/7 hover:border-brand-primary-text/20 border-gray-stroke-strong/80">
      <CardContent className="p-1">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1 my-2">
            <div className="flex-shrink-0 mt-1">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-Text-Text-Strong/90 font-semibold text-lg">{skillatom.name}</h3>
              <p className="text-sm text-gray-text-strong/70">{skillatom.description}</p>              
            </div>
          </div>

          <LessonCardMenu
            onView={() => onView?.(skillatom.id)}
            onEdit={onRefresh}
            onDelete={() => onDelete?.(skillatom.id)}
            atomData={skillatom}
          />
        </div>
      </CardContent>
    </Card>
  )
}
  
