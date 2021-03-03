export class ContractOverview {
  ownerAddress: string;
  serviceFee?: string;
  maxDelegationCap: string;
  initialOwnerFunds?: string;
  automaticActivation: string;
  withDelegationCap?: boolean;
  changeableServiceFee?: boolean;
  reDelegationCap: string;
  createdNounce?: boolean;
  unBondPeriod?: number;
  public constructor(
    ownerAddress: string = '',
    serviceFee?: string,
    maxDelegationCap: string = '',
    initialOwnerFunds?: string,
    automaticActivation: string = 'false',
    withDelegationCap?: boolean,
    changeableServiceFee?: boolean,
    reDelegationCap: string = 'false',
    createdNounce?: boolean,
    unBondPeriod?: number
  ) {
    this.ownerAddress = ownerAddress;
    this.serviceFee = serviceFee;
    this.maxDelegationCap = maxDelegationCap;
    this.initialOwnerFunds = initialOwnerFunds;
    this.automaticActivation = automaticActivation;
    this.withDelegationCap = withDelegationCap;
    this.changeableServiceFee = changeableServiceFee;
    this.reDelegationCap = reDelegationCap;
    this.createdNounce = createdNounce;
    this.unBondPeriod = unBondPeriod;
  }
}

export class NetworkStake {
  totalValidators: number;
  activeValidators: number;
  queueSize: number;
  totalStaked: BigInt;
  public constructor(
    totalValidators: number,
    activeValidators: number,
    queueSize: number,
    totalStaked: BigInt
  ) {
    this.totalValidators = totalValidators;
    this.activeValidators = activeValidators;
    this.queueSize = queueSize;
    this.totalStaked = totalStaked;
  }
}

export class Stats {
  epoch: number;
  public constructor(epoch: number) {
    this.epoch = epoch;
  }
}

export class NetworkConfig {
  topUpFactor: number;
  topUpRewardsGradientPoint: BigInt;
  public constructor(topUpFactor: number, topUpRewardsGradientPoint: BigInt) {
    this.topUpFactor = topUpFactor;
    this.topUpRewardsGradientPoint = topUpRewardsGradientPoint;
  }
}

export class AgencyMetadata {
  name: string;
  website: string;
  keybase: string;
  public constructor(name: string = '', website: string = '', keybase: string = '') {
    this.name = name;
    this.website = website;
    this.keybase = keybase;
  }
}
