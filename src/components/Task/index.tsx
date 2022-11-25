import { Trash } from 'phosphor-react'

import styles from './Task.module.css'

interface TaskProps {
  content: string
}

export function Task({ content }: TaskProps) {
  return (
    <div className={styles.task}>
      <div>O</div>

      <p>{content}</p>

      <button title="Deletar tarefa">
        <Trash size={24} />
      </button>
    </div>
  )
}
