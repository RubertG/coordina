"use server"

import { createClient } from "@/utils/supabase/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const signIn = async (formData: FormData) => {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    return redirect("/login?mensaje=Correo o contrase%C3%B1a incorrectos")
  }

  return redirect("/")
}

export const signUp = async (formData: FormData) => {
  const origin = headers().get("origin")
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`
    }
  })

  if (error) {
    return redirect("/login?mensaje=Error al registrar el usuario")
  }

  return redirect("/login?mensaje=Chequea tu correo para confirmar tu cuenta")
}