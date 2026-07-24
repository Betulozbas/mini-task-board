import TaskItem from "./TaskItem";

function TaskList({ tasks, loading, error, onToggleStatus, onUpdate, onDelete }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-stone-400">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-stone-300 border-t-stone-600" />
        <p className="font-mono text-xs uppercase tracking-wide">
          Görevler yükleniyor
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-center">
        <p className="text-lg text-red-500">Bir şeyler ters gitti</p>
        <p className="text-sm text-stone-500">{error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center gap-1 py-16 text-center text-stone-400">
        <p className="text-lg text-stone-500">Henüz görev yok</p>
        <p className="text-sm">Yukarıdan ilk görevini ekleyerek başla.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;