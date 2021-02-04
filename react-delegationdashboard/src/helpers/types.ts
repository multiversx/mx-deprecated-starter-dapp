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

export class StatCardType {
  title!: string;
  value!: string;
  valueUnit!: string;
}


export class NodeType {
  blsKey!: string;
  status!: { [key: string]: string };
  queueIndex?: string;
  queueSize?: string;
  public constructor(blsKey: string, status: { [key: string]: string }, queueIndex?: string, queueSize?: string) {
    this.blsKey = blsKey;
    this.status = status;
    this.queueIndex = queueIndex;
    this.queueSize = queueSize;
  }
}

export class UndelegatedValueType {
  value: string;
  timeLeft: number;
  public constructor(value: string, timeLeft: number) {
    this.value = value;
    this.timeLeft = timeLeft;
  }
}
