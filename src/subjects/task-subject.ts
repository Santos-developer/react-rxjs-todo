import { Subject, filter } from "rxjs";
import { Task } from "../types/task";

export enum Type {
  NEW_TASK = "NEW_TASK",
  REMOVE_TASK = "REMOVE_TASK",
  TASK_COMPLETED = "TASK_COMPLETED",
  PENDING_TASK = "PENDING_TASK",
}

export type NewTaskEvent = {
  type: Type.NEW_TASK;
  task: Task;
};

export type TaskCompletedEvent = {
  type: Type.TASK_COMPLETED;
  taskId: string;
};

export type PendingTaskEvent = {
  type: Type.PENDING_TASK;
  taskId: string;
};

export type RemoveTaskEvent = {
  type: Type.REMOVE_TASK;
  taskId: string;
};

export type TaskEvents =
  | NewTaskEvent
  | TaskCompletedEvent
  | PendingTaskEvent
  | RemoveTaskEvent;

export const TaskSubject = new Subject<TaskEvents>();

export const newTaskEventObserver = TaskSubject.pipe(
  filter(
    (taskEvents): taskEvents is NewTaskEvent =>
      taskEvents.type === Type.NEW_TASK
  )
);

export const taskCompletedObserver = TaskSubject.pipe(
  filter(
    (taskEvents): taskEvents is TaskCompletedEvent =>
      taskEvents.type === Type.TASK_COMPLETED
  )
);

export const pendingTaskObserver = TaskSubject.pipe(
  filter(
    (taskEvents): taskEvents is PendingTaskEvent =>
      taskEvents.type === Type.PENDING_TASK
  )
);

export const removeTaskObserver = TaskSubject.pipe(
  filter(
    (taskEvents): taskEvents is RemoveTaskEvent =>
      taskEvents.type === Type.REMOVE_TASK
  )
);
