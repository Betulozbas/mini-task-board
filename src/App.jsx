import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useTasks } from "./hooks/useTasks";

function App() {
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTaskById,
    deleteTaskById,
    toggleTaskStatus,
  } = useTasks();

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 text-2xl font-bold text-stone-800 sm:mb-8 sm:text-3xl">
          Mini Task Board 🚀
        </h1>

        <div className="mb-6">
          <TaskForm onAdd={createTask} />
        </div>

        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onToggleStatus={toggleTaskStatus}
          onUpdate={updateTaskById}
          onDelete={deleteTaskById}
        />
      </div>
    </div>
  );
}

export default App;