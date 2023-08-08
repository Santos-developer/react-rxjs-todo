import { useEffect } from "react";
import { Bottom } from "./components/bottom/bottom.component";
import { Button } from "./components/button/button.component";
import { Container } from "./components/container/container.component";
import { Content } from "./components/content/content.component";
import { Header } from "./components/header/header.component";
import { TaskList } from "./components/task-list/task-list.component";
import { Title } from "./components/title/title.component";
import {
  TaskSubject,
  Type,
  newTaskEventObserver,
  pendingTaskObserver,
  removeTaskObserver,
  taskCompletedObserver,
} from "./subjects/task-subject";
import { Task } from "./types/task";

newTaskEventObserver.subscribe((newTaskEvent) => {
  console.log("Novo evento (newTaskEvent): ", newTaskEvent);
});

taskCompletedObserver.subscribe((taskCompletedEvent) => {
  console.log("Novo evento (taskCompletedEvent): ", taskCompletedEvent);
});

pendingTaskObserver.subscribe((pendingTaskEvent) => {
  console.log("Novo evento (pendingTaskEvent): ", pendingTaskEvent);
});

function App() {
  const onAddTask = async () => {
    try {
      const text = prompt("Insira o nome da tarefa:");

      const task: Task = {
        id: Date.now().toString(),
        text: text!,
        completed: false,
      };

      const response = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        TaskSubject.next({
          type: Type.NEW_TASK,
          task,
        });
      }
    } catch (e) {
      console.log("Não foi possível adicionar tarefa");
    }
  };

  useEffect(() => {
    const enableNotifications = async () => {
      if ("Notification" in window) {
        await Notification.requestPermission();
      } else {
        console.log("Este navegador não suporta notificações.");
      }
    };

    enableNotifications();
    
    const newTaskEventSubscription = newTaskEventObserver.subscribe(
      (newTaskEvent) => {
        new Notification("Tarefa criada com sucesso", {
          body: `Tarefa: ${newTaskEvent.task.text}`,
        });
      }
    );

    const taskCompletedSubscription = taskCompletedObserver.subscribe(() => {
      new Notification("Tarefa marcada como completa");
    });

    const pendingTaskSubscription = pendingTaskObserver.subscribe(() => {
      new Notification("Tarefa marcada como pendente");
    });

    const removeTaskSubscription = removeTaskObserver.subscribe(() => {
      new Notification("Tarefa removida com sucesso");
    });

    return () => {
      newTaskEventSubscription.unsubscribe();
      taskCompletedSubscription.unsubscribe();
      pendingTaskSubscription.unsubscribe();
      removeTaskSubscription.unsubscribe();
    };
  }, []);

  return (
    <Container>
      <Header>
        <Title>Tarefas</Title>
      </Header>

      <Content>
        <TaskList />
      </Content>

      <Bottom>
        <Button onClick={onAddTask}>Nova tarefa</Button>
      </Bottom>
    </Container>
  );
}

export default App;
