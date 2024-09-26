"use client";
import { signOut, useSession } from "next-auth/react"
import {
  Blocks,
  LogOut,
  User,
  UserCircle2,
} from "lucide-react"
 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { DropdownMenuItemComp } from "@/components/DropdownMenuItemComp"
import { Skeleton } from "./ui/skeleton";
import { usePathname, useRouter } from "next/navigation";
export function Navbar(){
  const router = useRouter();
  const pathname = usePathname();
  const { data: session , status} = useSession();
  if(status === "loading"){
    return <div className="h-16 w-full">
      <div className="max-w-7xl h-full px-10 flex justify-between items-center mx-auto">
      <div
        onClick={() => router.push('/')}
        className="flex items-center cursor-pointer gap-2"
      >
        <Blocks className="size-8" />
        <h1 className="text-2xl font-semibold">BlogVibe</h1>
      </div>
        <Skeleton className="size-10" />
      </div>
    </div>
  }
  return (
    <div className="h-16 w-full">
      <div className="max-w-7xl h-full px-10 flex justify-between mx-auto">
        <div className="flex gap-4 items-center">
          <div
            onClick={() => router.push('/')}
            className="flex items-center cursor-pointer gap-2"
          >
            <Blocks className="size-8" />
            <h1 className="text-2xl font-semibold">BlogVibe</h1>
          </div>
          <Link href="/create-blog"
            className={`${pathname === "/create-blog" ? "font-medium" : "font-normal"} hidden md:block`}
          >
            Create Blog
          </Link>
        </div>

        
        { session ? ( 
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="size-10 cursor-pointer flex justify-center items-center ">
                  <UserCircle2 className="size-7" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItemComp
                  onclick={() => router.push('/dashboard')}
                  icon={User}
                  text="Profile"
                />
                <DropdownMenuItemComp
                  onclick={() => router.push('/create-blog')}
                  icon={User}
                  text="Create Blog"
                />
                <DropdownMenuItemComp 
                  icon={LogOut}
                  text="Log Out"
                  onclick={async() => await signOut()}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="h-full flex items-center gap-3">
            <Link href='/signin' className="px-3 py-1.5 hover:bg-gray-300 rounded transition-all duration-500 font-semibold">Sign in</Link>
            <Link href='/signup' className="px-3 py-1.5 bg-black text-white font-semibold tracking-wide rounded border-black border-2">Sign up</Link>
          </div>
        )}

      </div>
    </div>
  )
}
