"use client"

import { Database } from "@/types/db/supabase"
import Link from "next/link"
import { Edit, Trash } from "../common/icons"
import { deleteWorker } from "@/utils/supabase/delete-worker"
import { useRouter } from "next/navigation"
import { useState } from "react"
import clsx from "clsx"

type Data = Database["public"]["Tables"]["Trabajador"]["Row"]

interface Worker extends Data {
  rol?: Database["public"]["Enums"]["Rol"]
}

interface Props {
  worker: Worker
  canDelete?: boolean
}

export const WorkerCard = ({
  worker, canDelete = true
}: Props) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async (id: string) => {
    setLoading(true)
    await deleteWorker(id)
    router.refresh()
    setLoading(false)
  }

  return (
    <li
      className="flex gap-2 items-center justify-between px-5 py-3 rounded-lg lg:hover:bg-gray-900 lg:transition-colors relative"
      key={worker.id}>
      <div className={clsx("absolute top-0 left-0 w-full h-full flex items-center justify-center entry bg-gray-950/95 border border-gray-300 rounded-lg", {
        "hidden": !loading
      })}>
        <p className="text-gray-300">Eliminando...</p>
      </div>
      <div className="overflow-hidden">
        <h2 className="text-gray-200 font-bold text-lg text-ellipsis overflow-hidden whitespace-nowrap">
          {worker.nombre}
        </h2>
        <p className="text-gray-300 text-sm text-ellipsis overflow-hidden whitespace-nowrap">
          {worker.enfoque} {worker.rol && (
            <span>- <span className="text-green-400">{worker.rol}</span></span>
          )}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Link href={`/trabajadores/editar/${worker.id}`}>
          <Edit className="text-gray-200 w-5 h-5 lg:hover:scale-125 lg:transition-transform" />
        </Link>
        {
          canDelete && (
            <button
              onClick={() => handleDelete(worker.id)}
              className="lg:hover:scale-125 lg:transition-transform">
              <Trash className="text-gray-400 w-5 h-5" />
            </button>
          )
        }
      </div>
    </li>
  )
}