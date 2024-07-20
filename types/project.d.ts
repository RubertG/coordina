import { Database } from "./db/supabase"

export interface Technologies {
  id: string
}

export interface Workers {
  id: string
  rol: Database["public"]["Tables"]["Proyecto_trabajador"]["Row"]["rol"]
}

export interface ProjectAction {
  formData: FormData
  technologies: Technologies[]
  workers: Workers[]
}