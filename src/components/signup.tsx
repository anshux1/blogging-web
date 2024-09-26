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
import { signUpSchema, signUpProps } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useDebounceCallback } from "usehooks-ts"
import { uniqueUsername } from "@/actions/user"
import Link from "next/link"

export function SignUpComponent(){
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [, setIsCheckingUsername] = useState(false);
  const [uniqueUsernameMessage, setUniqueUsernameMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usernameUnique, setUsernameUnique] = useState('')
  const router = useRouter();
  const debounced = useDebounceCallback(setUsernameUnique, 500);
  const form = useForm<signUpProps>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
    },
  });
  const watchedUsername = form.watch("username");
  useEffect(() => {
    debounced(watchedUsername)
    console.log(usernameUnique)
  }, [watchedUsername, usernameUnique])

  useEffect(() => {
    setIsCheckingUsername(true);
    setUniqueUsernameMessage("");
    const checkUsername = async () => {
      if(usernameUnique === ""){
        return;
      }
      try {
        const res = await uniqueUsername(usernameUnique);
        if(res.message){
          setUniqueUsernameMessage(res.message)
        }
        if(!res){
          toast("oops an error accured")
        }
        setIsCheckingUsername(false)
      } catch (error) {
        toast.error("oops an error accured")
        console.log(error);
      }
    }
    checkUsername();
  }, [usernameUnique])
  
  const onSubmit = async(values: signUpProps) => {
    console.log(values);
    setIsSubmitting(true);
    try {
      const loadId = toast.loading("Please wait...");
      console.log("inside submit")
      const res = await signIn("signup",  {
        name: values.name,
        username: values.username,
        password: values.password,
        redirect: false
      })
      console.log();
      toast.dismiss(loadId);
      if (res && !res.error) {
        toast.success("Account created successfully!");
        router.push('/'); // Redirect to homepage after successful sign-in
      } else {
        console.log("Sign-up error:", res?.error);
        toast.error(res?.error || "Sign-up failed. Please try again.");
      }
    } catch (error) {
      console.log("Error :", error);
    }
  }
  return (
    <div className="max-w-sm m-auto flex flex-col h-screen justify-center p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-1">Welcome</h1>
      <p className="text-gray-500 text-sm">Please enter your details</p>
      <Separator className="my-6" />
      <Form {...form}>
        <form onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(onSubmit)(e)
        }} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <>
                    <Input placeholder="Enter username" {...field} />
                    <p className={`${uniqueUsernameMessage === "Username already taken" ? "text-red-600" : "text-green-600"} text-sm`}>
                      {uniqueUsernameMessage}
                    </p>
                  </>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative" >
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <>
                    <Input {...field}
                      placeholder="Enter password"
                      type={isPasswordVisible ? "text" : "password" }
                    />
                    {isPasswordVisible ? (
                      <Eye 
                        className="right-2 text-gray-500 cursor-pointer top-7 w-5 absolute"
                        onClick={() => setIsPasswordVisible(prev => !prev)}
                      />
                    ) : (
                      <EyeOff 
                        className="right-2 text-gray-500 cursor-pointer top-7 w-5 absolute"
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
        <p>Don&apos;t have a account?  </p>
        <Link href="/signin" className="font-semibold underline">{"  "}Sign In</Link>
      </div>
    </div>
  )
}
