import { Trash } from 'phosphor-react'
import clsx from 'clsx'

import { Checkbox } from '@/components/Checkbox'

import styles from './Task.module.css'

interface TaskProps {
  done?: boolean
  content: string
  onDelete: VoidFunction
  onCompleteChange: (done: boolean) => void
}

export function Task({ done, content, onDelete, onCompleteChange }: TaskProps) {
  return (
    <div className={clsx(styles.task, [done && styles.taskDone])}>
      <Checkbox checked={done} onChange={onCompleteChange} />

      <p>{content}</p>

      <button
        aria-label="Deletar tarefa"
        title="Deletar tarefa"
        onClick={onDelete}
      >
        <Trash size={24} />
      </button>
    </div>
  )
}
