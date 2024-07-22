import { Database } from "@/types/db/supabase"
import { createClient } from "./client"
import { PERCENTAGE_MIN_TECH } from "@/const/workers/workers"

export const getBestWorkers = async (
  technologies: { tecnologia: Database["public"]["Tables"]["Tecnologia"]["Row"] | null }[],
  idProyecto?: string
) => {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return {
    error: "No hay un usuario autenticado",
    workers: null
  }

  const { data: workers, error } = await supabase
    .from("Trabajador")
    .select("*, tecnologias:Trabajador_tecnologia(experiencia, tecnologia:Tecnologia(*)), proyectos:Proyecto_trabajador(*)")
    .eq("id_usuario", user.id)

  if (error || !workers) return {
    error: "Error al obtener los trabajadores",
    workers
  }

  const minTechs = Math.ceil(technologies.length * PERCENTAGE_MIN_TECH)

  // Crear un conjunto con los nombres de las tecnologías requeridas para una búsqueda más rápida
  const requiredTechNames = new Set(technologies.map(t => t.tecnologia?.nombre))

  // Seleccionar trabajadores con el mínimo de tecnologías
  const bestWorkers = workers.map(worker => {
    let techs = 0
    let totalExperience = 0

    // Usar un solo bucle para calcular tecnologías y experiencia
    worker.tecnologias.forEach(t => {
      if (requiredTechNames.has(t.tecnologia?.nombre)) {
        techs++
        totalExperience += t.experiencia
      }
    })

    // Verificar si el trabajador ya está en el proyecto
    if (idProyecto) {
      const inProject = worker.proyectos.some(project => project.id_proyecto === idProyecto)

      if (techs >= minTechs && !inProject) {
        return {
          ...worker,
          techs,
          totalExperience
        }
      }
    }

    if (techs >= minTechs) {
      return {
        ...worker,
        techs,
        totalExperience
      }
    }
  }).filter(worker => worker != undefined)

  // Ordenar según experiencia
  const bW = bestWorkers.sort((a, b) => (b?.totalExperience || 0) - (a?.totalExperience || 0))

  return {
    error: null,
    workers: bW
  }
}