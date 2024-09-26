'use client';
import { type Editor } from "@tiptap/react"
import {
  Bold,
  Heading2Icon,
  Italic,
  Code,
  Quote,
  List,
  Underline
} from "lucide-react"
import { Toggle } from "./ui/toggle"

type Props = {
  editor : Editor | null;
}

export function Toolbar({ editor }: Props){
  if(!editor){
    return;
  }

  return (
    <div>
      <Toggle 
        size='sm'
        pressed={editor.isActive('heading', { level: 2 }) }
        onPressedChange={() => 
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2Icon className="size-4" />
      </Toggle>
      <Toggle 
        size='sm'
        pressed={editor.isActive('bold')}
        onPressedChange={() => 
          editor.chain().focus().toggleBold().run()
        }
      >
        <Bold className="size-4" />
      </Toggle>
      <Toggle 
        size='sm'
        pressed={editor.isActive('italic')}
        onPressedChange={() => 
          editor.chain().focus().setItalic().run()
        }
      >
        <Italic className="size-4" />
      </Toggle>
      <Toggle 
        size='sm'
        pressed={editor.isActive('blockquote')}
        onPressedChange={() => 
          editor.chain().focus().toggleBlockquote().run()
        }
      >
        <Quote className="size-4" />
      </Toggle>
      <Toggle 
        size='sm'
        pressed={editor.isActive('codeBlock')}
        onPressedChange={() => 
          editor.chain().focus().toggleCodeBlock().run()
        }
      >
        <Code className="size-4" />
      </Toggle>
      <Toggle 
        size='sm'
        pressed={editor.isActive('underline')}
        onPressedChange={() => 
          editor.chain().focus().toggleUnderline().run()
        }
      >
        <Underline className="size-4" />
      </Toggle>
      <Toggle 
        size='sm'
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => 
          editor.chain().focus().toggleBulletList().run()
        }
      >
        <List className="size-4" />
      </Toggle> 
    </div>
  )
}
