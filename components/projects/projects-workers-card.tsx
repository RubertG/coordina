import { ChangeEvent } from "react"
import { Trash } from "../common/icons"
import { WorkersStateType } from "@/types/project"
import { ROLS } from "@/const/workers/workers"

interface Props {
  worker: WorkersStateType
  handleDelete: (id: string) => void
  handleChangeRol: (e: ChangeEvent<HTMLSelectElement>, id: string) => void
}

export const ProjectsWorkersCard = ({
  handleChangeRol, handleDelete, worker
}: Props) => {
  return (
    <li
      className="flex gap-2 items-center justify-between px-4 py-2 rounded-lg lg:hover:bg-gray-900 lg:transition-colors border border-gray-950 cursor-pointer w-full overflow-hidden lg:hover:border-gray-200"
      key={worker.id}>
      <h2 
        title={worker.nombre}
        className="text-gray-200 font-bold text-lg text-ellipsis overflow-hidden whitespace-nowrap">
        {worker.nombre}
      </h2>
      <div className="flex items-center justify-center gap-4">
        <select
          className="rounded-lg px-3 py-1 bg-gray-950 cursor-pointer border border-gray-100 text-gray-200 appearance-none text-sm focus:outline-none"
          onChange={(e) => handleChangeRol(e, worker.id)}
          defaultValue={worker.rol}
        >
          {
            ROLS.map((rol) => (
              <option key={rol} value={rol}>
                {rol}
              </option>
            ))
          }
        </select>
        <button
          type="button"
          className="lg:hover:scale-125 lg:transition-transform"
          onClick={() => handleDelete(worker.id)}
        >
          <Trash className="text-gray-300" />
        </button>
      </div>
    </li>
  )
}