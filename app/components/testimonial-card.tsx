import { TestimonialCardProps } from "@/lib/types/landing-page"
import { GraduationCap } from "lucide-react"


export function TestimonialCard({ name, content }: TestimonialCardProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center mx-auto gap-3">
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <GraduationCap className="h-6 w-6 text-base-light-white" />
        </div>
        <h3 className="font-semibold text-lg">{name}</h3>
      </div>

      <div className=" md:px-6 px-4">
        <p className="text-muted-foreground leading-relaxed">{content}</p>
        <div className="w-16 h-1 bg-primary rounded-full mx-auto" />
      </div>
    </div>
  )
}
