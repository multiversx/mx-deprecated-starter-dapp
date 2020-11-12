import {initialState, StateType} from "./state";

export type DispatchType = (action: ActionType) => void;

export type ActionType =
  | { type: 'login'; address: StateType['address'] }
  | { type: 'logout' }
  | { type: 'loading'; loading: StateType['loading'] }
  | { type: 'setProvider'; provider: StateType['dapp']["provider"] }
;

export function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'login': {
      const { address } = action;
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
      }
    }

    case 'setProvider': {
      const { provider } = action;
      return {
        ...state,
        dapp: {
          ...state.dapp,
          provider: provider,
        }
      }
    }

    case 'logout': {
      return initialState()
    }

    default: {
      throw new Error(`Unhandled action type: ${action!.type}`);
    }
  }
}
