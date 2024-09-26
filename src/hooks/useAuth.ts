import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

export async function useAuth(){
  const session = await getServerSession(authOptions);
  return session;
}
