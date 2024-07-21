import { createClient } from "./client"

export const deleteTechnologyWorker = async (idTech: string, idWorker: string) => {
  const supabase = createClient()
  await supabase
    .from('Trabajador_tecnologia')
    .delete()
    .eq('id_trabajador', idWorker)
    .eq('id_tecnologia', idTech)
}