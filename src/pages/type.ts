export type ActionType = 'add' | 'modify' | string;

export type FormProps<T> = {
  open: boolean | undefined;
  onOk: () => void;
  onCancel: () => void;
  action?: ActionType;
  row?: T;
};
