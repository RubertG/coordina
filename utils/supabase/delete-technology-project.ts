import { createClient } from "./client"

export const deleteTechnologyProject = async (idPro: string, idTech: string) => {
  const supabase = createClient()
  await supabase
    .from('Proyecto_tecnologia')
    .delete()
    .eq('id_proyecto', idPro)
    .eq('id_tecnologia', idTech)
}