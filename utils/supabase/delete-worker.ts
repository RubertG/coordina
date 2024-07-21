import { createClient } from "./client"

export const deleteWorker = async (id: string) => {
  const supabase = createClient()
  await supabase
    .from('Trabajador')
    .delete()
    .eq('id', id)
}