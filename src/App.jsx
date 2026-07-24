import { useEffect, useState } from "react";

import { getTasks } from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Mini Task Board 🚀
        </h1>

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-white p-4 rounded-lg shadow"
            >
              <span>{task.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;