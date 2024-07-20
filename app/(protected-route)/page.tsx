import { ProjectsContainer } from "@/components/projects/projects-container"

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 lg:px-0">
      <h1 className="text-3xl lg:text-5xl font-extrabold mt-16 text-center">Tus proyectos</h1>
      <ProjectsContainer className="mt-12" />
    </main>
  )
}