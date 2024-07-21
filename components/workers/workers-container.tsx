import { getWorkers } from "@/utils/supabase/get-workers"
import { WorkerCard } from "./worker-card"

interface Props {
  className?: string
}

export const WorkersContainer = async ({ className }: Props) => {
  const { error, workers } = await getWorkers()

  return (
    <>
      {
        error && (
          <section className={className}>
            <p className="text-gray-200">{error}</p>
          </section>
        )
      }
      <ul className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 gap-y-4 ${className}`}>
        {
          workers?.map((worker) => {
            return (
              <WorkerCard key={worker.id} worker={worker} />
            )
          })
        }
      </ul>
    </>
  )
}