import { EditForm } from "@/components/projects/edit-form"

export const revalidate = 0
export const dynamic = "force-dynamic"

export default function ProjectCreatePage({
  params: { id }
}: {
  params: { id: string }
}) {
  return (
    <main className="mx-auto max-w-5xl px-4 lg:px-0">
      <h1 className="text-3xl lg:text-5xl font-extrabold mt-16 text-center">Editar proyecto</h1>
      <EditForm className="my-12" id={id} />
    </main>
  )
}