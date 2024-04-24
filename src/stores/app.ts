import { defineStore } from "pinia";
import { updateStorage } from "@/utils";

type Status = "unfulfilled" | "done" | "deleted";

interface ITask {
  id: string;
  title: string;
  description: string;
  status: Status;
}

interface AppState {
  unfulfilled: ITask[];
  done: ITask[];
  deleted: ITask[];
}

const useAppStore = defineStore("app", {
  state: (): AppState => ({
    unfulfilled: [],
    done: [],
    deleted: [],
  }),
  actions: {
    addTask(newTask: ITask, currentStatus?: Status) {
      if (currentStatus) {
        this[currentStatus] = this[currentStatus].filter(
          (task) => task.id !== newTask.id
        );
        newTask.status = "unfulfilled";
      }
      this.unfulfilled.push(newTask);
      updateStorage(
        this.unfulfilled,
        "unfulfilled",
        currentStatus ? this[currentStatus] : undefined,
        currentStatus ? currentStatus : undefined
      );
    },
    completeTask(completedTask: ITask) {
      const completedTaskIndex = this.unfulfilled.findIndex(
        (task) => task.id === completedTask.id
      );
      if (completedTaskIndex !== -1) {
        const completed = this.unfulfilled[completedTaskIndex];
        this.unfulfilled.splice(completedTaskIndex, 1);
        completed.status = "done";
        this.done.push(completed);
        updateStorage(this.done, "done", this.unfulfilled, "unfulfilled");
      }
    },
    removeTask(removedTaskId: string, currentStatus: Status) {
      const removedTaskIndex = this[currentStatus].findIndex(
        (task) => task.id === removedTaskId
      );
      const [removedTask] = this[currentStatus].splice(removedTaskIndex, 1);
      if (currentStatus !== "deleted") {
        removedTask.status = "deleted";
        this.deleted.push(removedTask);
        updateStorage(
          this.deleted,
          "deleted",
          this[currentStatus],
          currentStatus
        );
      } else {
        updateStorage(this.deleted, "deleted");
      }
    },
  },
});

export { type Status, type ITask, useAppStore };
