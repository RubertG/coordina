"use client"

import { Database } from "@/types/db/supabase"
import { getTechnologies } from "@/utils/supabase/get-technologies"
import { useEffect, useState } from "react"
import { Technologies } from "@/types/project"
import { deleteTechnologyProject } from "@/utils/supabase/delete-technology-project"

interface Props {
  technologies: Technologies[]
  setTechnologies: React.Dispatch<React.SetStateAction<Technologies[]>>
  defaultTech?: Technologies[]
  setDefaultTech?: React.Dispatch<React.SetStateAction<Technologies[]>>
  idProject?: string
}

export const useTechnologies = ({
  setTechnologies, technologies, defaultTech, idProject, setDefaultTech
}: Props) => {
  const [popup, setPopup] = useState(false)
  const [techs, setTechs] = useState<Database["public"]["Tables"]["Tecnologia"]["Row"][]>()
  const [data, setData] = useState<Omit<Technologies, "nombre">>({
    id: ""
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

    const newTech = techs.find((technology) => technology.id === data.id)

    if (!newTech) {
      setError("Error al guardar la tecnología")
      return
    }

    if (technologies.some((t) => t.id === newTech.id)) {
      setError("La tecnología ya existe")
    }

    setTechnologies([
      ...technologies, {
        id: newTech.id,
        nombre: newTech.nombre
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

  const handleDeleteDefaultTech = async (id: string) => {
    if (!defaultTech || !setDefaultTech || !idProject) return

    
    setDefaultTech(defaultTech?.filter((technology) => technology.id !== id))
    await deleteTechnologyProject(idProject, id)
    console.log("object")
  }

  const handleDelete = (id: string) => {
    setTechnologies(technologies.filter((technology) => technology.id !== id))
  }

  return {
    handleChange,
    handlePopup,
    handleCreateTechnology,
    handleDelete,
    handleDeleteDefaultTech,
    popup,
    techs,
    error
  }
}