import { createClient } from "./server"

export const getWorkers = async () => {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return {
    error: "No hay un usuario autenticado",
    workers: null
  }

  const { data: workers, error } = await supabase
    .from("Trabajador")
    .select("*,tecnologias:Trabajador_tecnologia(experiencia,tecnologias:Tecnologia(*))")
    .eq("id_usuario", user.id)

  if (error) return {
    error: "Error al obtener los trabajadores",
    workers
  }

  return {
    error: null,
    workers
  }
}