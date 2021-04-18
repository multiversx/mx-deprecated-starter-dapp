import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
export interface StakeActionType {
  blsKey: string;
}

export const nodeTransactions = {
  unStake: ({ blsKey }: StakeActionType) => {
    let transactionArgs = new DelegationTransactionType('0', 'unStakeNodes', blsKey);
    return transactionArgs;
  },
  reStake: ({ blsKey }: StakeActionType) => {
    let transactionArguments = new DelegationTransactionType('0', 'reStakeUnStakedNodes', blsKey);
    return transactionArguments;
  },
  unJail: ({ blsKey }: StakeActionType) => {
    let transactionArguments = new DelegationTransactionType('2.5', 'unJailNodes', blsKey);
    return transactionArguments;
  },
  unBond: ({ blsKey }: StakeActionType) => {
    let transactionArguments = new DelegationTransactionType('0', 'unBondNodes', blsKey);
    return transactionArguments;
  },
  stake: ({ blsKey }: StakeActionType) => {
    let transactionArguments = new DelegationTransactionType('0', 'stakeNodes', `${blsKey}`);
    return transactionArguments;
  },
  remove: ({ blsKey }: StakeActionType) => {
    let transactionArguments = new DelegationTransactionType('0', 'removeNodes', `${blsKey}`);
    return transactionArguments;
  },
};
