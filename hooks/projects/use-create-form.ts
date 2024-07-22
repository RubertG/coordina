"use client"

import { createProject } from "@/server-actions/create-project"
import { Database } from "@/types/db/supabase"
import { BestWorkers, Technologies, WorkersStateType } from "@/types/project"
import { getBestWorkers } from "@/utils/supabase/best-workers"
import { ChangeEvent, FormEvent, useState } from "react"

export const useCreateForm = () => {
  const [technologies, setTechnologies] = useState<Technologies[]>([])
  const [bestWorkers, setBestWorkers] = useState<BestWorkers[]>([])
  const [loadingWorkers, setLoadingWorkers] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [workers, setWorkers] = useState<WorkersStateType[]>([])
  const [limit, setLimit] = useState(0)

  const getBestW = async () => {
    setLoadingWorkers(true)
    const { error, workers } = await getBestWorkers(technologies.map(t => ({
      tecnologia: {
        id: t.id,
        nombre: t.nombre
      }
    })))

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

    if (!technologies.length) {
      setError("Debes agregar al menos una tecnología")
      setLoading(false)
      return
    }

    if (!workers.length) {
      setError("Debes agregar al menos un integrante")
      setLoading(false)
      return
    }

    const res = await createProject({
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
    handleDelete
  }
}