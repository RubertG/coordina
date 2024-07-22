import { ProjectsContainer } from "@/components/projects/projects-container"
import Link from "next/link"

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 lg:px-0">
      <h1 className="text-3xl lg:text-5xl font-extrabold mt-16 text-center">Tus proyectos</h1>
      <section className="flex justify-end mt-8 max-w-3xl mx-auto">
        <Link
          className="bg-green-700 rounded-lg px-4 py-2 text-foreground mb-2 lg:hover:bg-green-800 lg:transition-colors w-full text-center md:w-auto"
          href="/proyectos/crear">
          Crear proyecto
        </Link>
      </section>
      <ProjectsContainer className="mt-5 mb-12 max-w-3xl" />
    </main>
  )
}