import { Database } from "@/types/db/supabase"
import { createClient } from "./server"
import { PERCENTAGE_MIN_TECH } from "@/const/workers/workers"

export const getBestWorkers = async (
  technologies: {
    tecnologia: Database["public"]["Tables"]["Tecnologia"]["Row"] | null
  }[],
  idProject?: string
) => {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return {
    error: "No hay un usuario autenticado",
    workers: null
  }

  const { data: workers, error } = await supabase
    .from("Trabajador")
    .select("*, tecnologias:Trabajador_tecnologia(experiencia, tecnologia:Tecnologia(*)), id_proyecto:Proyecto_trabajador(id_proyecto)")
    .eq("id_usuario", user.id)

  if (error || !workers) return {
    error: "Error al obtener los trabajadores",
    workers
  }

  const minTechs = Math.floor(technologies.length * PERCENTAGE_MIN_TECH)
  const workersAux = await Promise.all(workers.map(async (worker) => {
    const { data: workerTechs, error } = await supabase
      .from("Trabajador_tecnologia")
      .select("*")
      .eq("id_trabajador", worker.id)

    if (error || !workerTechs) return {
      ...worker,
      techs: 0,
      totalExperience: 0
    }

    if (idProject && idProject === worker.id_proyecto[0].id_proyecto) {
      return {
        ...worker,
        techs: 0,
        totalExperience: 0
      }
    }

    // verificar el minimo de tecnologias
    let techs = 0
    let totalExperience = 0
    for (const tech of workerTechs) {
      if (technologies.find((t) => t.tecnologia?.id === tech.id_tecnologia)) {
        techs++
        totalExperience += tech.experiencia 
      } 
    }

    if (techs < minTechs) return {
      ...worker,
      techs: 0,
      totalExperience: 0
    }

    return {
      ...worker,
      techs,
      totalExperience
    } 
  }))

  const workersSorted = workersAux.sort((a, b) => {
    if (a.totalExperience > b.totalExperience) return 1
    if (a.totalExperience < b.totalExperience) return -1
    return 0
  })

  return {
    error: null,
    workers: workersSorted
  }
}