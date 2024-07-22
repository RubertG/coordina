"use client"

import { WorkersStateType } from "@/types/project"
import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { ProjectsWorkersCard } from "./projects-workers-card"
import { deleteWorkerProject } from "@/utils/supabase/delete-worker-project"
import { updateRolWorker } from "@/utils/supabase/update-rol-worker"
import { Database } from "@/types/db/supabase"

interface Props {
  className?: string
  workers: WorkersStateType[]
  handleDelete: (id: string) => void
  handleChangeRol: (e: ChangeEvent<HTMLSelectElement>, id: string) => void
  defaultWorkers?: WorkersStateType[]
  setDefaultWorkers?: Dispatch<SetStateAction<WorkersStateType[]>>
  idProject?: string
}

export const ProjectsWorkersContainer = ({
  workers,
  className,
  handleDelete,
  handleChangeRol,
  defaultWorkers,
  setDefaultWorkers,
  idProject
}: Props) => {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {
        defaultWorkers?.map((worker) => {
          return (
            <ProjectsWorkersCard
              worker={worker}
              key={worker.id}
              handleChangeRol={async (e) => {
                if (!setDefaultWorkers || !idProject) return

                const rol = e.target.value
                
                await updateRolWorker(idProject, worker.id, rol as Database["public"]["Enums"]["Rol"])
                setDefaultWorkers(defaultWorkers?.map((w) => ({
                  enfoque: w.enfoque,
                  id: w.id,
                  nombre: w.nombre,
                  rol: w.rol,
                  totalExperience: w.totalExperience
                })))
              }}
              handleDelete={async () => {
                if (!setDefaultWorkers || !idProject) return

                await deleteWorkerProject(worker.id, idProject)
                setDefaultWorkers(defaultWorkers?.filter((w) => w.id !== worker.id))
              }}
            />
          )
        })
      }
      {
        workers?.map((worker) => {
          return (
            <ProjectsWorkersCard
              worker={worker}
              key={worker.id}
              handleChangeRol={handleChangeRol}
              handleDelete={handleDelete}
            />
          )
        })
      }
    </ul>
  )
}