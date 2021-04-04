export interface AccountType {
  address: string;
  balance: string;
  nonce: number;
  code?: string;
}

export interface DelegationContractType {
  name: string;
  gasLimit: number;
  data: string;
}

export interface StatCardType {
  title?: string;
  value?: string;
  valueUnit?: string;
  svg?: string;
  color?: string;
  percentage?: string;
  tooltipText?: string;
  children?: any;
}

export interface ActionModalType {
  balance?: string;
  show: boolean;
  title: string;
  description: string;
  handleClose: () => void;
  handleContinue: (value: string) => void;
}
