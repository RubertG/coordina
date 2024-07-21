import Link from "next/link"
import { SubmitButton } from "../../components/common/submit-button"
import { signIn, signUp } from "@/server-actions/auth"

export default function Login({
  searchParams
}: {
  searchParams: { mensaje: string };
}) {
  return (
    <div className="h-dvh flex items-center justify-center w-full px-4 md:px-0 max-w-md gap-2 mx-auto">
      <Link
        href="/"
        className="absolute text-gray-200 left-8 top-8 py-2 px-4 rounded-lg no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center text-sm group lg:hover:text-white lg:transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-1 h-4 w-4 group-hover:stroke-white lg:transition-colors"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Atrás
      </Link>

      <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <label className="text-white" htmlFor="email">
          Correo
        </label>
        <input
          type="email"
          className="rounded-lg px-4 py-2 bg-inherit border border-gray-100 mb-6 text-gray-200"
          name="email"
          placeholder="tunombre@ejemplo.com"
          required
        />
        <label className="text-white" htmlFor="password">
          Contraseña
        </label>
        <input
          className="rounded-lg px-4 py-2 bg-inherit border border-gray-100 mb-6 text-gray-200"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          formAction={signIn}
          className="bg-green-700 rounded-lg px-4 py-2 text-foreground mb-2 lg:hover:bg-green-800 lg:transition-colors"
          pendingText="Iniciando sesión..."
        >
          Iniciar sesión
        </SubmitButton>
        <SubmitButton
          formAction={signUp}
          className="border border-gray-100 text-gray-100 rounded-lg px-4 py-2 text-foreground lg:hover:bg-gray-100 lg:hover:text-gray-950 lg:transition-colors"
          pendingText="Creando cuenta..."
        >
          Crear cuenta
        </SubmitButton>
        {searchParams?.mensaje && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center text-gray-200">
            {searchParams.mensaje}
          </p>
        )}
      </form>
    </div>
  )
}
