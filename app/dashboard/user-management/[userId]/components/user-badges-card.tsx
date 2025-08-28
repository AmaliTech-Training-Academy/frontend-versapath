import React from 'react'
import { BadgeCheck , Star} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const UserBadges = () => {
  return (
    <article className="w-full space-y-4 p-4 bg-base-light-white rounded-2xl border border-gray-stroke-weak">
      <div>
        <div className="flex flex-row items-center gap-1 mb-1">
          <BadgeCheck size={20} />
          <p className="inline-block self-stretch justify-start text-shadow-gray-text-strong text-lg font-semibold leading-relaxed">
            Badges
          </p>
        </div>
        <p className="self-stretch justify-start text-gray-text-strong/70 text-base font-normal leading-normal">
          Your latest achievement
        </p>
      </div>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <div
            key={"index~" + index}
            className="flex flex-row items-center gap-2 p-2 rounded-2xl border border-gray-stroke-weak"
          >
            <Star
              className="inline-block mr-2 p-2 bg-brand-primary-text/5 text-brand-primary-text rounded-full"
              size={45}
              strokeWidth={1.2}
            />
            <div>
              <div className="text-gray-text-strong text-base font-normal leading-normal">
                React Components
              </div>
              <p className="justify-start text-gray-text-strong/70 text-xs font-normal leading-tight">
                Advance 2 days ago
              </p>
            </div>
          </div>
        ))}
      <Button size={"lg"} className="w-full">
        <BadgeCheck />
        View all badges
      </Button>
    </article>
  );
}
