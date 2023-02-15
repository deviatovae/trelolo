import { getResponse } from './response';
import { List, RequestMethod, TaskCreateData } from './types';
import { Task } from '../types/models';

export class TaskService {
  static getTasks = (sectionId: string) => getResponse<List<Task>>({ url: `sections/${sectionId}/tasks`, method: RequestMethod.GET });

  static createTask = (sectionId: string, data: TaskCreateData) => getResponse<Task>({
    url: `sections/${sectionId}/tasks`,
    method: RequestMethod.POST,
    body: data
  });

  static updateTask = (id: string, section: Task) => getResponse<Task>({ url: `tasks/${id}`, method: RequestMethod.PATCH, body: section });

  static deleteTask = (id: string) => getResponse<void>({ url: `tasks/${id}`, method: RequestMethod.DELETE });

}
