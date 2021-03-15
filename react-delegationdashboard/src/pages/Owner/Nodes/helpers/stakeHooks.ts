import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
export interface StakeActionType {
  blsKey: string;
  sendTransaction: (transactionArguments: DelegationTransactionType) => void;
}

export const nodeTransactions = {
  unStake: ({ blsKey, sendTransaction }: StakeActionType) => {
    let transactionArgs = new DelegationTransactionType('0', 'unStakeNodes', blsKey);
    return sendTransaction(transactionArgs);
  },
  reStake: ({ blsKey, sendTransaction }: StakeActionType) => {
    let transactionArguments = new DelegationTransactionType('0', 'reStakeUnStakedNodes', blsKey);
    return sendTransaction(transactionArguments);
  },
  unJail: ({ blsKey, sendTransaction }: StakeActionType) => {
    let transactionArguments = new DelegationTransactionType('2.5', 'unJailNodes', blsKey);
    return sendTransaction(transactionArguments);
  },
  unBond: ({ blsKey, sendTransaction }: StakeActionType) => {
    let transactionArguments = new DelegationTransactionType('0', 'unBondNodes', blsKey);
    return sendTransaction(transactionArguments);
  },
  stake: ({ blsKey, sendTransaction }: StakeActionType) => {
    let transactionArguments = new DelegationTransactionType('0', 'stakeNodes', `${blsKey}`);
    return sendTransaction(transactionArguments);
  },
  remove: ({ blsKey, sendTransaction }: StakeActionType) => {
    let transactionArguments = new DelegationTransactionType('0', 'removeNodes', `${blsKey}`);
    return sendTransaction(transactionArguments);
  },
};
