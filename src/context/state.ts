import { object, string, InferType } from 'yup';

const configKey: any = 'CONFIG';
const config: ConfigType = window[configKey] as any;

const schema = object({
  walletUrl: string().required(),
}).defined();

export type ConfigType = InferType<typeof schema>;

interface TransactionType {
  blockHash: string;
  data: string;
  gasLimit: number;
  gasPrice: number;
  gasUsed: string;
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
}

export interface StateType {
  config: ConfigType;
  hideApp: boolean;
  publicKey: string;
  accountAddress: string;
  balance: string;
  nonce: number;
  newTransactions: TransactionType[];
}

const initialState = () => {
  schema.validate(config, { strict: true }).catch(({ errors }) => {
    console.error('config.js format errors: ', errors);
  });
  return {
    config,
    hideApp: false,
    accountAddress: '',
    balance: '...',
    nonce: 0,
    publicKey: '',
    newTransactions: [],
  };
};

export default initialState;
