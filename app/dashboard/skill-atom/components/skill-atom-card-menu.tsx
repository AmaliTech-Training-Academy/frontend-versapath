"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreVertical, Eye, Edit, Trash2 } from "lucide-react"
import { useState } from "react"

interface LessonCardMenuProps {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export const LessonCardMenu = ({ onView, onEdit, onDelete }: LessonCardMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem onClick={onView} className="cursor-pointer">
          <Eye className="h-4 w-4 mr-2" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onDelete}
          className="cursor-pointer text-red-text focus:text-red-text"
        >
          <Trash2 className="h-4 w-4 mr-2 text-red-text focus:text-red-text" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
