import { TransactionHash } from '@elrondnetwork/erdjs/out';
import { useContext } from 'context';
import { Delegation } from 'contracts';
import { DelegationTransactionType } from './contractDataDefinitions';
import { ledgerErrorCodes } from './ledgerErrorCodes';
export interface UseDelegationType {
  handleClose: (txHash: TransactionHash) => void;
  setLedgerDataError: (flag: string) => void;
}
export default function useDelegation({ handleClose, setLedgerDataError }: UseDelegationType) {
  const { dapp, delegationContract, account, networkConfig } = useContext();
  const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider, account);

  const sendTransaction = (transactionArguments: DelegationTransactionType) => {
    transactionArguments.chainId = networkConfig.chainId;
    delegation
      .sendTransaction(transactionArguments)
      .then(transaction => {
        handleClose(transaction.hash);
      })
      .catch(e => {
        if (e.statusCode in ledgerErrorCodes) {
          setLedgerDataError((ledgerErrorCodes as any)[e.statusCode].message);
        }
        if (e.message === 'HWApp not initialised, call init() first')
          setLedgerDataError('Your session has expired. Please login again');
        console.error(`${transactionArguments.type}`, e);
      });
  };

  return { sendTransaction };
}

export function useDelegationWallet() {
  const { dapp, delegationContract, account } = useContext();
  const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider, account);
  const sendTransactionWallet = (transactionArguments: DelegationTransactionType) => {
    delegation
      .sendTransaction(transactionArguments)
      .then()
      .catch(e => {
        console.error(`${transactionArguments.type}`, e);
      });
  };

  return { sendTransactionWallet };
}
