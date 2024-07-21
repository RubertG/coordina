import { Database } from "@/types/db/supabase"
import { createClient } from "./server"
import { PERCENTAGE_MIN_TECH } from "@/const/workers/workers"

export const getBestWorkers = async (technologies: Database["public"]["Tables"]["Tecnologia"]["Row"][], idProject: string ) => {
  const supabase = createClient()
  const {data: {user}}= await supabase.auth.getUser()

  if(!user) return {
    error: "No hay un usuario autenticado",
    workers: null
  }

  const { data: workers, error } = await supabase
    .from("Trabajador")
    .select("*, tecnologias:Trabajador_tecnologia(experiencia, tecnologia:Tecnologia(*))")
    .eq("id_usuario", user.id) 
 
 const minTechs = Math.floor(technologies.length * PERCENTAGE_MIN_TECH)


  if (error) return {
    error: "Error al obtener los proyectos",
    workers
  }

  return {
    error: null,
    workers
  }

}