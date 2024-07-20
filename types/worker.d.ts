import { Database } from "./db/supabase"

export interface Technologies {
  id: string
  name: Database["public"]["Tables"]["Tecnologia"]["Row"]["nombre"]
  experience: Database["public"]["Tables"]["Trabajador_tecnologia"]["Row"]["experiencia"]
}

export interface WorkerAction {
  formData: FormData
  technologies: Technologies[]
}