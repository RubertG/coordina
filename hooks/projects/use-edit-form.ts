"use client"

import { editProject } from "@/server-actions/edit-project"
import { Database } from "@/types/db/supabase"
import { BestWorkers, Project, Technologies, WorkersStateType } from "@/types/project"
import { getBestWorkers } from "@/utils/supabase/best-workers"
import { getProject } from "@/utils/supabase/get-project"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

export const useEditForm = (idProject: string) => {
  const [technologies, setTechnologies] = useState<Technologies[]>([])
  const [bestWorkers, setBestWorkers] = useState<BestWorkers[]>([])
  const [loadingWorkers, setLoadingWorkers] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [defaultTech, setDefaultTech] = useState<Technologies[]>([])
  const [defaultWorkers, setDefaultWorkers] = useState<WorkersStateType[]>([])
  const [workers, setWorkers] = useState<WorkersStateType[]>([])
  const [defaultLimit, setDefaultLimit] = useState<number>()
  const [limit, setLimit] = useState(0)
  const [project, setProject] = useState<Project>({
    id: "",
    nombre: "",
    descripcion: "",
    tecnologias: [],
    limite_integrantes: 0,
    id_usuario: "",
    trabajadores: []
  })

  useEffect(() => {
    const getP = async () => {
      const { error, project } = await getProject(idProject)

      if (error || !project) {
        setError(error ? error : "Error al obtener los datos del proyecto")
        return
      }

      setProject(project)
      setDefaultTech(project.tecnologias.map(({ tecnologia }) => ({
        id: tecnologia?.id || "",
        nombre: tecnologia?.nombre || ""
      })))
      setDefaultWorkers(project.trabajadores.map(({ trabajador, rol }) => ({
        enfoque: trabajador?.enfoque || "",
        id: trabajador?.id || "",
        nombre: trabajador?.nombre || "",
        rol: rol || "Integrante",
        totalExperience: 0
      })))
      setDefaultLimit(project.limite_integrantes)
      setLimit(project.limite_integrantes)
    }

    getP()
  }, [])

  const getBestW = async () => {
    setLoadingWorkers(true)
    const t = [...technologies, ...defaultTech].map(t => ({
      tecnologia: {
        id: t.id,
        nombre: t.nombre
      }
    }))

    const { error, workers } = await getBestWorkers(t)

    if (error || workers == undefined) return

    setBestWorkers(workers)
    setLoadingWorkers(false)
  }

  const handleDelete = (id: string) => {
    setWorkers(workers.filter((worker) => worker.id !== id))
  }

  const handleChangeLimit = (e: ChangeEvent<HTMLInputElement>) => {
    setLimit(e.target.value ? parseInt(e.target.value) : 0)
  }

  const handleChangeRol = (e: ChangeEvent<HTMLSelectElement>, id: string) => {
    setWorkers(workers.map((worker) => {
      if (worker.id === id) {
        return {
          ...worker,
          rol: e.target.value ? e.target.value as Database["public"]["Enums"]["Rol"] : "Integrante"
        }
      }
      return worker
    }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (technologies.length === 0 && defaultTech.length === 0) {
      setError("Debes agregar al menos una tecnología")
      setLoading(false)
      return
    }

    if (workers.length === 0 && defaultWorkers.length === 0) {
      setError("Debes agregar al menos un integrante")
      setLoading(false)
      return
    }

    const res = await editProject(idProject, {
      formData: new FormData(e.currentTarget),
      technologies,
      workers
    })

    if (res?.error) {
      setError(res.error)
    }

    setLoading(false)
  }

  return {
    bestWorkers,
    limit,
    getBestW,
    technologies,
    workers,
    loadingWorkers,
    loading,
    error,
    onSubmit,
    setTechnologies,
    setBestWorkers,
    setWorkers,
    handleChangeLimit,
    handleChangeRol,
    project,
    defaultWorkers,
    defaultTech,
    setDefaultTech,
    setDefaultWorkers,
    defaultLimit,
    handleDelete
  }
}