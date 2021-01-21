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
  