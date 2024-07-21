"use client"

import { Form } from "./form"
import { useEditWorker } from "@/hooks/worker/use-edit-worker"

interface Props {
  className?: string
  id: string
}

export const EditForm = ({
  className, id
}: Props) => {
  const {
    defaultTech, defaultValues, error,
    loading, onSubmit, setDefaultTech,
    setTechnologies, technologies
  } = useEditWorker(id)

  return (
    <Form
      onSubmit={onSubmit}
      className={className}
      technologies={technologies}
      setTechnologies={setTechnologies}
      defaultTech={defaultTech}
      setDefaultTech={setDefaultTech}
      idWorker={id}
      loading={loading}
      error={error}
      defaultValues={defaultValues}
    />
  )
}