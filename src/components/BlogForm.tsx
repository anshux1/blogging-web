"use client";
import { useEdgeStore } from '@/lib/edgestore'
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Tiptap } from "./TipTap"
import { useState } from "react";
import { createBlog } from '@/actions/blogs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlogInputProps, BlogInputSchema, categoryEnum } from '@/types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


export function BlogEditor(){
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>()
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { edgestore } = useEdgeStore()
  const router = useRouter();

  
  const onSubmit =  async(values: z.infer<typeof BlogInputSchema>) => {
    try {
      setIsSubmitting(true)
      const res =  await createBlog(values)
      if(!res.success){
         toast.error(res.message);
         setIsSubmitting(false)
         return;
      }
      if(urls){
        await edgestore.myPublicImages.confirmUpload({ url: urls?.url })
      }
      toast.success("Blog created successfully!")
      router.push(`/blog/${res.newPost}`)
    } catch (error) {
      console.log(error)
      toast.error('oops error while submitting blog...')
    } finally {
      setIsSubmitting(false);
    }
  }
  

  const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const res = await edgestore.myPublicImages.upload({
          file: file,
          options: {
            temporary: true
          },
          onProgressChange: (progress) => setProgress(progress)
        })
        setUrls({
          url: res.url,
          thumbnailUrl: res.thumbnailUrl
        })
        form.setValue("thumbnail", res.url)       
      } catch (error) {
        console.log(error);
        toast.error("oops error while uploading thumbnail")
      }
    }
  }

  const form = useForm<BlogInputProps>({
    resolver: zodResolver(BlogInputSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      category: "Development",
      thumbnail: undefined
    }
  })

  return (
    <div className="max-w-7xl h-full mt-3 md:mt-5 mx-auto px-5">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mb-5">
        <div className="grid md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg font-semibold'>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Blog Title" {...field} className="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="thumbnail"
            render={({}) => (
              <FormItem>
                <FormLabel className='text-lg font-semibold'>Thumbnail</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </FormControl>
                <div className='h-1.5 w-44 border rounded overflow-hidden'>
                  <div className='h-full transition-all duration-150 bg-black' style={{ width: `${progress}%`}}>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg font-semibold'>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {categoryEnum.options.map((item) => (
                        <SelectItem key={item} value={item}>{item}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-lg font-semibold'>Content</FormLabel>
              <FormControl>
                <Tiptap description={field.name} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className='mb-5'
          disabled={isSubmitting || !form.formState.isValid}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
    </div>
  )
}
