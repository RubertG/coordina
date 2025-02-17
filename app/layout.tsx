import { defaultUrl } from "@/const/common/const"
import "./globals.css"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"]
})

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Coordina - Maneja los integrantes de tu equipo",
  description: "Aplicación para la gestión de asignación de equipos a proyectos que puede crear el usuario."
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={poppins.className}>
      <body className="bg-gray-950 text-white">
        {children}
      </body>
    </html>
  )
}
