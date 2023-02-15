export type Field = {
  value: string
  error: string
};

export type SelectOption = {
  value: string
  label: string
};

export enum DnDType {
  Section = 'section',
  Task = 'task',
}
