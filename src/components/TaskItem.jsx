import { useState } from "react";

function TaskItem({ task, onToggleStatus, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  const isDone = task.status === "done";
  const stripColor = isDone ? "bg-emerald-500" : "bg-amber-500";

  const handleSave = async () => {
    if (!title.trim()) return;
    await onUpdate(task.id, { title: title.trim(), description: description.trim() });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description || "");
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(`"${task.title}" silinsin mi?`);
    if (confirmed) onDelete(task.id);
  };

  return (
    <li
      className={`relative flex overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition-opacity duration-300 ${
        isDone ? "opacity-60" : "opacity-100"
      }`}
    >
      <div className={`w-1.5 shrink-0 ${stripColor}`} />

      <div className="flex flex-1 flex-col gap-2 p-4">
        {isEditing ? (
          <>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded border border-stone-300 px-2 py-1 text-base focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              autoFocus
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="rounded border border-stone-300 px-2 py-1 text-sm text-stone-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <div className="flex gap-2 pt-1">
              <button
                onClick={handleSave}
                className="rounded bg-stone-800 px-3 py-1 text-sm text-white hover:bg-stone-700"
              >
                Kaydet
              </button>
              <button
                onClick={handleCancel}
                className="rounded px-3 py-1 text-sm text-stone-500 hover:bg-stone-100"
              >
                Vazgeç
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between gap-2">
              <h3
                className={`text-base font-medium leading-snug text-stone-800 sm:text-lg ${
                  isDone ? "line-through decoration-stone-400" : ""
                }`}
              >
                {task.title}
              </h3>
            </div>

            {task.description && (
              <p className="text-sm text-stone-500">{task.description}</p>
            )}

            <div className="mt-2 flex flex-wrap items-center gap-3 border-t border-dashed border-stone-200 pt-2">
              <label className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-stone-600">
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => onToggleStatus(task.id, isDone ? "todo" : "done")}
                  className="h-3.5 w-3.5 accent-emerald-500"
                />
                {isDone ? "Tamamlandı" : "Tamamlandı olarak işaretle"}
              </label>

              <button
                onClick={() => setIsEditing(true)}
                className="text-xs font-medium text-stone-500 hover:text-stone-800"
              >
                Düzenle
              </button>

              <button
                onClick={handleDelete}
                className="ml-auto text-xs font-medium text-red-400 hover:text-red-600"
              >
                Sil
              </button>
            </div>
          </>
        )}
      </div>
    </li>
  );
}

export default TaskItem;