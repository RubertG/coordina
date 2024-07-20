import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex flex-col gap-2 items-center justify-center -my-5 h-dvh">
      <h1 className="text-3xl font-bold">No se encontró la página</h1>
      <h2 className="text-4xl font-bold text-red-800">404</h2>
      <Link href="/" className="lg:hover:underline text-gray-200 mt-3">Volver a la página de inicio</Link>
    </main>
  )
}