import { v4 as uuid } from 'uuid'

import logo from '@/assets/logo.svg'

import { Input } from '@/components/Input'
import { Task } from '@/components/Task'

import styles from './App.module.css'

interface ITask {
  id: string
  content: string
}

const tasks: ITask[] = [
  {
    id: uuid(),
    content: `Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.`,
  },
]

export function App() {
  return (
    <div className={styles.wrapper}>
      {/* Background */}
      <div className={styles.background} />

      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <img src={logo} alt="Logotipo do ToDo List App" />
        </div>

        <form>
          <Input placeholder="Adicione uma nova tarefa" />
          <button type="submit">Criar</button>
        </form>

        <main className={styles.tasks}>
          <div className={styles.tasksInfo}>
            <div className={styles.created}>
              <h2>Tarefas criadas</h2>
              <span className={styles.counter}>0</span>
            </div>

            <div className={styles.done}>
              <h2>Concluídas</h2>
              <span className={styles.counter}>0</span>
            </div>
          </div>

          <div>
            {tasks.map((task) => (
              <Task key={task.id} content={task.content} />
            ))}
          </div>

          {/* <div className={styles.tasksEmpty}>
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div> */}
        </main>
      </div>
    </div>
  )
}
