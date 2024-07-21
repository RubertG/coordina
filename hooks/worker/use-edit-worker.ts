"use client"

import { editWorker } from "@/server-actions/edit-worker"
import { Technologies } from "@/types/worker"
import { getWorker } from "@/utils/supabase/get-worker"
import { FormEvent, useEffect, useState } from "react"

export const useEditWorker = (id: string) => {
  const [technologies, setTechnologies] = useState<Technologies[]>([])
  const [defaultTech, setDefaultTech] = useState<Technologies[]>([])
  const [defaultValues, setDefaultValues] = useState({ name: "", approach: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setError("")
  }, [technologies])

  useEffect(() => {
    const getW = async () => {
      const { worker, error } = await getWorker(id)

      if (error || !worker || !worker.tecnologias) {
        setError(error ? error : "Error al obtener los datos del usuario")
        return
      }

      const newTech: Technologies[] = worker.tecnologias.map((t) => {
        return {
          experience: t.experiencia,
          id: t.tecnologias?.id || "no-id",
          name: t.tecnologias?.nombre || "no-name"
        }
      })
      setDefaultValues({
        approach: worker.enfoque,
        name: worker.nombre
      })
      setDefaultTech(newTech)
    }
    getW()
  }, [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (technologies.length === 0 && defaultTech.length === 0) {
      setError("Por favor, agrega al menos una tecnología")
      return
    }

    setLoading(true)
    const formData = new FormData(event.currentTarget)

    const res = await editWorker(id, { formData, technologies })
    
    if (res?.error) {
      setError(res?.error)
      setLoading(false)
      return
    }

    setLoading(false)
  }

  return {
    onSubmit,
    technologies,
    setTechnologies,
    defaultTech,
    setDefaultTech,
    loading,
    error,
    defaultValues
  }
}