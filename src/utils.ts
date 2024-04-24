import { ITask, Status } from "@/stores/app";

export function updateStorage(
  increased: ITask[],
  increasedStatus: Status,
  reduced?: ITask[],
  reducedStatus?: Status
) {
  localStorage.setItem(increasedStatus, JSON.stringify(increased)); 
  if (reduced && reducedStatus) {
    localStorage.setItem(reducedStatus, JSON.stringify(reduced));
  }
}

export const useStorage = (currentStatus: Status) =>
  localStorage.getItem(currentStatus)?.length &&
  JSON.parse(localStorage.getItem(currentStatus) as string);
