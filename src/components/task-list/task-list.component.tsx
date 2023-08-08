import { FC, useEffect, useState } from "react";
import { from, switchMap } from "rxjs";
import {
  newTaskEventObserver,
  pendingTaskObserver,
  removeTaskObserver,
  taskCompletedObserver,
} from "../../subjects/task-subject";
import { Task } from "../../types/task";
import { ListItem } from "../list-item/list-item.component";
import { List } from "../list/list.component";

export const TaskList: FC = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);

  useEffect(() => {
    const fetchObserver = from(fetch("http://localhost:3001/tasks")).pipe(
      switchMap((response) => response.json())
    );

    fetchObserver.subscribe((tasks) => {
      setTaskList(tasks);
    });

    const newTaskEventSubscription = newTaskEventObserver.subscribe(
      (newTaskEvent) => {
        setTaskList((prevTasks) => [...prevTasks, newTaskEvent.task]);
      }
    );

    const taskCompletedSubscription = taskCompletedObserver.subscribe(
      (taskCompletedEvent) => {
        setTaskList((prevTasks) =>
          prevTasks.map((prevTask) => {
            if (prevTask.id === taskCompletedEvent.taskId) {
              return { ...prevTask, completed: true };
            }

            return prevTask;
          })
        );
      }
    );

    const pendingTaskSubscription = pendingTaskObserver.subscribe(
      (pendingTaskEvent) => {
        setTaskList((prevTasks) =>
          prevTasks.map((prevTask) => {
            if (prevTask.id === pendingTaskEvent.taskId) {
              return { ...prevTask, completed: false };
            }
            return prevTask;
          })
        );
      }
    );

    const removeTaskSubscription = removeTaskObserver.subscribe(
      (removeTaskEvent) => {
        setTaskList((prevTasks) =>
          prevTasks.filter((prevTask) => prevTask.id !== removeTaskEvent.taskId)
        );
      }
    );

    return () => {
      newTaskEventSubscription.unsubscribe();
      taskCompletedSubscription.unsubscribe();
      pendingTaskSubscription.unsubscribe();
      removeTaskSubscription.unsubscribe();
    };
  }, []);

  return (
    <List>
      {taskList.map((task) => (
        <ListItem key={task.id} task={task} />
      ))}
    </List>
  );
};
