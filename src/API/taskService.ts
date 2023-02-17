import { getResponse } from './response';
import { List, RequestMethod, TaskCreateData, TaskUpdateData } from './types';
import { MyTask, Task } from '../types/models';

export class TaskService {
  static getTasks = (sectionId: string) => getResponse<List<Task>>({ url: `sections/${sectionId}/tasks`, method: RequestMethod.GET });

  static getAllTasks = (assignedToMe = false) => getResponse<List<MyTask>>({
    url: `tasks/${assignedToMe ? '?assignee=me' : ''}`,
    method: RequestMethod.GET
  });

  static createTask = (sectionId: string, data: TaskCreateData) => getResponse<Task>({
    url: `sections/${sectionId}/tasks`,
    method: RequestMethod.POST,
    body: data
  });

  static updateTask = (id: string, task: TaskUpdateData) => getResponse<Task>({ url: `tasks/${id}`, method: RequestMethod.PATCH, body: task });

  static deleteTask = (id: string) => getResponse<Task>({ url: `tasks/${id}`, method: RequestMethod.DELETE });

  static moveTask = (taskId: string, sectionId: string, position: number) => getResponse<Task>({
    url: `tasks/${taskId}/move/${sectionId}`,
    method: RequestMethod.PATCH,
    body: { position }
  });

}
