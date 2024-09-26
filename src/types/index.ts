import { z } from "zod";

export const signInSchema = z.object({
  username: z.string().min(3, { message: "Username is too short" }),
  password: z.string().min(6, { message: "Password is too short"})
})

export type SigninProps = z.infer<typeof signInSchema>

export const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name is too short "}),
  username: z.string().min(3, { message: "Username is too short" }),
  password: z.string().min(6, { message: "Password is too short"})
})

export type signUpProps = z.infer<typeof signUpSchema>

export const categoryEnum = z.enum([
  "Design",
  "Development",
  "Leadership",
  "Management",
  "Interview",
  "Devops"
], {
  errorMap: () => ({ message: "Invalid category." })
});

export const BlogInputSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters long."}),
  description: z.string().min(10, { message: "Content must be at least 10 characters long." }),
  thumbnail: z.instanceof(File).optional().or(z.string().optional()),
  category: categoryEnum,
})

export type BlogInputProps = z.infer<typeof BlogInputSchema>

export interface BlogType {
  id: string;
  title: string;
  thumbnailImg: string;
  content: string;
  published: boolean;
  authorId: string;
  category: string;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    username: string;
  };
}

export type BlogWithoutAuthor = Omit<BlogType, 'author'>;
