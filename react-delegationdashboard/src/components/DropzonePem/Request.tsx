export interface VariableType {
  name: string;
  type: string;
}

export interface RequestType {
  data: string | ((args: any) => void);
  variables?: VariableType[];
}
