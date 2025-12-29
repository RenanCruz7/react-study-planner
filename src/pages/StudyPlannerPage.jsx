import { useState } from 'react'
import { useTasks } from '../contexts/TaskContext'
import { useTheme } from '../contexts/ThemeContext'
import { EmptyState, ThemeToggle } from '../components/UI'
import { AddTaskModal, EditTaskModal } from '../components/Modal'
import { TaskSection } from '../components/Task'
import { useSelector } from 'react-redux'
import { selectCompletedTasks, selectPedingTasks, selectTasks } from '../store/slices/taskSlice'

function StudyPlannerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(null)
  const tasks = useSelector(selectTasks) // Get all tasks from Redux store
  const pendingTasks = useSelector(selectPedingTasks) // Get pending tasks from Redux store
  const completedTasks = useSelector(selectCompletedTasks) // Get completed tasks from Redux store
  const {
    addTask,
    toggleTaskComplete,
    editTask,
    deleteTask,
    getPendingTasks,
    getCompletedTasks
  } = useTasks()

  const handleAddTask = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleAddNewTask = (newTask) => {
    addTask(newTask)
  }

  const handleToggleComplete = (taskId) => {
    toggleTaskComplete(taskId)
  }

  const handleEditTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId)
    setTaskToEdit(task)
    setIsEditModalOpen(true)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setTaskToEdit(null)
  }

  const handleSaveEditTask = (taskId, updatedTask) => {
    editTask(taskId, updatedTask)
  }

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId)
  }

  const theme = useTheme()

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: theme.background,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: theme.backgroundColor
      }}
    >
      <div className="w-full max-w-md">
        <div className="bg-purple-header rounded-t-2xl px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-icons text-white text-lg">school</span>
              <h1 className="text-white font-medium text-lg">Plano de Estudos</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
        
        <div className={`${theme.cardBg} rounded-b-2xl p-6`}>
          {tasks.length === 0 ? (
            <EmptyState onAddTask={handleAddTask} />
          ) : (
            <div>
              <TaskSection
                title="Para estudar"
                tasks={pendingTasks}
                borderColor="gray-600"
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />

              <TaskSection
                title="Concluído"
                tasks={completedTasks}
                borderColor="purple-header"
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />

              <div className="flex justify-center mt-8">
                <button
                  onClick={handleAddTask}
                  className="w-12 h-12 bg-purple-header hover:bg-purple-dark transition-colors rounded-full flex items-center justify-center"
                  aria-label="Adicionar tarefa"
                >
                  <span className="material-icons text-white text-xl">add</span>
                </button>
              </div>
            </div>
          )}
        </div>
        
      </div>
      
      <AddTaskModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddTask={handleAddNewTask}
      />
      
      <EditTaskModal 
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onEditTask={handleSaveEditTask}
        task={taskToEdit}
      />
    </div>
  )
}

export default StudyPlannerPage