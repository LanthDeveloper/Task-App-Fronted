import React, { useState, useEffect } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { supabaseClient } from "../../../supabase/supabaseConfig";
import { useAuthStore } from "../../auth/store/useAuthStore";
import useTaskStore from "../store/useTaskStore";

const TaskForm = () => {
  const { tasks, getTasks, deleteTask, editTask, createTask } = useTaskStore();
  const initTask = { id: null, title: "", description: "", status: "pending" };
  const [task, setTask] = useState(initTask);
  const { userData, session } = useAuthStore();
  const [disabledBtn, setDisabledBtn] = useState(false);

  const cleanForm = () => {
    setTask(initTask);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.title.trim() || !task.description.trim()) return;
    createNewTask({
      user_id: userData.id,
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const createNewTask = async (data) => {
    try {
      setDisabledBtn(true);
      const result = await createTask({data, token: session.access_token})
      setTask(result.data);
    } catch (err) {
      console.log(err);
    } finally {
      cleanForm();
      getTasks(session.access_token);
      setDisabledBtn(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          name="title"
          value={task.title}
          onChange={handleChange}
          variant="underlined"
          label="Titulo"
          placeholder="Registrar titulo de tarea"
          type="text"
          isRequired
          maxLength={50}
          minLength={5}
        />

        <Textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          minRows={1}
          isRequired
          variant="underlined"
          radius="none"
          label="Descripción"
          placeholder="Registra el detalle de la tarea"
          maxLength={300}
          minLength={5}
        />

        <Button
          isDisabled={disabledBtn}
          type="submit"
          radius="none"
          className="bg-black text-white animate__animated animate__fadeInUp overflow-hidden"
        >
          + Agregar
        </Button>
      </form>
    </>
  );
};

export default TaskForm;
