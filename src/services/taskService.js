console.log("taskService yüklendi");

import { collection, getDocs, onSnapshot } from "firebase/firestore";

import { db } from "../firebase/config";

export const subscribeToTasks = (callback, errorCallback) => {
  const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(tasks);
  }, (error) => {
    errorCallback(error);
  });

  return unsubscribe;
};

export const getTasks = async () => {
  const querySnapshot = await getDocs(collection(db, "tasks"));

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const addTask = async (task) => {
  const docRef = await addDoc(collection(db, "tasks"), task);
  
  return { id: docRef.id, ...task };
}

export const updateTask = async (taskId, updatedTask) => {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, updatedTask);
}

export const deleteTask = async (taskId) => {
  const taskRef = doc(db, "tasks", taskId);
  await deleteDoc(taskRef);
}

export const updateTaskStatus = async (taskId, newStatus) => {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, { status: newStatus });
}
