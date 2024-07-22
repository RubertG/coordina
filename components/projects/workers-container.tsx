import { Database } from "@/types/db/supabase"
import { WorkerCard } from "../workers/worker-card"

interface Props {
  className?: string
  workers: {
    rol: Database["public"]["Enums"]["Rol"]
    trabajador: Database["public"]["Tables"]["Trabajador"]["Row"] | null
  }[] | null
}

export const WorkersContainer = ({ className, workers }: Props) => {
  return (
    <ul className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 gap-y-4 ${className}`}>
      {
        workers?.map((worker) => {
          if (!worker.rol || !worker.trabajador) return null

          return (
            <WorkerCard
              key={worker.trabajador?.id}
              worker={{
                ...worker.trabajador,
                rol: worker.rol
              }}
              canDelete={false}
            />
          )
        })
      }
    </ul>
  )
}