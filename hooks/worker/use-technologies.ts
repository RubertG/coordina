"use client"

import { Database } from "@/types/db/supabase"
import { Technologies } from "@/types/worker"
import { getTechnologies } from "@/utils/supabase/get-technologies"
import { deleteTechnologyWorker } from "@/utils/supabase/delete-tecnology-worker"
import { useEffect, useState } from "react"

interface Props {
  technologies: Technologies[]
  setTechnologies: React.Dispatch<React.SetStateAction<Technologies[]>>
  defaultTech?: Technologies[]
  setDefaultTech?: React.Dispatch<React.SetStateAction<Technologies[]>>
  idWorker?: string
}

export const useTechnologies = ({
  setTechnologies, technologies, defaultTech, idWorker, setDefaultTech
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

  const handleDeleteDefaultTech = async (id: string) => {
    if (!defaultTech || !setDefaultTech || !idWorker) return

    setDefaultTech(defaultTech?.filter((technology) => technology.id !== id))
    await deleteTechnologyWorker(id, idWorker)
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