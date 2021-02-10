import { object, string, boolean, InferType } from 'yup';
import { DelegationContractType } from './helpers/types';

export const decimals: number = 2;
export const denomination: number = 18;

export const networks: NetworkType[] = [
  {
    default: false,
    id: 'mainnet',
    name: 'Mainnet',
    theme: 'light',
    erdLabel: 'EGLD',
    walletAddress: 'https://wallet.elrond.com/dapp/init',
    apiAddress: 'https://api.elrond.com',
    gatewayAddress: 'https://gateway.elrond.com',
    explorerAddress: 'http://explorer.elrond.com',
    delegationContract: 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhllllsajxzat',
    auctionContract: 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqplllst77y4l',
    stakingContract: 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqllls0lczs7',
  },
  {
    default: true,
    id: 'testnet',
    name: 'Testnet',
    theme: 'testnet',
    erdLabel: 'xEGLD',
    walletAddress: 'http://internal-wallet.elrond.com/dapp/init',
    apiAddress: 'http://35.210.167.16:8080',
    gatewayAddress: 'https://internal-gateway.elrond.com',
    explorerAddress: 'http://internal-explorer.elrond.com/',
    delegationContract: 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhllllsajxzat',
    auctionContract: 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqplllst77y4l',
    stakingContract: 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqllls0lczs7',
  },
];

const networkBaseSchema = object({
  default: boolean(),
  id: string()
    .defined()
    .required(),
  erdLabel: string()
    .defined()
    .required(),
  name: string()
    .defined()
    .required(),
  theme: string(),
  delegationContract: string(),
  auctionContract: string(),
  stakingContract: string(),
  walletAddress: string(),
  apiAddress: string(),
  gatewayAddress: string(),
  explorerAddress: string(),
}).required();

const schema = networkBaseSchema;
export type NetworkType = InferType<typeof schema>;

networks.forEach(network => {
  schema.validate(network, { strict: true }).catch(({ errors }) => {
    console.error(`Config invalid format for ${network.id}`, errors);
  });
});

export const delegationContractData: DelegationContractType[] = [
  {
    name: 'createNewDelegationContract',
    gasLimit: 6000000,
    data: 'createNewDelegationContract@',
  },
  {
    name: 'setAutomaticActivation',
    gasLimit: 6000000,
    data: 'setAutomaticActivation@',
  },
  {
    name: 'changeServiceFee',
    gasLimit: 6000000,
    data: 'changeServiceFee@',
  },
  {
    name: 'modifyTotalDelegationCap',
    gasLimit: 6000000,
    data: 'modifyTotalDelegationCap@',
  },
  {
    name: 'addNodes',
    gasLimit: 12000000,
    data: 'addNodes@',
  },
  {
    name: 'removeNodes',
    gasLimit: 12000000,
    data: 'removeNodes@',
  },
  {
    name: 'stakeNodes',
    gasLimit: 12000000,
    data: 'stakeNodes@',
  },
  {
    name: 'reStakeUnStakedNodes',
    gasLimit: 120000000,
    data: 'reStakeUnStakedNodes@',
  },
  {
    name: 'unStakeNodes',
    gasLimit: 12000000,
    data: 'unStakeNodes@',
  },
  {
    name: 'unBondNodes',
    gasLimit: 12000000,
    data: 'unBondNodes@',
  },
  {
    name: 'unJailNodes',
    gasLimit: 12000000,
    data: 'unJailNodes@',
  },
  {
    name: 'delegate',
    gasLimit: 12000000,
    data: 'delegate',
  },
  {
    name: 'unDelegate',
    gasLimit: 12000000,
    data: 'unDelegate@',
  },
  {
    name: 'withdraw',
    gasLimit: 12000000,
    data: 'withdraw',
  },
  {
    name: 'claimRewards',
    gasLimit: 6000000,
    data: 'claimRewards',
  },
  {
    name: 'reDelegateRewards',
    gasLimit: 12000000,
    data: 'reDelegateRewards',
  },
];
