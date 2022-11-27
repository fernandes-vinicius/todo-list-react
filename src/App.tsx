import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ClipboardText, PlusCircle } from 'phosphor-react'
import { v4 as uuid } from 'uuid'

import logoImg from '@/assets/logo.svg'
import clipboardImg from '@/assets/clipboard.svg'

import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Task } from '@/components/Task'

import styles from './App.module.css'

interface ITask {
  id: string
  content: string
  done?: boolean
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [newTaskInputText, setNewTaskInputText] = useState('')

  const [parent] = useAutoAnimate<HTMLUListElement>()

  const handleAddNewTask = (event: FormEvent) => {
    event.preventDefault()

    const newTask: ITask = {
      id: uuid(),
      done: false,
      content: newTaskInputText,
    }

    setTasks([...tasks, newTask])
    setNewTaskInputText('')
  }

  const handleNewTaskInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.setCustomValidity('')
    setNewTaskInputText(event.target.value)
  }

  const handleNewTaskInputInvalid = (event: InvalidEvent<HTMLInputElement>) => {
    event.target.setCustomValidity('Este campo é obrigatório!')
  }

  const handleDeleteTask = (taskIdToDelete: string) => {
    const tasksWithoutDeleteOne = tasks.filter(
      (task) => task.id !== taskIdToDelete
    )

    setTasks(tasksWithoutDeleteOne)
  }

  const handleCompleteTaskChange = (done: boolean, taskId: string) => {
    let tasksCopyToUpdate = [...tasks]
    const taskIndexToUpdate = tasks.findIndex((task) => task.id === taskId)

    if (taskIndexToUpdate > -1) {
      tasksCopyToUpdate[taskIndexToUpdate].done = done
      setTasks(tasksCopyToUpdate)
    }
  }

  const totalTaskCreated = tasks.length

  const totalTasksDone = tasks.reduce((accumulator, currentTask) => {
    return currentTask.done ? accumulator + 1 : accumulator
  }, 0)

  return (
    <div className={styles.wrapper}>
      {/* Background */}
      <div className={styles.background} />

      <div className={styles.container}>
        {/* Logo */}
        <img src={logoImg} alt="Logotipo do ToDo List App" />

        {/* Form */}
        <form onSubmit={handleAddNewTask}>
          <Input
            required
            autoFocus
            name="task"
            value={newTaskInputText}
            onChange={handleNewTaskInputChange}
            onInvalid={handleNewTaskInputInvalid}
            placeholder="Adicione uma nova tarefa"
          />

          <Button aria-label="Criar uma nova tarefa" type="submit">
            Criar <PlusCircle size={16} weight="bold" />
          </Button>
        </form>

        {/* Content */}
        <main className={styles.tasks}>
          <div className={styles.tasksInfo}>
            <div className={styles.tasksCreated}>
              <h2>Tarefas criadas</h2>
              <span className={styles.taskCounter}>{totalTaskCreated}</span>
            </div>

            <div className={styles.tasksDone}>
              <h2>Tarefas concluídas</h2>
              <span className={styles.taskCounter}>{totalTasksDone}</span>
            </div>
          </div>

          {/* Empty */}
          {totalTaskCreated <= 0 && (
            <div className={styles.tasksEmpty}>
              <img src={clipboardImg} alt="Lista de tarefas vazia" />

              <strong>Você ainda não tem tarefas cadastradas</strong>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          )}

          {/* Task list */}
          {totalTaskCreated > 0 && (
            <ul ref={parent} className={styles.taskList}>
              {tasks.map((task) => (
                <Task
                  key={task.id}
                  content={task.content}
                  done={!!task.done}
                  onDelete={() => handleDeleteTask(task.id)}
                  onCompleteChange={(done) => {
                    handleCompleteTaskChange(done, task.id)
                  }}
                />
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  )
}
