"use client"

import { BestWorkers, WorkersStateType } from "@/types/project"
import { useEffect, useState } from "react"

interface StateType {
  worker: BestWorkers
  selected: boolean
}

interface Props {
  setBestWorkers: React.Dispatch<React.SetStateAction<BestWorkers[]>>
  workers: WorkersStateType[]
  setWorkers: React.Dispatch<React.SetStateAction<WorkersStateType[]>>
  limit: number
  defaultWorkers?: WorkersStateType[]
  bestWorkers: BestWorkers[]
}

export const useWorkersSelected = ({
  limit, setBestWorkers, setWorkers, workers, defaultWorkers, bestWorkers
}: Props) => {
  const [selecteds, setSelecteds] = useState<StateType[]>([])

  useEffect(() => {
    const newBestWorkers: StateType[] = []
    for (const worker of bestWorkers) {
      if (!workers.some(w => w.id === worker.id) && !defaultWorkers?.some(w => w.id === worker.id)) {
        newBestWorkers.push({
          selected: false,
          worker
        })
      }
    }

    setSelecteds(newBestWorkers)
  }, [bestWorkers])

  const handleSelected = (worker: BestWorkers) => {
    setSelecteds(prevState => prevState.map(state => {
      if (state.worker.id === worker.id) {
        return {
          selected: !state.selected,
          worker
        }
      }
      return state
    }))
  }

  const saveChanges = () => {
    setBestWorkers([])
    setSelecteds([])

    const newWorkers: WorkersStateType[] = []
    for (const { selected, worker } of selecteds) {
      if (limit <= workers.length + (defaultWorkers?.length || 0)) break

      if (limit <= newWorkers.length + (defaultWorkers?.length || 0)) break

      if (selected && !workers.some(w => w.id === worker.id)) {
        newWorkers.push({
          id: worker.id,
          rol: "Integrante",
          enfoque: worker.enfoque,
          nombre: worker.nombre,
          totalExperience: worker.totalExperience
        })
      }
    }

    setWorkers([...workers, ...newWorkers])
  }

  return {
    selecteds,
    handleSelected,
    saveChanges
  }
}