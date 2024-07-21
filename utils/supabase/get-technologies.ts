import { createClient } from "./client"


export const getTechnologies = async () => {
  const supabase = createClient()
  const { data: technologies, error } = await supabase
    .from("Tecnologia")
    .select("*")
   
  if (error) return {
    error: "Error al obtener las tecnologias",
    technologies
  }

  return {
    error: null,
    technologies
  }
}