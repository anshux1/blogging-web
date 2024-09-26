"use client"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SigninProps, signInSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form";
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function SigninComponent(){
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<SigninProps>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async(values: SigninProps) => {
    console.log(values);
    setIsSubmitting(true);
    try {
      const loadId = toast.loading("Please wait...");
      console.log("inside submit")
      const res = await signIn("signin", {
        username: values.username,
        password: values.password,
        redirect: false
      })
      console.log(res);
      toast.dismiss(loadId);
      if (res && !res.error) {
        toast.success("Successfully signed in!");
        router.push('/'); // Redirect to homepage after successful sign-in
      } else {
        console.log("Sign-in error:", res?.error);
        toast.error("Sign-in failed. Please try again.");
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="max-w-sm m-auto flex flex-col h-screen justify-center p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
      <p className="text-gray-500 text-sm">Please enter your details</p>
      <Separator className="my-6" />
      <Form {...form}>
      <form onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(onSubmit)(e)
        }} className="space-y-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem
              className="relative"
              >
              <FormLabel>Password</FormLabel>
              <FormControl>
                  <>
                <Input {...field}
                  placeholder="Enter your password"
                  type={isPasswordVisible ? "text" : "password" }
                />
                {isPasswordVisible ? (
                  <Eye 
                    className="right-2 text-gray-500 cursor-pointer top-7 w-5 absolute"
                    onClick={() => setIsPasswordVisible(prev => !prev)}
                  />
                ) : (
                  <EyeOff 
                    className="right-2 text-gray-500 cursor-pointer top-8 w-5 absolute"
                    onClick={() => setIsPasswordVisible(prev => !prev)}
                  />
                )}
                </>
              </FormControl>
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
      <div className="mt-3 flex gap-1">
        <p>Already have a account ?</p>
        <Link href="/signup" className="font-semibold underline">SignUp</Link>
      </div>
    </div>
  )
}
