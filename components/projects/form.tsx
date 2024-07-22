import Link from "next/link"
import { ProjectsWorkersContainer } from "./projects-workers-container"
import { WorkersSelectedContainer } from "./workers-selected-container"
import { TechnologiesContainer } from "./technologies-container"
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react"
import { BestWorkers, Technologies, WorkersStateType } from "@/types/project"

interface Props {
  className?: string
  onSubmit: (event: FormEvent<HTMLFormElement>) => void,
  setTechnologies: Dispatch<SetStateAction<Technologies[]>>,
  technologies: Technologies[],
  limit: number,
  handleChangeLimit: (e: ChangeEvent<HTMLInputElement>) => void,
  getBestW: () => Promise<void>,
  loadingWorkers: boolean,
  handleChangeRol: (e: ChangeEvent<HTMLSelectElement>, id: string) => void,
  handleDelete: (id: string) => void,
  workers: WorkersStateType[],
  setWorkers: Dispatch<SetStateAction<WorkersStateType[]>>,
  bestWorkers: BestWorkers[],
  setBestWorkers: Dispatch<SetStateAction<BestWorkers[]>>,
  loading: boolean,
  error: string,
  defaultValues?: {
    id: string
    name: string
    description: string
    technologies: Technologies[]
    setDefaultTech: Dispatch<SetStateAction<Technologies[]>>
    defaultWorkers: WorkersStateType[]
    setDefaultWorkers: Dispatch<SetStateAction<WorkersStateType[]>>
    defaultLimit: number | undefined
  }
}

export const Form = ({
  className, handleChangeLimit, limit,
  onSubmit, setTechnologies, technologies,
  bestWorkers, getBestW, handleChangeRol,
  handleDelete, loadingWorkers, setBestWorkers,
  setWorkers, workers, error, loading, defaultValues
}: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`mx-auto ${className}`}>
      <section className="max-w-2xl mx-auto flex flex-col">
        <label
          className="text-white mb-3"
          htmlFor="name">
          Nombre del proyecto <span className="text-red-600 font-bold">*</span>
        </label>
        <input
          className="rounded-lg px-4 py-2 bg-inherit border border-gray-100 mb-6 text-gray-200"
          name="name"
          placeholder="Proyecto página web"
          defaultValue={defaultValues?.name || ""}
          required
        />

        <label
          className="text-white mb-3"
          htmlFor="description">
          Descripción del proyecto <span className="text-red-600 font-bold">*</span>
        </label>
        <textarea
          className="rounded-lg px-4 py-2 bg-inherit border border-gray-100 mb-6 text-gray-200 appearance-none resize-none"
          name="description"
          placeholder="Descripción del proyecto"
          defaultValue={defaultValues?.description || ""}
          required
        />

        <TechnologiesContainer
          defaultTech={defaultValues?.technologies}
          idProject={defaultValues?.id}
          setDefaultTech={defaultValues?.setDefaultTech}
          setTechnologies={setTechnologies}
          technologies={technologies} />

        <label
          className="text-white mb-3 mt-3"
          htmlFor="limit">
          Límite de integrantes <span className="text-red-600 font-bold">*</span>
        </label>
        <input
          type="number"
          className="appearance-none rounded-lg px-4 py-2 bg-inherit border border-gray-100 mb-6 text-gray-200"
          name="limit"
          min={0}
          placeholder="0"
          defaultValue={defaultValues?.defaultLimit}
          onChange={handleChangeLimit}
          required
        />

        <div className="flex items-center justify-between mb-3">
          <label
            className="text-white"
            htmlFor="limit">
            Integrantes <span className="text-red-600 font-bold">*</span>
          </label>

          <button
            type="button"
            className="bg-green-700 rounded-lg px-4 py-2 text-foreground lg:hover:bg-green-800 lg:transition-colors text-sm"
            onClick={getBestW}
          >
            {loadingWorkers ? "Cargando trabajadores..." : "Trabajadores recomendados"}
          </button>
        </div>
        <ProjectsWorkersContainer
          defaultWorkers={defaultValues?.defaultWorkers}
          setDefaultWorkers={defaultValues?.setDefaultWorkers}
          idProject={defaultValues?.id}
          handleChangeRol={handleChangeRol}
          handleDelete={handleDelete}
          workers={workers}
          className="mt-4"
        />
      </section>

      <WorkersSelectedContainer
        limit={limit}
        className="mt-4"
        bestWorkers={bestWorkers}
        setBestWorkers={setBestWorkers}
        setWorkers={setWorkers}
        workers={workers}
        defaultWorkers={defaultValues?.defaultWorkers}
        setDefaultWorkers={defaultValues?.setDefaultWorkers}
      />

      <footer className="flex justify-end gap-5 items-center mt-7 max-w-2xl mx-auto">
        <Link
          href={"/"}
          className="text-gray-300 lg:hover:text-gray-100 lg:transition-colors">
          Volver
        </Link>
        <button
          type="submit"
          className="bg-green-700 rounded-lg px-4 py-2 text-foreground lg:hover:bg-green-800 lg:transition-colors">
          {loading ? "Guardando..." : "Guardar"}
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