import { object, string, InferType } from 'yup';

const configKey: any = 'CONFIG';
const config: ConfigType = window[configKey] as any;

const schema = object({
  walletUrl: string().required(),
  loginCallbackUrl: string().required(),
  erdLabel: string().required(),
}).defined();

interface TestnetType {
  /*
    Legend:
        decimals: number of displayed ERD decimals in explorer
        denomination: number by which transaction are divided
        numInitCharactersForScAddress: number of zeros to hide
    Possbile flags:
        wallet: (default) true
        validators: (default) true
        validatorDetails: (default) false
        economics: (default) false
        gasLimitEditable: (default) false
        data: (default) false
        faucet: (default) false (faucet)
  */
  default: boolean;
  id: string;
  name: string;
  nodeUrl: string;
  numInitCharactersForScAddress: number;
  elasticUrl: string;
  refreshRate: number;
  decimals: number;
  validators?: boolean;
  denomination: number;
  gasPrice: string;
  gasLimit: number;
  gasPerDataByte: number;
  wallet?: boolean;
  faucet: boolean;
}

export type ConfigType = InferType<typeof schema>;
export interface TransactionType {
  blockHash: string;
  data: string;
  gasLimit: number;
  gasPrice: number;
  gasUsed: number;
  hash: string;
  miniBlockHash: string;
  nonce: number;
  receiver: string;
  receiverShard: number;
  round: number;
  sender: string;
  senderShard: number;
  signature: string;
  status: string;
  timestamp: number;
  value: string;
  scResults?: Array<{
    returnMessage: string;
  }>;
}

export interface StateType {
  config: ConfigType;
  activeTestnet: TestnetType;
  metaChainShardId: number;
  hideApp: boolean;
  publicKey: string;
  accountAddress: string;
  balance: string;
  nonce: number;
  newTransactions: TransactionType[];
}

const defaultTestnet = {
  default: false,
  id: 'not-configured',
  name: 'NOT CONFIGURED',
  numInitCharactersForScAddress: 0,
  nodeUrl: '',
  refreshRate: 0,
  elasticUrl: '',
  decimals: 0,
  denomination: 0,
  gasPrice: '0',
  gasLimit: 0,
  gasPerDataByte: 0,
  wallet: true,
  faucet: false,
};

const initialState = () => {
  schema.validate(config, { strict: true }).catch(({ errors }) => {
    console.error('config.js format errors: ', errors);
  });
  return {
    config,
    activeTestnet: defaultTestnet,
    metaChainShardId: -1,
    hideApp: false,
    accountAddress: '',
    balance: '...',
    nonce: 0,
    publicKey: '',
    newTransactions: [],
  };
};

export default initialState;
