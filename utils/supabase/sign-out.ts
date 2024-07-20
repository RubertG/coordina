import { createClient } from "./client"

export const signOut = async () => {
  const supabase = createClient()
  await supabase.auth.signOut()
}