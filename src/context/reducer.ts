import { StateType, TransactionType } from './state';

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
      const { balance, nonce, newTransactions, detailsFetched } = action;
      return { ...state, balance, nonce, detailsFetched, newTransactions };
    }
    case 'addNewTransaction': {
      const newState: StateType = {
        ...state,
        newTransactions: [action.newTransaction, ...state.newTransactions],
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
