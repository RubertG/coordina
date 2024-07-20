import { createClient } from "./server"

export const getWorkers = async () => {
  const supabase = createClient()
  const { data: workers, error } = await supabase
    .from("Trabajador")
    .select("*,tecnologias:Trabajador_tecnologia(experiencia,tecnologias:Tecnologia(*))")

  if (error) return {
    error: "Error al obtener los trabajadores",
    workers
  }

  return {
    error: null,
    workers
  }
}

console.log(getWorkers())