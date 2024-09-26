import { getAllBLog } from "@/actions/blogs";
import { BlogsCards } from "@/components/Blogscards";
import BlogDisplay from "@/components/DisplayError";
import HeroSection from "@/components/HeroSection";

export default async function Home() {
  const { allBlogs, success, message } = await getAllBLog();
  if(!success || !allBlogs){
    return (
      <div>
        <BlogDisplay error={message} />
      </div>
    );
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
