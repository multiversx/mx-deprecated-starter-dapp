import { object, string, number, InferType } from 'yup';

const configKey: any = 'CONFIG';
const config: ConfigType = window[configKey] as any;

const schema = object({
  nodeUrl: string().required(),
  elasticUrl: string().required(),
  contractAddress: string().required(),
  decimals: number().required(),
  denomination: number().required(),
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
  balance: string;
  nonce: number;
  detailsFetched: boolean;
  timeout: number;
  newTransactions: TransactionType[];
}

const initialState = (): StateType => {
  schema.validate(config, { strict: true }).catch(({ errors }) => {
    console.error('config.js format errors: ', errors);
  });
  return {
    config,
    accountAddress: '',
    balance: '...',
    nonce: 0,
    detailsFetched: false,
    newTransactions: [],
    timeout: 3000,
  };
};

export default initialState;
