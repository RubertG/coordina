import { WorkersContainer } from "@/components/workers/workers-container"
import Link from "next/link"

export default function WorkerPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 lg:px-0">
      <h1 className="text-3xl lg:text-5xl font-extrabold mt-16 text-center">Tus trabajadores</h1>
      <section className="flex justify-end mt-8">
        <Link
          className="bg-green-700 rounded-lg px-4 py-2 text-foreground mb-2 lg:hover:bg-green-800 lg:transition-colors w-full text-center md:w-auto"
          href="/trabajadores/crear">
          Crear trabajador
        </Link>
      </section>
      <WorkersContainer className="my-7" />
    </main>
  )
}