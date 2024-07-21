import { createWorker } from "@/server-actions/create-worker"
import { Technologies } from "@/types/worker"
import { FormEvent, useEffect, useState } from "react"

export const useCreateWorker = () => {
  const [technologies, setTechnologies] = useState<Technologies[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setError("")
  }, [technologies])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (technologies.length === 0) {
      setError("Por favor, agrega al menos una tecnología")
      return
    }

    setLoading(true)
    const formData = new FormData(event.currentTarget)
    const res = await createWorker({ formData, technologies })

    if (res?.error) {
      setError(res?.error)
      setLoading(false)
      return
    }
  }

  return {
    onSubmit,
    error,
    loading,
    technologies,
    setTechnologies
  }
}