'use client';
import { EditorContent, useEditor } from "@tiptap/react";
import Blockquote from '@tiptap/extension-blockquote'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Heading from '@tiptap/extension-heading'
import Italic from '@tiptap/extension-italic'
import CodeBlock from '@tiptap/extension-code-block'
import Underline from '@tiptap/extension-underline'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import { Toolbar } from "./Toolbar";

interface TiptapProps {
  description: string;
  onChange: (richText: string) => void;
}

export function Tiptap({ description, onChange }: TiptapProps){
  const editor = useEditor({
    extensions: [
      Paragraph.configure({
        HTMLAttributes: {
          class: "my-3 text-lg"
        }
      }),
      Document,
      BulletList,
      ListItem,
      CodeBlock,
      Text,
      Bold,
      Underline,
      Heading.configure({
        HTMLAttributes: {
          class: "text-2xl mt-5 mb-1 font-bold",
        },
        levels: [1, 2, 3]
      }),
      Italic,
      Blockquote.configure({
        HTMLAttributes: {
          class: "border-l-4 border-gray-300 h-fit ml-2 pl-4 my-6" 
        }
      })
    ],
    content: description,
    editorProps: {
      attributes: {
        class: "min-h-[calc(100vh-40vh)] w-full rounded-md border border-input bg-transparent px-5 py-3 text-sm shadow-sm focus-visible:ring-0"
      }
    },
    onUpdate({ editor }){
      onChange(editor.getHTML());
    }
  })

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
