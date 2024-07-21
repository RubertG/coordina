"use client"

import { Form } from "./form"
import { useCreateWorker } from "@/hooks/worker/use-create-worker"

export const CreateForm = ({
  className
}: {
  className?: string
}) => {
  const { error, loading, onSubmit, setTechnologies, technologies } = useCreateWorker()

  return (
    <Form
      onSubmit={onSubmit}
      error={error}
      loading={loading}
      className={className}
      technologies={technologies}
      setTechnologies={setTechnologies}
    />
  )
}