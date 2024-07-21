import { createClient } from "./client"

export const getWorker = async (id: string) => {
  const supabase = createClient()

  const { data: worker, error } = await supabase
    .from("Trabajador")
    .select("*,tecnologias:Trabajador_tecnologia(experiencia,tecnologias:Tecnologia(*))")
    .eq("id", id)
    .single()

  if (error) return {
    error: "Error al obtener los trabajadores",
    worker
  }

  return {
    error: null,
    worker
  }
}

export const deleteTechnologyWorker = async (idTech: string, idWorker: string) => {
  const supabase = createClient()
  await supabase
    .from('Trabajador_tecnologia')
    .delete()
    .eq('id_trabajador', idWorker)
    .eq('id_tecnologia', idTech)
}