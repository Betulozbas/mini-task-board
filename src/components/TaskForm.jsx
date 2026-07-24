import { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isValid = title.trim().length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid || submitting) return;

    setSubmitting(true);
    try {
      await onAdd({ title: title.trim(), description: description.trim() });
      setTitle("");
      setDescription("");
      setTouched(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-dashed border-stone-300 bg-white p-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Görev başlığı *"
            className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 sm:text-base ${
              touched && !isValid
                ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                : "border-stone-300 focus:border-amber-500 focus:ring-amber-500"
            }`}
          />
          {touched && !isValid && (
            <p className="mt-1 text-xs text-red-500">Başlık zorunlu.</p>
          )}
        </div>

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Açıklama (isteğe bağlı)"
          className="flex-1 rounded border border-stone-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full shrink-0 rounded bg-stone-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitting ? "Ekleniyor..." : "+ Görev Ekle"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;