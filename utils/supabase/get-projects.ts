import { createClient } from "./server"

export const getProjects = async () => {
  const supabase = createClient()
  const {data: {user}}= await supabase.auth.getUser()

  if(!user) return {
    error: "No hay un usuario autenticado",
    workers: null
  }

  const { data: projects, error } = await supabase
    .from("Proyecto")
    .select("*")
    .eq("id_usuario",user.id)

  if (error) return {
    error: "Error al obtener los proyectos",
    projects
  }

  return {
    error: null,
    projects
  }
}