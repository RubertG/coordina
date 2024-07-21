import { WorkersContainer } from "@/components/workers/workers-container"

export default function WorkerPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 lg:px-0">
      <h1 className="text-3xl lg:text-5xl font-extrabold mt-16 text-center">Tus trabajadores</h1>
      <WorkersContainer className="mt-12" />
    </main>
  )
}