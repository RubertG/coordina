import { Technologies } from "@/types/worker"
import { Popup } from "../common/popup"
import { useEffect, useState } from "react"
import { Database } from "@/types/db/supabase"
import { getTechnologies } from "@/utils/supabase/get-technologies"
import { Plus, Selector, Trash } from "../common/icons"

interface Props {
  className?: string
  technologies: Technologies[]
  setTechnologies: React.Dispatch<React.SetStateAction<Technologies[]>>
}
export const TechnologiesContainer = ({
  setTechnologies, technologies, className
}: Props) => {
  const [popup, setPopup] = useState(false)
  const [techs, setTechs] = useState<Database["public"]["Tables"]["Tecnologia"]["Row"][]>()
  const [data, setData] = useState<Omit<Technologies, "name">>({
    id: "",
    experience: 0
  })
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchTechnologies = async () => {
      const { technologies: t, error } = await getTechnologies()

      if (error || !t) return setTechs([])

      setTechs(t)
    }

    fetchTechnologies()
  }, [])

  const handlePopup = () => {
    setError("")
    setPopup(!popup)
  }

  const handleCreateTechnology = async () => {
    if (!techs) {
      setError("Error al obtener las tecnologías")
      return
    }

    if (!data.id) {
      setError("Debes seleccionar una tecnología")
      return
    }

    if (!data.experience) {
      setError("Debes colocar la experiencia")
      return
    }

    if (data.experience < 0) {
      setError("La experiencia no puede ser negativa o cero")
      return
    }

    const newTech = techs.find((technology) => technology.id === data.id)

    if (!newTech) {
      setError("Error al guardar la tecnología")
      return
    }

    setTechnologies([
      ...technologies, {
        id: newTech.id,
        name: newTech.nombre,
        experience: data.experience
      }
    ])
    setPopup(false)
    setError("")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleDelete = (id: string) => {
    setTechnologies(technologies.filter((technology) => technology.id !== id))
  }

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
          technologies?.map((technology) => (
            <li key={technology.id}>
              <button
                className="relative flex gap-4 items-center justify-between px-3 py-1.5 rounded-lg lg:hover:bg-gray-900 lg:transition-colors border border-gray-950 lg:hover:border-gray-200 overflow-hidden w-full"
                type="button"
                onClick={() => handleDelete(technology.id)}
              >
                <p className="text-gray-200 font-bold text-lg text-ellipsis overflow-hidden whitespace-nowrap">{technology.name}</p>
                <p className="text-gray-300 text-sm text-ellipsis overflow-hidden whitespace-nowrap">{technology.experience} meses de experiencia</p>
                
                <div className="absolute z-50 w-full h-full left-0 top-0 bg-gray-950/95 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Trash className="text-gray-300" />
                </div>
              </button>
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