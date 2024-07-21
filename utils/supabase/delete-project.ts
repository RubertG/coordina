import { createClient } from "./client"

export const deleteProject = async (id: string) => {
  const supabase = createClient()
  await supabase
    .from('Proyecto')
    .delete()
    .eq('id', id)
}