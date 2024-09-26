"use client"
import { Badge } from "@/components/ui/badge"
import { getFullDate } from "@/utils/getFullDate";
import { useRouter } from "next/navigation";

interface blogType {
  id: string;
  title: string;
  thumbnailImg: string;
  authorName: string;
  category: string;
  createdAt: Date;
}

export default function HeroSection(props: blogType) {
  const router = useRouter();
  return (
    <section 
      onClick={() => router.replace(`/blog/${props.id}`)} 
      className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <p className="text-sm font-medium text-gray-500 mb-2">The blog</p>
        <h1 className=" text-2xl md:text-5xl font-bold mb-4">
          Writings from our team
          <span className="inline-block ml-2 transform -rotate-12 text-2xl">✍️</span>
        </h1>
      </div>

      <div className="relative aspect-[16/9] cursor-pointer max-w-6xl mx-auto md:aspect-[21/9] overflow-hidden rounded-lg">
        <img
          src={props.thumbnailImg}
          alt="Featured blog post image"
          className="transition-transform object-contain duration-300 w-full  hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <p className="text-sm font-semibold mb-2">{props.authorName} • {getFullDate(props.createdAt)}</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{props.title}</h2>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
              {props.category}
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )
}
