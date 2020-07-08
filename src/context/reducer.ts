import { StateType, TransactionType } from './state';
import Cookies from 'js-cookie';

const mergeSessionTransactions = (
  accountAddress: string,
  fetchedTransactions: TransactionType[]
) => {
  const sessionTransactions: TransactionType[] =
    Cookies.getJSON(`transactions-${accountAddress}`) || [];
  const existingHashes = sessionTransactions.map((tx) => tx.hash);
  const newHashes = fetchedTransactions.map((tx) => tx.hash);
  const missingHashes = existingHashes.filter((hash) => !newHashes.includes(hash));
  const missingTransactions = sessionTransactions.filter((tx) => missingHashes.includes(tx.hash));
  return [...missingTransactions, ...fetchedTransactions];
};

export type ActionType =
  | { type: 'login'; accountAddress: StateType['accountAddress'] }
  | { type: 'addNewTransaction'; newTransaction: TransactionType }
  | { type: 'setLastTransaction'; lastTransaction: TransactionType }
  | { type: 'removeLastTransaction' }
  | {
      type: 'setBalanceAndTransactions';
      balance: StateType['balance'];
      nonce: StateType['nonce'];
      detailsFetched: StateType['detailsFetched'];
      newTransactions: StateType['newTransactions'];
    };

export function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'login': {
      const { accountAddress } = action;
      return { ...state, accountAddress };
    }
    case 'setBalanceAndTransactions': {
      const { balance, nonce, newTransactions: fetchedTransactions, detailsFetched } = action;
      const newTransactions = mergeSessionTransactions(state.accountAddress, fetchedTransactions);
      Cookies.set(`transactions-${state.accountAddress}`, newTransactions);
      return { ...state, balance, nonce, detailsFetched, newTransactions };
    }
    case 'addNewTransaction': {
      const newTransactions = [action.newTransaction, ...state.newTransactions];
      Cookies.set(`transactions-${state.accountAddress}`, newTransactions);
      const newState: StateType = {
        ...state,
        newTransactions,
      };
      return newState;
    }
    case 'setLastTransaction': {
      return { ...state, lastTransaction: action.lastTransaction };
    }
    case 'removeLastTransaction': {
      return { ...state, lastTransaction: undefined };
    }
    default: {
      throw new Error(`Unhandled action type: ${action!.type}`);
    }
  }
}
