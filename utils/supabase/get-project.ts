import { createClient } from "./client"

export const getProject = async (id: string) => {
  const supabase = createClient()


  const { data: project, error } = await supabase
    .from("Proyecto")
    .select("*,tecnologias:Proyecto_tecnologia(tecnologia:Tecnologia(*)), trabajadores:Proyecto_trabajador(rol,trabajador:Trabajador(*))")
    .eq("id", id)
    .single()

  if (error) return {
    error: "Error al obtener el proyecto",
    project
  }


  return {
    error: null,
    project
  }
}
