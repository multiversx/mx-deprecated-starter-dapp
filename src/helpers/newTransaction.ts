import moment from 'moment';
import txStatus from './txStatus';
import { TransactionType } from 'context/state';

export default function newTransaction({
  hash = '',
  receiver = '',
  sender = '',
  data = '',
  value = '',
  gasLimit = 0,
  gasPrice = 0,
}: {
  hash?: string;
  receiver?: string;
  sender?: string;
  data?: string;
  value?: string;
  gasLimit?: string | number;
  gasPrice?: string | number;
}): TransactionType {
  const timestamp = moment().unix();
  return {
    blockHash: '',
    data,
    gasLimit: parseInt(gasLimit.toString()),
    gasPrice: parseInt(gasPrice.toString()),
    gasUsed: 0,
    hash,
    miniBlockHash: '',
    nonce: 0,
    receiver,
    receiverShard: 0,
    round: 0,
    sender,
    senderShard: 0,
    signature: '',
    status: txStatus.pending,
    timestamp,
    value,
  };
}
