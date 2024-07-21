"use server"

import { ProjectAction } from "@/types/project"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"


export const EditProject = async (id: string, { formData, technologies, workers }: ProjectAction) => {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const limit = formData.get("limit") as string
  const limitV = Number(limit)
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return {
    error: "No hay un usuario autenticado"
  }

  const { error: errorProject, data } = await supabase
    .from("Proyecto")
    .update({
      nombre: name,
      descripcion: description,
      limite_integrantes: limitV
    })
    .eq("id", id)
    .select()
    .single()

  if (errorProject) return {
    error: "Error al crear el proyecto"
  }

  const te = technologies.map(({ id: idTech }) => {
    return {
      id_tecnologia: idTech,
      id_proyecto: data.id
    }
  })


  const { error: errorProyectTechnologies } = await supabase
    .from("Proyecto_tecnologia")
    .insert(te)

  if (errorProyectTechnologies) return {
    error: "Error al actualizar las tecnologías del proyecto"
  }

  const wo = workers.map(({ id: idWorker, rol }) => {
    return {
      id_proyecto: data.id,
      id_trabajador: idWorker,
      rol: rol
    }
  })


  const { error: errorProjectWorkers } = await supabase
    .from("Proyecto_trabajador")
    .insert(wo)

  if (errorProjectWorkers) return {
    error: "Error al crear los trabajadores del proyecto"
  }


  return redirect("/proyectos")
}