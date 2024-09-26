import { getAuthorBlogs } from "@/actions/blogs";
import { ListCard } from "@/components/ListCard";
import { getServerSession } from "next-auth";
import { toast } from "sonner";

export default async function page() {
  const session = await getServerSession()
  const { message, blogs, success } = await getAuthorBlogs();
  if(!success){
    toast.error(message)
  }
  return (
    <div className="size-full p-10">
      <h1 className="text-3xl font-bold"> Hey, {session?.user.name}</h1>
      <div className="my-8">
        <h1 className="text-xl font-semibold">My blogs</h1>
        {blogs && blogs.map((blog) => (
          <ListCard blog={blog} key={blog.id} />
        ))}
        {blogs?.length === 0 && <div className="text-center mt-10">No blogs..</div>}
      </div>

    </div>
  )
}

