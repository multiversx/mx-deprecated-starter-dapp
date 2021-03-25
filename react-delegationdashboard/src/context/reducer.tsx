import { initialState, StateType } from './state';
import { setItem, removeItem } from '../storage/session';

export type DispatchType = (action: ActionType) => void;

export type ActionType =
  | { type: 'login'; address: StateType['address'] }
  | { type: 'logout'; provider: StateType['dapp']['provider'] }
  | { type: 'loading'; loading: StateType['loading'] }
  | { type: 'setProvider'; provider: StateType['dapp']['provider'] }
  | { type: 'setBalance'; balance: StateType['account']['balance'] }
  | { type: 'setContractOverview'; contractOverview: StateType['contractOverview'] }
  | { type: 'setNetworkConfig'; networkConfig: StateType['networkConfig'] }
  | { type: 'setAgencyMetaData'; agencyMetaData: StateType['agencyMetaData'] }
  | { type: 'setNumberOfActiveNodes'; numberOfActiveNodes: StateType['numberOfActiveNodes'] }
  | { type: 'setNumUsers'; numUsers: StateType['numUsers'] }
  | { type: 'setMinDelegationAmount'; minDelegationAmount: StateType['minDelegationAmount'] }
  | { type: 'setTotalActiveStake'; totalActiveStake: StateType['totalActiveStake'] }
  | { type: 'setAprPercentage'; aprPercentage: StateType['aprPercentage'] };

export function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'login': {
      const { address } = action;
      let loggedIn = address || address !== '' ? true : false;
      setItem('logged_in', loggedIn);
      setItem('address', address);
      return {
        ...state,
        address,
        loggedIn: loggedIn,
      };
    }

    case 'loading': {
      const { loading } = action;
      return {
        ...state,
        loading,
      };
    }

    case 'setProvider': {
      const { provider } = action;
      return {
        ...state,
        dapp: {
          ...state.dapp,
          provider: provider,
        },
      };
    }

    case 'setBalance': {
      const { balance } = action;
      return {
        ...state,
        account: {
          ...state.account,
          balance: balance,
        },
      };
    }

    case 'setContractOverview': {
      const { contractOverview } = action;
      return {
        ...state,
        contractOverview,
      };
    }

    case 'setNetworkConfig': {
      const { networkConfig } = action;
      return {
        ...state,
        networkConfig,
      };
    }

    case 'setAgencyMetaData': {
      const { agencyMetaData } = action;
      return {
        ...state,
        agencyMetaData,
      };
    }

    case 'setNumberOfActiveNodes': {
      const { numberOfActiveNodes } = action;
      return {
        ...state,
        numberOfActiveNodes,
      };
    }

    case 'setNumUsers': {
      const { numUsers } = action;
      return {
        ...state,
        numUsers,
      };
    }

    case 'setMinDelegationAmount': {
      const { minDelegationAmount } = action;
      return {
        ...state,
        minDelegationAmount,
      };
    }

    case 'setTotalActiveStake': {
      const { totalActiveStake } = action;
      return {
        ...state,
        totalActiveStake,
      };
    }

    case 'setAprPercentage': {
      const { aprPercentage } = action;
      return {
        ...state,
        aprPercentage,
      };
    }

    case 'logout': {
      const { provider } = action;
      provider
        .logout()
        .then()
        .catch(e => console.error('logout', e));
      removeItem('logged_in');
      removeItem('address');
      return initialState();
    }

    default: {
      throw new Error(`Unhandled action type: ${action!.type}`);
    }
  }
}
