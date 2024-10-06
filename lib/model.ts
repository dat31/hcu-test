export type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
};

export enum FilterStatus {
  ALL,
  COMPLETED,
  INCOMPLETE,
}
