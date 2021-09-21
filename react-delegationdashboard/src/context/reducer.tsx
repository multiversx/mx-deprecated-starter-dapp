import { initialState, StateType } from './state';
import { setItem, removeItem } from '../storage/session';

export type DispatchType = (action: ActionType) => void;

export type ActionType =
  | { type: 'login'; address: StateType['address'] }
  | { type: 'ledgerLogin'; ledgerLogin: StateType['ledgerLogin'] }
  | { type: 'logout'; provider: StateType['dapp']['provider'] }
  | { type: 'loading'; loading: StateType['loading'] }
  | { type: 'setProvider'; provider: StateType['dapp']['provider'] }
  | { type: 'setAccount'; account: StateType['account'] }
  | { type: 'setContractOverview'; contractOverview: StateType['contractOverview'] }
  | { type: 'setNetworkConfig'; networkConfig: StateType['networkConfig'] }
  | { type: 'setAgencyMetaData'; agencyMetaData: StateType['agencyMetaData'] }
  | { type: 'setNumberOfActiveNodes'; numberOfActiveNodes: StateType['numberOfActiveNodes'] }
  | { type: 'setNumUsers'; numUsers: StateType['numUsers'] }
  | { type: 'setMinDelegationAmount'; minDelegationAmount: StateType['minDelegationAmount'] }
  | { type: 'setTotalActiveStake'; totalActiveStake: StateType['totalActiveStake'] }
  | { type: 'setAprPercentage'; aprPercentage: StateType['aprPercentage'] }
  | { type: 'setLedgerAccount'; ledgerAccount: StateType['ledgerAccount'] }
  | {
      type: 'setWalletConnectLogin';
      walletConnectLogin: StateType['walletConnectLogin'];
    }
  | {
      type: 'setWalletConnectAccount';
      walletConnectAccount: StateType['walletConnectAccount'];
    };

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
    case 'ledgerLogin': {
      const { ledgerLogin } = action;
      setItem('ledgerLogin', ledgerLogin);
      return {
        ...state,
        ledgerLogin,
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

    case 'setAccount': {
      const { account } = action;
      return {
        ...state,
        account,
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

    case 'setLedgerAccount': {
      const { ledgerAccount } = action;
      return {
        ...state,
        ledgerAccount,
      };
    }

    case 'setWalletConnectLogin': {
      const { walletConnectLogin } = action;
      setItem('walletConnectLogin', walletConnectLogin);
      return {
        ...state,
        walletConnectLogin,
      };
    }

    case 'setWalletConnectAccount': {
      const { walletConnectAccount } = action;
      return {
        ...state,
        walletConnectAccount,
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
      removeItem('ledgerLogin');
      removeItem('walletConnectLogin');
      return initialState();
    }

    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}
