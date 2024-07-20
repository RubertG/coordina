"use server"
import { TechnologyAction } from "@/types/technology"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"


export const CreateWorker = async ({ formData}: TechnologyAction ) => {
  const name = formData.get("name") as string
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()


  if (!user) return {
    error: "No hay un usuario autenticado"
  }

  const { error: errorTech,data } = await supabase
    .from("Tecnologia")
    .insert({
      nombre: name
    })
    .select()
    .single()

  if (errorTech) return {
    error: "Error al crear la tecnologia"
  }

  return redirect("/tecnologias")
}