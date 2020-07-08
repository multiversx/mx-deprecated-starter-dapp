import { object, string, InferType } from 'yup';

const configKey: any = 'CONFIG';
const config: ConfigType = window[configKey] as any;

const schema = object({
  nodeUrl: string().required(),
  elasticUrl: string().required(),
  contractAddress: string().required(),
}).defined();

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
  accountAddress: string;
  denomination: number;
  decimals: number;
  balance: string;
  nonce: number;
  detailsFetched: boolean;
  timeout: number;
  newTransactions: TransactionType[];
  lastTransaction: TransactionType | undefined;
}

const initialState = (): StateType => {
  schema.validate(config, { strict: true }).catch(({ errors }) => {
    console.error('config.js format errors: ', errors);
  });
  return {
    config,
    denomination: 18,
    decimals: 2,
    accountAddress: '',
    balance: '...',
    nonce: 0,
    detailsFetched: false,
    newTransactions: [],
    lastTransaction: undefined,
    timeout: 3000,
  };
};

export default initialState;
