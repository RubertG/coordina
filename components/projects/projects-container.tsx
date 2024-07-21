import { getProjects} from "@/utils/supabase/get-projects"
import Link from "next/link"
import { ExternalLinkIcon } from "../common/icons"
import { getBestWorkers } from "@/utils/supabase/best-workers"
import { getProject } from "@/utils/supabase/get-project"

export const ProjectsContainer = async ({ className }: { className?: string }) => {
  const { error, projects } = await getProjects()

  if (!projects || error) return (
    <section className={`flex flex-col gap-5 ${className}`}>
      <p className="text-gray-200 text-center">Error al obtener los proyectos :(</p>
    </section>
  )

  const {project} = await getProject(projects[0].id)
  if (project?.tecnologias) {
    const bestWorkers = await getBestWorkers(project.tecnologias, projects[0].id)
    console.log(bestWorkers)
  }

  return (
    <section className={`flex flex-col gap-1 mx-auto max-w-3xl ${className}`}>
      {
        projects.map((project) => (
          <Link 
            key={project.id}
            href={`/proyectos/${project.id}`}
            className="flex gap-2 items-center justify-between px-5 py-3 rounded-lg lg:hover:bg-gray-900 lg:transition-colors"
          >
            <h2 className="text-gray-200 font-bold text-lg text-ellipsis overflow-hidden whitespace-nowrap">{project.nombre}</h2>
            <ExternalLinkIcon className="text-gray-200 w-5 h-5" />
          </Link>
        ))
      }
    </section>
  )
}