"use client"

import { Form } from "./form"
import { useCreateForm } from "@/hooks/projects/use-create-form"

export const CreateForm = ({
  className
}: {
  className?: string
}) => {
  const {
    bestWorkers, limit, getBestW,
    technologies, workers, loadingWorkers,
    loading, error, onSubmit,
    setTechnologies, setBestWorkers, setWorkers,
    handleChangeLimit, handleChangeRol, handleDelete
  } = useCreateForm()

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
    />
  )
}