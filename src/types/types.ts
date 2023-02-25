export type Field = {
  value: string
  error: string
};

export type SelectOption = {
  value: string
  label: string
  isFixed?: boolean
};

export enum DnDType {
  Section = 'section',
  Task = 'task',
}

export type Assignee = {
  id?: string,
  memberId: string,
  taskId: string,
};
