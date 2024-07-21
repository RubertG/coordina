"use client"

import { Technologies } from "@/types/worker"
import { FormEvent, useEffect, useState } from "react"
import { TechnologiesContainer } from "./technologies-container"
import Link from "next/link"
import { createWorker } from "@/server-actions/create-worker"

export const CreateForm = ({
  className
}: {
  className?: string
}) => {
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

  return (
    <form
      className={`flex flex-col max-w-lg mx-auto ${className}`}
      onSubmit={onSubmit}>
      <label
        className="text-white mb-3"
        htmlFor="name">
        Nombre del trabajador <span className="text-red-600 font-bold">*</span>
      </label>
      <input
        className="rounded-lg px-4 py-2 bg-inherit border border-gray-100 mb-6 text-gray-200"
        name="name"
        placeholder="Pepito Perez"
        required
      />

      <label
        className="text-white mb-3"
        htmlFor="approach">
        Enfoque del trabajador <span className="text-red-600 font-bold">*</span>
      </label>
      <input
        className="rounded-lg px-4 py-2 bg-inherit border border-gray-100 mb-6 text-gray-200"
        name="approach"
        placeholder="Frontend"
        required
      />

      <TechnologiesContainer
        setTechnologies={setTechnologies}
        technologies={technologies} />

      <footer className="flex justify-end gap-5 items-center mt-7">
        <Link
          href={"/trabajadores"}
          className="text-gray-300 lg:hover:text-gray-100 lg:transition-colors">
          Volver
        </Link>
        <button
          type="submit"
          className="bg-green-700 rounded-lg px-4 py-2 text-foreground lg:hover:bg-green-800 lg:transition-colors">
          {loading ? "Agregando..." : "Agregar"}
        </button>
      </footer>

      {
        error && (
          <p className="text-red-600 text-center font-medium mt-5">
            {error}
          </p>
        )
      }
    </form>
  )
}