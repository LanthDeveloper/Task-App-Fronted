import { create } from "zustand";
import { persist } from "zustand/middleware";
import HelpHttp from "../../shared/helpers/HelpHttp";
import { vServer } from "../../shared/vars/vServer";

const BACKEND_HOST = vServer.VITE_BACKEND_HOST;
const API = HelpHttp();

export const useTaskStore = create(
  persist(
    (set, get) => ({
      task: { id: null, title: "", description: "", status: "pending" },
      tasks: [],
      taskToEdit: null,

      setTaskToEdit: (data) => set(() => ({ taskToEdit: data })),

      getTasksByStatus: (statusCode) => {
        return get().tasks.filter((task) => task.status === statusCode);
      },

      createTask: async ({ data, token }) => {
        try {
          const response = await API.post(`${BACKEND_HOST}/api/tasks`, {
            body: data,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.success) {
            set((state) => ({
              tasks: [...state.tasks, response.task],
            }));
            return response.task;
          }

          throw new Error("No se pudo crear la tarea");
        } catch (err) {
          console.error("Error al crear la tarea:", err);
          throw err;
        }
      },

      getTasks: async (token) => {
        if (token) {
          try {
            const response = await API.get(`${BACKEND_HOST}/api/tasks`, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });

            if (response.success) {
              set(() => ({ tasks: response.tasks }));
            }

            throw new Error("No se pudieron obtener las tareas");
          } catch (err) {
            return;
          }
        }
      },

      editTask: async ({ data, token }) => {
        try {
          const response = await API.put(`${BACKEND_HOST}/api/tasks/${data.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.success) {
            set({
              tasks: get().tasks.map((task) =>
                task.id === data.id ? { ...task, ...data } : task
              ),
            });
          }
        } catch (err) {
          console.error(err);
        }
      },

      deleteTask: async ({ id, token }) => {
        try {
          const response = await API.del(`${BACKEND_HOST}/api/tasks/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.success) {
            set(() => ({
              tasks: get().tasks.filter((task) => task.id !== id),
            }));
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),
    {
      name: "task-store",
    }
  )
);

export default useTaskStore;
