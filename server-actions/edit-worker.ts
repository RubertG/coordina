"use server"

import { WorkerAction } from "@/types/worker"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"


export const EditWorker = async (id: string, { formData, technologies }: WorkerAction) => {
    const name = formData.get("name") as string
    const approach = formData.get("approach") as string
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()


    if (!user) return {
        error: "No hay un usuario autenticado"
    }

    const { error: errorWorker, data } = await supabase
        .from("Trabajador")
        .update({
            nombre: name,
            enfoque: approach
        })
        .eq("id", id)
        .select()
        .single()

    if (errorWorker) return {
        error: "Error al actualizar al trabajador"
    }

    const t = technologies.map(({ id: idTech, experience }) => {
        return {
            id_trabajador: data.id,
            id_tecnologia: idTech,
            experiencia: experience
        }
    })

    await Promise.all(t.map(async (Technology) => {
        const { error: errorWorkerTechnologies } = await supabase
            .from("Trabajador_tecnologia")
            .update(Technology).eq("id_trabajador", data.id)

        if (errorWorkerTechnologies) return {
            error: "Error al crear las tecnologías del trabajador"
        }
    }))

    return redirect("/trabajadores")
}