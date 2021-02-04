import { initialState, StateType } from './state';
import { setItem, removeItem } from '../storage/session';

export type DispatchType = (action: ActionType) => void;

export type ActionType =
  | { type: 'login'; address: StateType['address'] }
  | { type: 'logout'; provider: StateType['dapp']['provider'] }
  | { type: 'loading'; loading: StateType['loading'] }
  | { type: 'setProvider'; provider: StateType['dapp']['provider'] }
  | { type: 'setBalance'; balance: StateType['account']['balance'] }
  ;

export function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'login': {
      const { address } = action;
      setItem('logged_in', true);
      setItem('address', address);
      return {
        ...state,
        address,
        loggedIn: true,
      };
    }

    case 'loading': {
      const { loading } = action;
      return {
        ...state,
        loading
      };
    }

    case 'setProvider': {
      const { provider } = action;
      return {
        ...state,
        dapp: {
          ...state.dapp,
          provider: provider,
        }
      };
    }

    case 'setBalance': {
      const { balance } = action;
      return {
        ...state,
        account: {
          ...state.account,
          balance: balance
        }
      };
    }

    case 'logout': {

      const { provider } = action;
      provider.logout().then().catch(e => console.log('logout', e));
      removeItem('logged_in');
      removeItem('address');
      return initialState();
    }

    default: {
      throw new Error(`Unhandled action type: ${action!.type}`);
    }
  }
}
