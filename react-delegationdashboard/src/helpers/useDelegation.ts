import { TransactionHash } from '@elrondnetwork/erdjs';
import { useContext } from 'context';
import { Delegation } from 'contracts';
import { DelegationTransactionType } from './contractDataDefinitions';
import { ledgerErrorCodes } from './ledgerErrorCodes';
export interface UseDelegationType {
  handleClose: (txHash: TransactionHash) => void;
  setError: (error: string) => void;
}
export default function useDelegation({
  handleClose,
  setError: setTransactionError,
}: UseDelegationType) {
  const { dapp, delegationContract, account, networkConfig } = useContext();
  const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider, account);

  const sendTransaction = (transactionArguments: DelegationTransactionType) => {
    transactionArguments.chainId = networkConfig.chainId;
    delegation
      .sendTransaction(transactionArguments)
      .then(transaction => {
        handleClose(transaction.getHash());
      })
      .catch(e => {
        if (e.statusCode in ledgerErrorCodes) {
          setTransactionError((ledgerErrorCodes as any)[e.statusCode].message);
        }
        if (e.message === 'HWApp not initialised, call init() first') {
          setTransactionError('Your session has expired. Please login again');
        }
        if (e.message === 'Failed or Rejected Request') {
          setTransactionError('Failed or Rejected Request. Please try again');
        }
        if (e.message === 'cancel') {
          setTransactionError('Transaction Cancelled');
        }

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
