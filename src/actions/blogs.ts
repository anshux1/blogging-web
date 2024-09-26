"use server";
import db from "@/db"
import { authOptions } from "@/lib/auth"
import { BlogInputProps, BlogInputSchema } from "@/types"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache";

export const createBlog = async (data: BlogInputProps) => {
  try {
    const session = await getServerSession(authOptions);
    if(!session || !session.user){
      return {
        success: false,
        message: "You must be logged in to create a blog post."
      }
    }
    const { success, error } = BlogInputSchema.safeParse(data)
    if(!success){
      return {
        success: false,
        message: `Incorrect input ${error.errors[0]?.message}`
      }
    }
    const userId = session?.user?.id;
    const newPost = await db.blogs.create({
      data: {
        title: data.title,
        content: data.description,
        thumbnailImg: data.thumbnail as string,
        authorId: userId,
        category: data.category,
        published: true,
      }
    })
    return {
      success: true,
      message: "New blog created successfully",
      newPost: newPost.id
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: "Error while creating blog!"
    }
  }
}

export const deleteBlog = async (blogId: string, currentPath: string) => {
  try {
    const session = await getServerSession(authOptions);
    if(!session || !session.user){
      return {
        success: false,
        message: "You must be logged in to delete a blog post."
      }
    }
    
    await db.blogs.delete({ where: { id: blogId }})
    revalidatePath(currentPath, "page")
    return {
      success: true,
      message: "Blog deleted successfully",
    }  
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error while updating blog!"
    }
  }
}


export const getAllBLog = async () => {
  try {
    const allBlogs = await db.blogs.findMany({
      include: { 
        author: {
          select: {
            id: true,
            name: true,
            username: true
          }
        }
      }
    })
    return {
      success: true,
      message: "Blogs fetched successfully",
      allBlogs
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error while getting blogs!"
    }
  }
}



export const getBlog = async (BlogId: string) => {
  try {
    const blog = await db.blogs.findFirst({
      where: { id: BlogId },
      include: { 
        author: {
          select: {
            id: true,
            name: true,
            username: true
          }
        }
      }
    })
    return {
      success: true,
      message: "Blog fetched successfully",
      blog
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error while getting blog!"
    }
  }
}


export const getAuthorBlogs = async () => {
  try {
    const session = await getServerSession(authOptions);
    if(!session || !session.user){
      return {
        success: false,
        message: "You must be logged in to create a blog post."
      }
    }
    const userId = session?.user?.id;
    const blogs = await db.blogs.findMany({
      where: { authorId: userId }
    })
    return {
      success: true,
      message: "Blog fetched successfully",
      blogs
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: "Error while getting blog!"
    }
  }
}
