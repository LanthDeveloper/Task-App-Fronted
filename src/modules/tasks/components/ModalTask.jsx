import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import useTaskStore from "../store/useTaskStore";
import LoaderView from "../../shared/components/LoaderView";
import { useAuthStore } from "../../auth/store/useAuthStore";

const ModalTask = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { tasks, getTasks, deleteTask, editTask, setTaskToEdit, taskToEdit } =
    useTaskStore();
  const {session } = useAuthStore()

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  useEffect(() => {
    if (taskToEdit) {
      setForm({
        title: taskToEdit.title || "",
        description: taskToEdit.description || "",
        status: taskToEdit.status || "pending",
      });
    }
  }, [taskToEdit]);

  const handleTitleChange = (value) => {
    setForm((prev) => ({
      ...prev,
      title: value,
    }));
  };

  const handleDescriptionChange = (value) => {
    setForm((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const handleStatusChange = (value) => {
    setForm((prev) => ({
      ...prev,
      status: value.currentKey,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskToEdit) {
      console.error("No task selected for editing");
      return;
    }

    const data = {
      id: taskToEdit.id,
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
    };

    if (!data.title || !data.description) {
      console.error("Title and description are required");
      return;
    }

    editTask({ data, token: session.access_token });
    closeModal();
  };

  const closeModal = () => {
    onClose();
    setTaskToEdit(null);
    setForm({
      title: "",
      description: "",
      status: "pending",
    });
  };

  const statusTask = [
    { key: "pending", label: "Pendiente" },
    { key: "in_process", label: "En progreso" },
    { key: "completed", label: "Completado" },
  ];

  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
        radius="none"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editar Tarea
              </ModalHeader>
              <>
                <ModalBody>
                  <form
                    id="formEditTask"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                  >
                    <Input
                      variant="underlined"
                      label="Titulo"
                      placeholder="Registrar titulo de tarea"
                      type="text"
                      value={form.title}
                      onValueChange={handleTitleChange}
                      isRequired
                      maxLength={50}
                      minLength={3}
                      description={`${form.title.length}/100 caracteres`}
                    />

                    <Textarea
                      minRows={1}
                      isRequired
                      variant="underlined"
                      radius="none"
                      label="Descripción"
                      placeholder="Registra el detalle de la tarea"
                      value={form.description}
                      onValueChange={handleDescriptionChange}
                      maxLength={300}
                      minLength={3}
                      description={`${form.description.length}/300 caracteres`}
                    />

                    <Select
                      isRequired
                      className="w-full"
                      selectedKeys={[form.status]}
                      variant="underlined"
                      label="Estado"
                      placeholder="Seleccionar estado"
                      onSelectionChange={handleStatusChange}
                    >
                      {statusTask.map((status) => (
                        <SelectItem key={status.key} value={status.key}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button
                    radius="none"
                    color="danger"
                    variant="flat"
                    onPress={closeModal}
                  >
                    Cancelar
                  </Button>

                  <Button
                    form="formEditTask"
                    type="submit"
                    radius="none"
                    isDisabled={!form.title.trim() || form.title.length < 3 || !form.description.trim() || form.description.length < 10}
                  >
                    Guardar
                  </Button>
                </ModalFooter>
              </>
            </>
          )}
        </ModalContent>
      </Modal>

      <Button
        color="primary"
        onPress={onOpen}
        className="d-none"
        id="btnModalTask"
      >
        Abrir Modal
      </Button>
    </>
  );
};

export default ModalTask;