"use client"

import { Database } from "@/types/db/supabase"
import Link from "next/link"
import { Edit, Trash } from "../common/icons"

interface Props {
  worker: Database["public"]["Tables"]["Trabajador"]["Row"]
}

export const WorkerCard = ({
  worker
} : Props) => {
  return (
    <li
      className="flex gap-2 items-center justify-between px-5 py-3 rounded-lg lg:hover:bg-gray-900 lg:transition-colors"
      key={worker.id}>
      <div>
        <h2 className="text-gray-200 font-bold text-lg text-ellipsis overflow-hidden whitespace-nowrap">{worker.nombre}</h2>
        <p className="text-gray-300 text-sm text-ellipsis overflow-hidden whitespace-nowrap">{worker.enfoque}</p>
      </div>
      <div className="flex flex-col gap-2">
        <Link href={`/trabajadores/editar/${worker.id}`}>
          <Edit className="text-gray-200 w-5 h-5 lg:hover:scale-125 lg:transition-transform" />
        </Link>
        <button className="lg:hover:scale-125 lg:transition-transform">
          <Trash className="text-gray-400 w-5 h-5" />
        </button>
      </div>
    </li>
  )
}