import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export const ProtectedRoute = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient()
  const { data: session } = await supabase.auth.getSession()

  if (!session.session) {
    return redirect("/login")
  }

  return <>{children}</>
}