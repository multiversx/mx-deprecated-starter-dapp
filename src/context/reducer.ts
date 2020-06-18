import { StateType } from './state';

export type ActionType =
  | { type: 'toggleApp'; hideApp: StateType['hideApp'] }
  | {
      type: 'setPkeysAndAccountAddress';
      publicKey: StateType['publicKey'];
      accountAddress: StateType['accountAddress'];
    }
  | {
      type: 'setBalanceAndTransactions';
      balance: StateType['balance'];
      nonce: StateType['nonce'];
      newTransactions: StateType['newTransactions'];
    }
  | {
      type: 'setActiveTestnet';
      activeTestnet: StateType['activeTestnet'];
      metaChainShardId: StateType['metaChainShardId'];
    };

export function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'toggleApp': {
      const { hideApp } = action;
      return { ...state, hideApp };
    }
    case 'setPkeysAndAccountAddress': {
      const { publicKey, accountAddress } = action;
      return { ...state, publicKey, accountAddress };
    }
    case 'setActiveTestnet': {
      const { activeTestnet, metaChainShardId } = action;
      return { ...state, activeTestnet, metaChainShardId };
    }
    case 'setBalanceAndTransactions': {
      const { balance, nonce, newTransactions } = action;
      return { ...state, balance, nonce, newTransactions };
    }
    default: {
      throw new Error(`Unhandled action type: ${action!.type}`);
    }
  }
}
