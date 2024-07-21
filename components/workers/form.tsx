import Link from "next/link"
import { TechnologiesContainer } from "./technologies-container"
import { FormEvent } from "react"
import { Technologies } from "@/types/worker"

interface Props {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  className?: string
  technologies: Technologies[]
  setTechnologies: React.Dispatch<React.SetStateAction<Technologies[]>>
  defaultTech?: Technologies[]
  setDefaultTech?: React.Dispatch<React.SetStateAction<Technologies[]>>
  loading: boolean
  error: string
  idWorker?: string
  defaultValues?: {
    name: string
    approach: string
  }
}

export const Form = ({
  onSubmit,
  className,
  technologies,
  setTechnologies,
  loading,
  error,
  idWorker,
  defaultTech,
  setDefaultTech,
  defaultValues = { approach: "", name: "" }
}: Props) => {
  const { name, approach } = defaultValues

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
        defaultValue={name}
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
        defaultValue={approach}
        required
      />

      <TechnologiesContainer
        defaultTech={defaultTech}
        setDefaultTech={setDefaultTech}
        idWorker={idWorker}
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
          {defaultTech ? (
            <>{loading ? "Guardando..." : "Guardar"}</>
          ) : (
            <>{loading ? "Agregando..." : "Agregar"}</>
          )}
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