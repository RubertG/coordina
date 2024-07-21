import { createClient } from "./client"

export const deleteWorkerProject = async (idWorker: string, idPro: string ) => {
  const supabase = createClient()
  await supabase
    .from('Proyecto_trabajador')
    .delete()
    .eq('id_proyecto', idPro)
    .eq('id_trabajador', idWorker)
    
}