import { IDappProvider, ProxyProvider, WalletProvider } from "@elrondnetwork/erdjs";
import { denomination, decimals, networks, NetworkType } from "../config";
import { getItem } from '../storage/session';

export const defaultNetwork: NetworkType= {
  default: false,
  id: 'not-configured',
  name: 'NOT CONFIGURED',
  erdLabel: '',
  theme: '',
  walletAddress: '',
  apiAddress: '',
  delegationContract: ''
};

interface DappState {
  provider: IDappProvider,
  proxy: ProxyProvider,
}

export interface StateType {
  dapp: DappState,
  loading: boolean,
  error: string,
  loggedIn: boolean,
  address: string,
  erdLabel: string,
  denomination: number,
  decimals: number,
  account: AccountType
}
export const emptyAccount: AccountType = {
  balance: '...',
  nonce: 0
};


export const initialState = (optionalConfig?: NetworkType[]) => {
  const sessionNetwork = networks.filter((network) => network.default).pop() || defaultNetwork;
  return {
    denomination: denomination,
    decimals: decimals,
    dapp: {
      provider: new WalletProvider(sessionNetwork.walletAddress),
      proxy: new ProxyProvider(sessionNetwork.apiAddress!==undefined?sessionNetwork?.apiAddress: "https://explorer.elrond.com/", 4000),
    },
    loading: false,
    error: '',
    loggedIn: !!getItem("logged_in"),
    address: getItem("address"),
    account: emptyAccount,
    erdLabel: sessionNetwork?.erdLabel,
  }
};  

export interface AccountType {
  balance: string;
  nonce: number;
}