import { createClient } from "./client"
import { Database } from "@/types/db/supabase"

export const updateRolWorker = async (
  idProject: string,
  idWorker: string,
  rolW: Database['public']['Tables']['Proyecto_trabajador']['Row']['rol']
) => {
  const supabase = createClient()
  await supabase
    .from('Proyecto_trabajador')
    .delete()
    .eq('id_proyecto', idProject)
    .eq('id_trabajador', idWorker)
  await supabase
    .from('Proyecto_trabajador')
    .insert({ id_proyecto: idProject, id_trabajador: idWorker, rol: rolW })
}