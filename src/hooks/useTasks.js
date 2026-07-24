import {
  addTask,
  deleteTask,
  subscribeToTasks,
  updateTask,
  updateTaskStatus,
} from "../services/taskService";
import { useCallback, useState } from "react";

export function useTasks() {
  const [tasks, setTasks] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const unsubscribe = subscribeToTasks(
    (newTasks) => {
      setTasks(newTasks);
      setLoading(false);
    },
    (error) => {
      setError(error);
      setLoading(false);
    },
  );

  const createTask = useCallback(async (task) => {
    try {
      setLoading(true);
      await addTask(task);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTaskById = useCallback(async (taskId, updatedTask) => {
    try {
      setLoading(true);
      await updateTask(taskId, updatedTask);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTaskById = useCallback(async (taskId) => {
    try {
      setLoading(true);
      await deleteTask(taskId);
    } catch (error) {
      setError(error.message || "Görev silinirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleTaskStatus = useCallback(async (taskId, newStatus) => {
    try {
      setLoading(true);
      await updateTaskStatus(taskId, newStatus);
    } catch (error) {
      setError(error.message || "Görev durumu güncellenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    tasks,
    setTasks,
    error,
    setError,
    loading,
    setLoading,
    createTask,
    updateTaskById,
    deleteTaskById,
    toggleTaskStatus,
    unsubscribe,
  };
};
