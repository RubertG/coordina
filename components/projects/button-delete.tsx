"use client"

import { deleteProject } from "@/utils/supabase/delete-project"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const ButtonDelete = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  return (
    <button
      className="text-gray-300 lg:hover:text-gray-100 lg:transition-colors"
      onClick={async () => {
        setLoading(true)
        await deleteProject(id)
        setLoading(false)
        router.push("/")
      }}
    >
      { loading ? "Eliminando..." : "Eliminar" }
    </button>
  )
}