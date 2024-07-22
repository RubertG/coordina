"use client"

import { Technologies } from "@/types/project"
import { Trash } from "../common/icons"

interface Props {
  technology: Technologies
  handleDelete: (id: string) => void
}

export const TechnologyCard = ({ technology, handleDelete }: Props) => {
  return (
    <button
      className="relative px-3 py-1.5 rounded-lg lg:hover:bg-gray-900 lg:transition-colors border border-gray-950 lg:hover:border-gray-200 overflow-hidden w-full text-center"
      type="button"
      onClick={() => handleDelete(technology.id)}
    >
      <p className="text-gray-200 text-ellipsis overflow-hidden whitespace-nowrap">{technology.nombre}</p>
      <div className="absolute z-50 w-full h-full left-0 top-0 bg-gray-950/95 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
        <Trash className="text-gray-300" />
      </div>
    </button>
  )
}