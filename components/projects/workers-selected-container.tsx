"use client"

import { useWorkersSelected } from "@/hooks/projects/use-workers-selected"
import { BestWorkers, WorkersStateType } from "@/types/project"
import clsx from "clsx"

interface Props {
  className?: string
  bestWorkers: BestWorkers[]
  setBestWorkers: React.Dispatch<React.SetStateAction<BestWorkers[]>>
  workers: WorkersStateType[]
  setWorkers: React.Dispatch<React.SetStateAction<WorkersStateType[]>>
  limit: number
  defaultWorkers?: WorkersStateType[]
  setDefaultWorkers?: React.Dispatch<React.SetStateAction<WorkersStateType[]>>
}

interface TechsBestWorkers {
  tecnologia: {
    id: string;
    nombre: string;
  } | null;
}

const parseTechs = (techs: TechsBestWorkers[]) => {
  let str = ""

  for (let i = 0; i < techs.length; i++) {
    if (i === techs.length - 1) {
      str += `${techs[i].tecnologia?.nombre}`
    } else {
      str += `${techs[i].tecnologia?.nombre}, `
    }
  }

  return str
}

export const WorkersSelectedContainer = ({
  className,
  bestWorkers,
  setBestWorkers,
  workers,
  setWorkers,
  limit,
  defaultWorkers
}: Props) => {
  const { handleSelected, saveChanges, selecteds } = useWorkersSelected({
    bestWorkers, workers, defaultWorkers,
    limit, setBestWorkers, setWorkers
  })

  if (bestWorkers.length === 0) return null

  return (
    <section className={`p-4 bg-gray-900 rounded-lg ${className}`}>
      <h2 className="text-white mb-3">Selecciona los mejores trabajadores</h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 gap-y-4">
        {
          selecteds?.map(({ worker, selected }) => {
            return (
              <li
                className={clsx("flex gap-2 items-center justify-between px-4 py-2 rounded-lg lg:hover:bg-gray-800 lg:transition-colors border cursor-pointer", {
                  "border-gray-200": selected,
                  "border-gray-900": !selected
                })}
                onClick={() => handleSelected(worker)}
                key={worker.id}>
                <div className="overflow-hidden">
                  <h2
                    title={worker.nombre}
                    className="text-gray-200 font-bold text-lg text-ellipsis overflow-hidden whitespace-nowrap">
                    {worker.nombre}
                  </h2>
                  <p
                    title={parseTechs(worker.tecnologias)}
                    className="text-gray-300 text-sm text-ellipsis overflow-hidden whitespace-nowrap">
                    {parseTechs(worker.tecnologias)}
                  </p>
                  <p
                    title={parseTechs(worker.tecnologias)}
                    className="text-gray-300 text-sm text-ellipsis overflow-hidden whitespace-nowrap">
                    Pertenece a {worker.proyectos.length} {worker.proyectos.length === 1 ? "proyecto" : "proyectos"}
                  </p>
                  {
                    worker.totalExperience !== 0 && (
                      <p
                        title={`${worker.enfoque} - ${worker.totalExperience} meses de experiencia`}
                        className="text-gray-300 text-sm text-ellipsis overflow-hidden whitespace-nowrap">
                        {worker.enfoque} - {worker.totalExperience} meses de experiencia
                      </p>
                    )
                  }
                </div>
              </li>
            )
          })
        }
      </ul>

      <button
        type="button"
        onClick={saveChanges}
        className="bg-green-700 rounded-lg px-4 py-2 text-foreground lg:hover:bg-green-800 lg:transition-colors text-sm mt-4">
        Guardar cambios
      </button>
    </section>
  )
}