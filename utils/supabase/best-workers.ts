import { Database } from "@/types/db/supabase"
import { createClient } from "./server"
import { PERCENTAGE_MIN_TECH } from "@/const/workers/workers"

export const getBestWorkers = async (technologies: {tecnologia: Database["public"]["Tables"]["Tecnologia"]["Row"] | null}[],
  idProyecto: string
) => {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return {
    error: "No hay un usuario autenticado",
    workers: null
  }

  const { data: workers, error } = await supabase
    .from("Trabajador")
    .select("*, tecnologias:Trabajador_tecnologia(experiencia, tecnologia:Tecnologia(*))")
    .eq("id_usuario", user.id)

  if (error || !workers) return {
    error: "Error al obtener los trabajadores",
    workers
  }

  const minTechs = Math.floor(technologies.length * PERCENTAGE_MIN_TECH)

  // Seleccionar trabajadores con el minimo de tecnologias
  const bestWorkers = workers.map(worker => {
    let techs = 0
    let totalExperience = 0

    worker.tecnologias.forEach(t => {
      technologies.forEach(tAux => {
        if(t.tecnologia?.nombre == tAux.tecnologia?.nombre){
          techs++
          totalExperience += t.experiencia
        }
      })
    })

    if(techs >= minTechs) return {
      ...worker,
      techs,
      totalExperience
    }
  }).filter(worker => worker != undefined)

  // No mostrar los que estan en el proyecto

  // Ordenar segun experiencia
  bestWorkers.sort((a, b) => b.totalExperience - a.totalExperience);

  return {
    error: null,
    workers: bestWorkers
  }
}