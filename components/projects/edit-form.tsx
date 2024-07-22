"use client"

import { Form } from "./form"
import { useEditForm } from "@/hooks/projects/use-edit-form"

export const EditForm = ({
  className,
  id: idProject
}: {
  className?: string,
  id: string
}) => {
  const {
    bestWorkers, limit, getBestW, technologies,
    workers, loadingWorkers, loading, error, handleDelete,
    onSubmit, setTechnologies, setBestWorkers, setWorkers,
    handleChangeLimit, handleChangeRol, project, defaultWorkers,
    defaultTech, setDefaultTech, setDefaultWorkers, defaultLimit
  } = useEditForm(idProject)

  return (
    <Form
      bestWorkers={bestWorkers}
      limit={limit}
      getBestW={getBestW}
      technologies={technologies}
      workers={workers}
      loadingWorkers={loadingWorkers}
      loading={loading}
      error={error}
      onSubmit={onSubmit}
      setTechnologies={setTechnologies}
      setBestWorkers={setBestWorkers}
      setWorkers={setWorkers}
      handleChangeLimit={handleChangeLimit}
      handleChangeRol={handleChangeRol}
      handleDelete={handleDelete}
      className={className}
      defaultValues={{
        id: project?.id || "",
        description: project?.descripcion || "",
        name: project?.nombre || "",
        defaultWorkers,
        technologies: defaultTech,
        setDefaultTech,
        setDefaultWorkers,
        defaultLimit: defaultLimit
      }}
    />
  )
}