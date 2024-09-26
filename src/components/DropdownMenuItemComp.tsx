import React from 'react'
import { DropdownMenuItem } from './ui/dropdown-menu';

interface DropdownMenuProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
  onclick?: () => void;
}

export const DropdownMenuItemComp = ({icon : Icon, text, onclick}: DropdownMenuProps) => {
  return (
    <DropdownMenuItem onClick={onclick}>
      <Icon className="mr-2 h-4 w-4" />
      <span>{text}</span>
    </DropdownMenuItem>
  )
}
