'use client';
import { CalendarIcon } from "lucide-react"
import { BlogType, categoryEnum } from "@/types"
import { useEffect, useState } from "react"
import { getFullDate } from "@/utils/getFullDate";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link";

export function BlogsCards({ blogsArr }: { blogsArr: BlogType[] } ) {
  const [selectedCategory, setSelectedCategory] = useState("View all")
  const [filteredBlogs, setfilteredBlogs] = useState<BlogType[]>();
  useEffect(() => {
    const filterBlogs = () => {
      if(selectedCategory === "View all"){
        setfilteredBlogs(blogsArr)
      } else {
        setfilteredBlogs(blogsArr.filter(value => value.category === selectedCategory))
      }
    }
    filterBlogs();
  },[selectedCategory, blogsArr]);

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-14 py-8">
      <header className="mb-8">
        <nav className="flex gap-6 border-b pb-2">
          <div
            onClick={() => setSelectedCategory("View all")}
            className={`text-sm hidden md:block cursor-pointer ${selectedCategory === "View all" ? "text-black" : "text-gray-600"}`}
          >
            View all
          </div>
          <div className="block md:hidden">
            <Select onValueChange={(value) => setSelectedCategory(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="View all" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="View all">View all</SelectItem>
                  {categoryEnum.options.map((value) => (
                    <SelectItem
                      value={value}
                      key={value}
                      className={`text-sm cursor-pointer ${selectedCategory === value ? "text-black" : "text-gray-600"}`}
                    >
                      {value}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {categoryEnum.options.map((value) => (
            <div
              key={value}
              onClick={() => setSelectedCategory(value)}
              className={`text-sm cursor-pointer hidden md:block ${selectedCategory === value ? "text-black" : "text-gray-600"}`}
            >
              {value}
            </div>
          ))}
        </nav>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredBlogs && filteredBlogs.map((value) => (
          <Card key={value.id} data={value} />
        ))}
        {!filteredBlogs && <div>No blogs available</div>}
      </main>
    </div>
  )
}

function Card({ data }: { data: BlogType }){
  const router = useRouter();
  return (
    <article
      className="relative">
      <img
        src={data.thumbnailImg}
        alt="Thumbnail Img"
        className="w-full  aspect-video object-cover rounded-lg mb-4"
      />
      <div
        onClick={() => router.replace(`/blog/${data.id}`)}
        className="flex cursor-pointer items-center justify-between p-5 text-sm absolute bottom-14 backdrop-blur-sm w-full h-16 text-white">
        <div className="flex flex-col gap-0.5 items-start">
          <span className="mr-2 text-lg">{data.author.name}</span>
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2" />
            <span>{getFullDate(data.createdAt)}</span>
          </div>
        </div>
        <span className="font-semibold">{data.category}</span>
      </div>
      <Link href={`/blog/${data.id}`} className="text-xl font-semibold mb-2">{data.title.slice(0, 44)}. . .</Link>
      
    </article>   
  )
}
