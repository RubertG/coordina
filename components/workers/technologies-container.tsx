"use client"

import { Technologies } from "@/types/worker"
import { Popup } from "../common/popup"
import { Plus, Selector } from "../common/icons"
import { TechnologyCard } from "./technology-card"
import { useTechnologies } from "@/hooks/worker/use-technologies"

interface Props {
  className?: string
  technologies: Technologies[]
  setTechnologies: React.Dispatch<React.SetStateAction<Technologies[]>>
  defaultTech?: Technologies[]
  setDefaultTech?: React.Dispatch<React.SetStateAction<Technologies[]>>
  idWorker?: string
}

export const TechnologiesContainer = ({
  setTechnologies, technologies, className,
  defaultTech, setDefaultTech, idWorker
}: Props) => {
  const {
    error, handleChange, handlePopup,
    handleDelete, handleDeleteDefaultTech, handleCreateTechnology,
    popup, techs
  } = useTechnologies({
    setTechnologies,
    technologies,
    defaultTech,
    setDefaultTech,
    idWorker
  })

  return (
    <section className={`${className}`}>
      <div className="flex items-center justify-between">
        <label
          className="text-white mb-3"
          htmlFor="technologies">
          Tecnologías <span className="text-red-600 font-bold">*</span>
        </label>
        <button
          type="button"
          onClick={handlePopup}
          className="lg:hover:scale-125 lg:transition-transform">
          <Plus className="text-gray-300" />
        </button>
      </div>
      <ul className="flex flex-col gap-2">
        {
          defaultTech?.map((technology) => (
            <li key={technology.id}>
              <TechnologyCard handleDelete={handleDeleteDefaultTech} technology={technology} />
            </li>
          ))
        }
        {
          technologies?.map((technology) => (
            <li key={technology.id}>
              <TechnologyCard handleDelete={handleDelete} technology={technology} />
            </li>
          ))
        }
      </ul>
      {
        popup && (
          <Popup>
            <div
              className="w-5/6 max-w-md px-4 py-5 rounded-lg bg-inherit border border-gray-100 flex flex-col">
              <div className="relative mb-6 bg-inherit">
                <select
                  className="rounded-lg px-4 py-2 bg-inherit border border-gray-100 text-gray-200 appearance-none w-full"
                  name="id"
                  onChange={handleChange}
                  required
                >
                  <option value="" selected disabled>Selecciona la tecnología</option>
                  {
                    techs?.map((technology) => (
                      <option key={technology.id} value={technology.id}>
                        {technology.nombre}
                      </option>
                    ))
                  }
                </select>
                <Selector className="text-gray-300 absolute z-50 right-3 top-1/2 -translate-y-1/2" />
              </div>
              <label
                className="text-white mb-3"
                htmlFor="experience">
                Meses de experiencia <span className="text-red-600 font-bold">*</span>
              </label>
              <input
                type="number"
                className="appearance-none rounded-lg px-4 py-2 bg-inherit border border-gray-100 mb-6 text-gray-200"
                name="experience"
                placeholder="3"
                onChange={handleChange}
                min={1}
                required
              />
              <footer className="flex justify-end gap-5 items-center">
                <button
                  type="button"
                  onClick={handlePopup}
                  className="text-gray-300 lg:hover:text-gray-100 lg:transition-colors">
                  Cancelar
                </button>
                <button
                  type="button"
                  className="bg-green-700 rounded-lg px-4 py-2 text-foreground lg:hover:bg-green-800 lg:transition-colors"
                  onClick={handleCreateTechnology}>
                  Agregar
                </button>
              </footer>
            </div>
            {
              error && (
                <p className="text-red-600 text-center font-medium">
                  {error}
                </p>
              )
            }
          </Popup>
        )
      }
    </section>
  )
}