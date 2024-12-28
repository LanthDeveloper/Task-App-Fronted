import React, { useState, useEffect } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import useTaskStore from "../store/useTaskStore";
import TabTaskList from "../components/TaskList";
import "animate.css";
import ModalTask from "../components/ModalTask";
import TaskForm from "../components/TaskForm";
import { useAuthStore } from "../../auth/store/useAuthStore";

const Dashboard = () => {
  const { session } = useAuthStore();
  const { getTasksByStatus, getTasks } = useTaskStore();
  const pendingTasks = getTasksByStatus("pending");
  const inProgressTasks = getTasksByStatus("in_process");
  const completedTasks = getTasksByStatus("completed");

  useEffect(() => {
    if (session) {
      getTasks(session.access_token);
    }
  }, [session]);

  let tabs = [
    {
      id: "pending",
      label: "Pendientes",
      content: <TabTaskList tasks={pendingTasks} />,
    },
    {
      id: "in_process",
      label: "En progreso",
      content: <TabTaskList tasks={inProgressTasks} />,
    },
    {
      id: "completed",
      label: "Completados",
      content: <TabTaskList tasks={completedTasks} />,
    },
  ];

  return (
    <>
      <section className="w-full max-w-[1280px] mx-auto min-h-[100svh] py-[4em] h-full px-4 dashboard-section">
        <div className="flex w-full flex-col max-w-2xl mx-auto">
          <h2 className="text-5xl mt-6 font-medium  mb-6 animate__animated animate__fadeInDown overflow-hidden">
            Dashboard
          </h2>

          <div className="mb-6">
            <TaskForm />
          </div>

          <Tabs
            aria-label="Dynamic tabs"
            items={tabs}
            radius="none"
            variant="solid"
          >
            {(item) => (
              <Tab key={item.id} title={item.label}>
                <Card
                  radius="none"
                  className="animate__animated  overflow-hidden"
                >
                  <CardBody className="p-0">{item.content}</CardBody>
                </Card>
              </Tab>
            )}
          </Tabs>
        </div>
      </section>

      <ModalTask />
    </>
  );
};

export default Dashboard;
