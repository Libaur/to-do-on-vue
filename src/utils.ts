import { ITask, Status } from "@/stores/app";

function saveToStorage(key: string, data: ITask[]) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to save ${data} to local storage`);
  }
}

export function useStorage(key: string) {
  try {
    const item = localStorage.getItem(key);
    if (item && item.length) return JSON.parse(item);
  } catch (error) {
    console.error(`No item found in local storage for ${key}`);
  }
}

export function updateStorage(
  increasedData: ITask[],
  increasedStatus: Status,
  reducedData?: ITask[],
  reducedStatus?: Status
) {
  saveToStorage(increasedStatus, increasedData);
  if (reducedData && reducedStatus) {
    saveToStorage(reducedStatus, reducedData);
  }
}
