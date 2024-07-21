'use client'

import { signOut } from "@/utils/supabase/sign-out"
import clsx from "clsx"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

export function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav
      className="bg-gray-950 lg:backdrop-blur-sm px-4 py-2.5 fixed w-full top-0 left-0 z-30"
    >
      <nav
        className="flex items-center justify-between max-w-7xl mx-auto">
        <Link
          href="/"
        >
          <h1
            className="text-xl lg:text-2xl font-bold lg:hover:text-green-500 lg:transition-colors">
            Coordina
          </h1>
        </Link>
        <ul
          className={clsx("text-gray-200 text-center entry bg-gray-950 lg:bg-inherit absolute w-full top-14 left-0 lg:static lg:w-auto lg:flex lg:items-center lg:justify-center gap-1", {
            "hidden": !open
          })}
          onClick={() => setOpen(false)}
        >
          <li>
            <Link
              href="/"
              className={clsx("block py-2 px-3 lg:py-1 w-full border-y border-gray-900 lg:border-gray-950 lg:border-x lg:hover:border-gray-200 lg:rounded-lg lg:transition-all", {
                "text-green-400 lg:hover:border-green-400": pathname === "/"
              })}>
              Proyectos
            </Link>
          </li>
          <li>
            <Link
              href="/trabajadores"
              className={clsx("block py-2 px-3 lg:py-1 w-full border-b border-gray-900 lg:border-gray-950 lg:border-x lg:border-t lg:hover:border-gray-200 lg:rounded-lg lg:transition-all", {
                "text-green-400 lg:hover:border-green-400": pathname === "/trabajadores"
              })}>
              Trabajadores
            </Link>
          </li>
          <li>
            <button
              onClick={async () => {
                await signOut()
                router.refresh()
              }}
              className="block py-2 px-3 lg:py-1 w-full border-b border-gray-900 lg:border-gray-950 lg:border-x lg:border-t lg:hover:border-gray-200 lg:rounded-lg lg:transition-all">
              Cerrar sesión
            </button>
          </li>
        </ul>
        <button
          className="flex justify-between items-center gap-[3px] flex-col lg:hidden"
          onClick={() => setOpen(!open)}
        >
          <span className={clsx("h-[2px] w-5 bg-gray-200 rounded-lg transition-transform", {
            "translate-y-[5px] -rotate-45": open
          })}></span>
          <span className={clsx("h-[2px] w-5 bg-gray-200 rounded-lg transition-transform", {
            "opacity-0": open
          })}></span>
          <span className={clsx("h-[2px] w-5 bg-gray-200 rounded-lg transition-transform", {
            "-translate-y-[5px] rotate-45": open
          })}></span>
        </button>
      </nav>
    </nav>
  )
}
