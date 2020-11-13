import {IDappProvider, WalletProvider, ProxyProvider, WALLET_PROVIDER_TESTNET} from "@elrondnetwork/erdjs";

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
  denomination: number,
  decimals: number,
}

export const initialState = () => {
  return {
    denomination: 18,
    decimals: 2,
    dapp: {
      provider: new WalletProvider(WALLET_PROVIDER_TESTNET),
      proxy: new ProxyProvider("https://testnet-api.elrond.com", 4000),
    },
    loading: false,
    error: '',
    loggedIn: false,
    address: '',
  }
};
