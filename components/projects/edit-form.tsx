"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { BestWorkers, Project, Technologies, WorkersStateType } from "@/types/project"
import { getBestWorkers } from "@/utils/supabase/best-workers"
import { Database } from "@/types/db/supabase"
import { Form } from "./form"
import { getProject } from "@/utils/supabase/get-project"
import { editProject } from "@/server-actions/edit-project"

export const EditForm = ({
  className,
  id: idProject
}: {
  className?: string,
  id: string
}) => {
  // TODO: obtener valores por defecto, colocar esos valores en el formulario, colocar tecnologias y trabajadores por que ya trae el proyecto 

  const [technologies, setTechnologies] = useState<Technologies[]>([])
  const [bestWorkers, setBestWorkers] = useState<BestWorkers[]>([])
  const [loadingWorkers, setLoadingWorkers] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [defaultTech, setDefaultTech] = useState<Technologies[]>([])
  const [defaultWorkers, setDefaultWorkers] = useState<WorkersStateType[]>([])
  const [workers, setWorkers] = useState<WorkersStateType[]>([])
  const [limit, setLimit] = useState(0)
  const [defaultLimit, setDefaultLimit] = useState<number>()
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

    if (error || !workers) return

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

  return (
    <Form
      bestWorkers={bestWorkers}
      limit={limit}
      getBestW={getBestW}
      technologies={technologies}
      workers={workers}
      loadingWorkers={loadingWorkers}
      loading={loading}
      error={error}
      onSubmit={onSubmit}
      setTechnologies={setTechnologies}
      setBestWorkers={setBestWorkers}
      setWorkers={setWorkers}
      handleChangeLimit={handleChangeLimit}
      handleChangeRol={handleChangeRol}
      handleDelete={handleDelete}
      className={className}
      defaultValues={{
        id: project?.id || "",
        description: project?.descripcion || "",
        name: project?.nombre || "",
        defaultWorkers,
        technologies: defaultTech,
        setDefaultTech,
        setDefaultWorkers,
        defaultLimit: defaultLimit 
      }}
    />
  )
}