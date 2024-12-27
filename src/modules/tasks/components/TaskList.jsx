import { Card } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { EditIcon, TrashIcon } from "../../shared/components/Icons";
import useTaskStore from "../store/useTaskStore";
import "./TaskList.css";
import { useAuthStore } from "../../auth/store/useAuthStore";

const TabTaskList = ({ tasks }) => {
  const { deleteTask, editTask, setTaskToEdit } = useTaskStore();
  const { session } = useAuthStore();

  if (tasks.length === 0) {
    return <p className="text-gray-500 text-center py-4">No hay tareas</p>;
  }

  const openModal = () => {
    const $_btnModal = document.getElementById("btnModalTask");
    $_btnModal.click();
  };

  const statusText = (status) => {
    const statusCode = {
      pending: "Pendiente",
      in_process: "En progreso",
      completed: "Completado",
    };

    return statusCode[status];
  };

  const statusBg = (status) => {
    const statusCode = {
      pending: "bg-b91c1c",
      in_process: "bg-facc15",
      completed: "bg-4ade80",
    };

    return statusCode[status];
  };

  const statusColor = (status) => {
    const statusCode = {
      pending: "color-white",
      in_process: "color-black",
      completed: "color-white",
    };

    return statusCode[status];
  };

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <Card key={task.id} className="p-4 border" radius="none">
          <div className="flex justify-between w-full max-sm:flex-col max-sm:gap-3">
            <span className="w-full max-w-[500px]">
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-gray-600 text-xs break-words whitespace-normal overflow-wrap-normal">
                {task.description}
              </p>
            </span>
            <p
              className={`text-[10px] w-fit h-fit px-4 py-1 rounded-2xl ${statusBg(
                task.status
              )} ${statusColor(task.status)}`}
            >
              {statusText(task.status)}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex gap-3">
              <button
                onClick={() => {
                  openModal();
                  setTaskToEdit(task);
                }}
              >
                <EditIcon className="w-4" />
              </button>
              <button
                onClick={() =>
                  deleteTask({ id: task.id, token: session.access_token })
                }
              >
                <TrashIcon className="w-4" />
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TabTaskList;
