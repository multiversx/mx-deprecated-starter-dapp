import { StateType } from './state';

export type ActionType =
  | { type: 'login'; accountAddress: StateType['accountAddress'] }
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
    default: {
      throw new Error(`Unhandled action type: ${action!.type}`);
    }
  }
}
