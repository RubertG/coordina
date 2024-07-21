export default function WorkerEditPage({
  params: { id }
}: {
  params: { id: string }
}) {
  return (
    <main className="mx-auto max-w-5xl px-4 lg:px-0">
      <h1 className="text-3xl lg:text-5xl font-extrabold mt-16 text-center">Editar trabajador {id}</h1>
    </main>
  )
}