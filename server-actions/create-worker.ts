"use server"

import { WorkerAction } from "@/types/worker"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { v4 as uuidv4 } from "uuid"

export const CreateWorker = async ({ formData, technologies }: WorkerAction) => {
  const name = formData.get("name") as string
  const approach = formData.get("approach") as string
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const id = uuidv4()

  if (!user) return {
    error: "No hay un usuario autenticado"
  }

  const { error: errorWorker } = await supabase
    .from("Trabajador")
    .insert({
      id,
      nombre: name,
      enfoque: approach,
      id_usuario: user.id
    })

  if (errorWorker) return {
    error: "Error al crear al trabajador"
  }

  const t = technologies.map(({ id: idTech, experience }) => {
    return {
      id_trabajador: id,
      id_tecnologia: idTech,
      experiencia: experience
    }
  })

  const { error: errorWorkerTechnologies } = await supabase
    .from("Trabajador_tecnologia")
    .insert(t)

  if (errorWorkerTechnologies) return {
    error: "Error al crear las tecnologías del trabajador"
  }

  return redirect("/trabajadores")
}