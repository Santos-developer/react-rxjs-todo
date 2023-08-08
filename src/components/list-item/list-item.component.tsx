import { FC, memo } from "react";
import { TaskSubject, Type } from "../../subjects/task-subject";
import { Task } from "../../types/task";
import ListItemStyles from "./list-item.styles";

export type ListItemProps = {
  task: Task;
};

export const ListItem: FC<ListItemProps> = memo(({ task }) => {
  const isCompleted = task.completed === true;
  const isPending = task.completed === false;

  const onMakeTaskCompleted = async () => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: true }),
      });

      if (response.ok) {
        TaskSubject.next({ type: Type.TASK_COMPLETED, taskId: task.id });
      }
    } catch (e) {
      console.log("Não foi possível completar a tarefa: ", e);
    }
  };

  const onMakeTaskPending = async () => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: false }),
      });

      if (response.ok) {
        TaskSubject.next({ type: Type.PENDING_TASK, taskId: task.id });
      }
    } catch (e) {
      console.log("Não foi possível atualizar a tarefa: ", e);
    }
  };

  const onRemoveTask = async () => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${task.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        TaskSubject.next({ type: Type.REMOVE_TASK, taskId: task.id });
      }
    } catch (e) {
      console.log("Não foi possível remover a tarefa", e);
    }
  };

  return (
    <ListItemStyles.Wrapper>
      <ListItemStyles.Text completed={task.completed}>
        {task.text}
      </ListItemStyles.Text>

      <ListItemStyles.Buttons>
        {isCompleted && (
          <ListItemStyles.Button onClick={onMakeTaskPending}>
            Pendente
          </ListItemStyles.Button>
        )}

        {isPending && (
          <ListItemStyles.Button onClick={onMakeTaskCompleted}>
            Completar
          </ListItemStyles.Button>
        )}

        <ListItemStyles.Button onClick={onRemoveTask}>
          Remover
        </ListItemStyles.Button>
      </ListItemStyles.Buttons>
    </ListItemStyles.Wrapper>
  );
});
