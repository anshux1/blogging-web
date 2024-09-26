import { getBlog } from "@/actions/blogs"
import { toast } from "sonner";

export default async function page({ params }: { params: { blogId: string }}) {
  const res = await getBlog(params.blogId);
  if(!res.success)(
    toast.error("Try again later!")
  )
  const blogDetails = res.blog
  
  console.log(blogDetails)
  return (
    <div className="max-w-7xl mx-auto mt-10">
      <h1 className="text-4xl mx-5 md:mx-10 font-bold">{blogDetails?.title}</h1>
      <img
        alt="Thumbnail image"
        className="h-auto w-full px-5 md:px-10 bg-red-30 object-cover my-5 md:my-10" 
        src={blogDetails?.thumbnailImg}
      />
      <div className="mx-5 md:mx-10">
        <MyComponent htmlString={blogDetails?.content as string}  />
      </div>
    </div>
  )
}



const MyComponent = ({ htmlString }: { htmlString: string; }) => {
  return (
    <div className="gap-4" dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
};


