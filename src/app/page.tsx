import { getAllBLog } from "@/actions/blogs";
import { BlogsCards } from "@/components/Blogscards";
import HeroSection from "@/components/HeroSection";
import { toast } from "sonner";

export default async function Home() {
  const { allBlogs, success, message } = await getAllBLog();
  if(!success || !allBlogs){
    return toast.error(message);
  }
  console.log(allBlogs)
  const totalBlogs = allBlogs?.length - 1;
  const recentBlog = allBlogs[totalBlogs]
  return (
    <div className="h-screen ">
      <HeroSection
        id={recentBlog.id}
        authorName={recentBlog.author.name}
        createdAt={recentBlog.createdAt}
        title={recentBlog.title}
        category={recentBlog.category}
        thumbnailImg={recentBlog.thumbnailImg}
      />
      <BlogsCards blogsArr={allBlogs} />
    </div>
  );
}
