import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export const ProtectedRoute = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  return <>{children}</>
}