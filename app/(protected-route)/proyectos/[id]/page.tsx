import { WorkersContainer } from "@/components/projects/workers-container"
import { getProject } from "@/utils/supabase/get-project"
import Link from "next/link"

export default async function ProjectPage({
  params: { id }
}: {
  params: { id: string }
}) {
  const { error, project } = await getProject(id)

  if (error || !project) {
    return (
      <main className="mx-auto max-w-5xl px-4 lg:px-0">
        <p className="text-xl lg:text-2xl font-bold mt-28 text-center">Proyecto no encontrado :(</p>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-4 lg:px-0">
      <h1 className="text-3xl lg:text-5xl font-extrabold mt-16 text-center">
        {project.nombre}
      </h1>
      <h2 className="text-xl lg:text-2xl font-bold mt-10">Descripción</h2>
      <p className="text-gray-200 mt-2">{project.descripcion}</p>

      <h2 className="text-xl lg:text-2xl font-bold mt-7">Tecnologías</h2>
      <ul className="flex flex-wrap gap-1 mt-3">
        {
          project.tecnologias.map(({ tecnologia: technology }) => (
            <li
              className="px-3 py-1.5 rounded-lg lg:hover:bg-gray-900 lg:transition-colors border border-gray-950 lg:hover:border-gray-200 overflow-hidden max-w-56"
              key={technology?.id}>
              <p className="text-gray-200 text-ellipsis overflow-hidden whitespace-nowrap">
                {technology?.nombre}
              </p>
            </li>
          ))
        }
      </ul>

      <h2 className="text-xl lg:text-2xl font-bold mt-7">Integrantes</h2>
      <WorkersContainer className="mt-3" workers={project.trabajadores} />

      <footer className="flex justify-end gap-5 items-center mt-7 mb-12">
        <Link
          href="/"
          className="text-gray-300 lg:hover:text-gray-100 lg:transition-colors">
          Volver
        </Link>
        <Link
          href={`/proyectos/${id}/editar`}
          className="bg-green-700 rounded-lg px-4 py-2 text-foreground lg:hover:bg-green-800 lg:transition-colors">
          Editar proyecto
        </Link>
      </footer>
    </main>
  )
}