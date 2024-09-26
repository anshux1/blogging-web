'use client'
import {
  LayoutDashboard,
  LogOut
} from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="max-w-7xl h-[calc(93vh)] flex mx-auto">
      <div className="w-1/4 hidden md:flex flex-col p-5 justify-between ">
        <div className="">
          <div className={`flex items-center  text-xl text-black gap-3 ${pathname === "/dashboard" ? "bg-gray-100" : "hover:bg-gray-100"} p-3 rounded-lg transition-all duration-600`}>
            <LayoutDashboard className="size-8" />
            <p>Dashboard</p>
          </div>
        </div>
        <div
          onClick={async() => {
            await signOut()
            toast.success("Logged out successfully!")
            router.push('/')
          }}
          className="flex items-center text-xl text-red-500 gap-3 hover:bg-gray-100 p-3 rounded-lg transition-all duration-600">
          <LogOut className="size-8" />
          <p className="text-2xl">Logout</p> 
        </div>
      </div>
      {children}
    </div>
  );
}
