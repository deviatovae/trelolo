export type Field<T = string> = {
  value: T
  error: string
};

export type FieldChanges<T = string> = Field<T> & {
  isChanged: boolean
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
