import { Database } from "./db/supabase"

type Technologies = Database["public"]["Tables"]["Tecnologia"]["Row"]

export interface Workers {
  id: string
  rol: Database["public"]["Tables"]["Proyecto_trabajador"]["Row"]["rol"]
}

export interface WorkersStateType extends Workers {
  enfoque: string;
  nombre: string;
  totalExperience: number;
}

export interface ProjectAction {
  formData: FormData
  technologies: Technologies[]
  workers: Workers[]
}

export interface BestWorkers {
  techs: number;
  totalExperience: number;
  enfoque: string;
  id: string;
  id_usuario: string;
  nombre: string;
  tecnologias: {
    experiencia: number;
    tecnologia: {
      id: string;
      nombre: string;
    } | null;
  }[];
  proyectos: {
    id_proyecto: string;
    id_trabajador: string;
    rol: Database["public"]["Enums"]["Rol"];
  }[];
}

export type Project = {
  descripcion: string;
  id: string;
  id_usuario: string;
  limite_integrantes: number;
  nombre: string;
  tecnologias: {
    tecnologia: {
      id: string;
      nombre: string;
    } | null;
  }[];
  trabajadores: {
    rol: Database["public"]["Enums"]["Rol"];
    trabajador: Database["public"]["Tables"]["Trabajador"]["Row"] | null;
  }[];
} | null