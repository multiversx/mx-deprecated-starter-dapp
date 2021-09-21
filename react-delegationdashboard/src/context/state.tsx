import {
  IDappProvider,
  ProxyProvider,
  ApiProvider,
  WalletProvider,
  Nonce,
  ChainID,
  HWProvider,
  WalletConnectProvider,
} from '@elrondnetwork/erdjs';
import BigNumber from 'bignumber.js';
import {
  AccountType,
  AgencyMetadata,
  ContractOverview,
  NetworkConfig,
} from 'helpers/contractDataDefinitions';
import { denomination, decimals, network, NetworkType } from '../config';
import { getItem } from '../storage/session';
const defaultGatewayAddress = 'https://gateway.elrond.com';
const defaultApiAddress = 'https://gateway.elrond.com';
const defaultExplorerAddress = 'https://gateway.elrond.com';

export const defaultNetwork: NetworkType = {
  id: 'not-configured',
  name: 'NOT CONFIGURED',
  egldLabel: '',
  walletAddress: '',
  apiAddress: '',
  gatewayAddress: '',
  explorerAddress: '',
  delegationContract: '',
};

export interface DappState {
  provider: IDappProvider;
  proxy: ProxyProvider;
  apiProvider: ApiProvider;
}

export interface StateType {
  dapp: DappState;
  loading: boolean;
  error: string;
  loggedIn: boolean;
  ledgerLogin: {
    index: number;
    loginType: string;
  };
  walletConnectLogin: {
    loginType: string;
  };
  address: string;
  egldLabel: string;
  denomination: number;
  decimals: number;
  account: AccountType;
  explorerAddress: string;
  delegationContract?: string;
  totalActiveStake: string;
  numberOfActiveNodes: string;
  numUsers: number;
  minDelegationAmount: number;
  aprPercentage: string;
  contractOverview: ContractOverview;
  networkConfig: NetworkConfig;
  agencyMetaData: AgencyMetadata;
  ledgerAccount?: {
    index: number;
    address: string;
  };
  walletConnectAccount?: string;
}
export const emptyAccount: AccountType = {
  balance: '...',
  nonce: new Nonce(0),
};

export const emptyAgencyMetaData: AgencyMetadata = {
  name: '',
  website: '',
  keybase: '',
};

export const emptyNetworkConfig: NetworkConfig = {
  roundDuration: -1,
  roundsPerEpoch: -1,
  roundsPassedInCurrentEpoch: -1,
  topUpFactor: -1,
  topUpRewardsGradientPoint: new BigNumber('-1'),
  chainId: new ChainID('-1'),
};

export const emptyContractOverview: ContractOverview = {
  ownerAddress: '',
  serviceFee: '',
  maxDelegationCap: '',
  initialOwnerFunds: '',
  automaticActivation: 'false',
  withDelegationCap: 'false',
  changeableServiceFee: 'false',
  reDelegationCap: 'false',
  createdNounce: 'false',
  unBondPeriod: 0,
};

export const initialState = (): {
  denomination: number;
  decimals: number;
  dapp: {
    provider: HWProvider | WalletProvider | WalletConnectProvider;
    proxy: ProxyProvider;
    apiProvider: ApiProvider;
  };
  loading: boolean;
  error: string;
  loggedIn: boolean;
  ledgerLogin: any;
  walletConnectLogin: any;
  address: any;
  account: AccountType;
  egldLabel: string;
  explorerAddress: string;
  delegationContract: string | undefined;
  contractOverview: ContractOverview;
  networkConfig: NetworkConfig;
  agencyMetaData: AgencyMetadata;
  numberOfActiveNodes: string;
  numUsers: number;
  minDelegationAmount: number;
  totalActiveStake: string;
  aprPercentage: string;
  ledgerAccount: { index: any; address: any } | undefined;
  walletConnectAccount: any;
} => {
  const sessionNetwork = network || defaultNetwork;
  return {
    denomination: denomination,
    decimals: decimals,
    dapp: {
      provider: new WalletProvider(sessionNetwork.walletAddress),
      proxy: new ProxyProvider(
        sessionNetwork.gatewayAddress !== undefined
          ? sessionNetwork?.gatewayAddress
          : defaultGatewayAddress,
        { timeout: 4000 }
      ),
      apiProvider: new ApiProvider(
        sessionNetwork.apiAddress !== undefined ? sessionNetwork?.apiAddress : defaultApiAddress,
        { timeout: 4000 }
      ),
    },
    loading: false,
    error: '',
    loggedIn: !!getItem('logged_in'),
    ledgerLogin: getItem('ledgerLogin'),
    walletConnectLogin: getItem('walletConnectLogin'),
    address: getItem('address'),
    account: emptyAccount,
    egldLabel: sessionNetwork?.egldLabel,
    explorerAddress: sessionNetwork.explorerAddress || defaultExplorerAddress,
    delegationContract: sessionNetwork.delegationContract,
    contractOverview: emptyContractOverview,
    networkConfig: emptyNetworkConfig,
    agencyMetaData: emptyAgencyMetaData,
    numberOfActiveNodes: '...',
    numUsers: 0,
    minDelegationAmount: -1,
    totalActiveStake: '...',
    aprPercentage: '...',
    ledgerAccount:
      getItem('ledgerAccountIndex') && getItem('address')
        ? {
            index: getItem('ledgerAccountIndex'),
            address: getItem('address'),
          }
        : undefined,

    walletConnectAccount: getItem('walletConnectLogin') ? getItem('address') : undefined,
  };
};
