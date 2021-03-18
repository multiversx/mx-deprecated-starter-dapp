import { IDappProvider, ProxyProvider, ApiProvider, WalletProvider } from '@elrondnetwork/erdjs';
import BigNumber from 'bignumber.js';
import { AgencyMetadata, ContractOverview, NetworkConfig } from 'helpers/contractDataDefinitions';
import { denomination, decimals, network, NetworkType } from '../config';
import { getItem } from '../storage/session';

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
  aprPercentage: string;
  contractOverview: ContractOverview;
  networkConfig: NetworkConfig;
  agencyMetaData: AgencyMetadata;
}
export const emptyAccount: AccountType = {
  balance: '...',
  nonce: 0,
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
};

export const emptyContractOverview: ContractOverview = {
  ownerAddress: '',
  serviceFee: '',
  maxDelegationCap: '',
  initialOwnerFunds: '',
  automaticActivation: 'false',
  withDelegationCap: false,
  changeableServiceFee: false,
  reDelegationCap: 'false',
  createdNounce: false,
  unBondPeriod: 0,
};

export const initialState = () => {
  const sessionNetwork = network || defaultNetwork;
  return {
    denomination: denomination,
    decimals: decimals,
    dapp: {
      provider: new WalletProvider(sessionNetwork.walletAddress),
      proxy: new ProxyProvider(
        sessionNetwork.gatewayAddress !== undefined
          ? sessionNetwork?.gatewayAddress
          : 'https://gateway.elrond.com/',
        4000
      ),
      apiProvider: new ApiProvider(
        sessionNetwork.apiAddress !== undefined
          ? sessionNetwork?.apiAddress
          : 'https://api.elrond.com/',
        4000
      ),
    },
    loading: false,
    error: '',
    loggedIn: !!getItem('logged_in'),
    address: getItem('address'),
    account: emptyAccount,
    egldLabel: sessionNetwork?.egldLabel,
    explorerAddress: sessionNetwork.explorerAddress || 'https://explorer.elrond.com',
    delegationContract: sessionNetwork.delegationContract,
    contractOverview: emptyContractOverview,
    networkConfig: emptyNetworkConfig,
    agencyMetaData: emptyAgencyMetaData,
    numberOfActiveNodes: '...',
    numUsers: 0,
    totalActiveStake: '...',
    aprPercentage: '...',
  };
};

export interface AccountType {
  balance: string;
  nonce: number;
}
