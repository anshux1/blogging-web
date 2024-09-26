"use client"
import { deleteBlog } from "@/actions/blogs";
import { useEdgeStore } from "@/lib/edgestore";
import { BlogWithoutAuthor } from "@/types";
import { Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export function ListCard({ blog }: { blog: BlogWithoutAuthor }){
  const { edgestore } = useEdgeStore();
  const pathname = usePathname();
  return (
    <div className="w-full h-16 p-3 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <img src={blog.thumbnailImg} className="w-auto h-10" />
        <h1 className="text-xl">{blog.title}</h1>
      </div>
      <Trash
        onClick={async() => {
          const { success, message } = await deleteBlog(blog.id, pathname)
          if(success){
            toast.success(message)
            await edgestore.myPublicImages.delete({
              url: blog.thumbnailImg,
            });
          } else {
            toast.error(message)
          }
        }}
        className="size-6 cursor-pointer text-red-500" />
    </div>
  )
}
