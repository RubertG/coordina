import { CreateForm } from "@/components/workers/create-form"

export default function WorkerCreatePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 lg:px-0">
      <h1 className="text-3xl lg:text-5xl font-extrabold mt-16 text-center">Crear trabajador</h1>
      <CreateForm className="my-12" />
    </main>
  )
}