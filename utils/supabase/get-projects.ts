import { createClient } from "./server"

export const getProjects = async () => {
  const supabase = createClient()
  const { data: projects, error } = await supabase
    .from("Proyecto")
    .select("*")

  if (error) return {
    error: "Error al obtener los proyectos",
    projects
  }

  return {
    error: null,
    projects
  }
}