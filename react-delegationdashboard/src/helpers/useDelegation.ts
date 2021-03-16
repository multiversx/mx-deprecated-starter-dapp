import { TransactionHash } from '@elrondnetwork/erdjs/out';
import { useContext } from 'context';
import { Delegation } from 'contracts';
import { DelegationTransactionType } from './contractDataDefinitions';
import { ledgerErrorCodes } from './ledgerErrorCodes';
export interface UseDelegationType {
  handleClose: (txHash: TransactionHash) => void;
  setWaitingForLedger: (flag: boolean) => void;
  setSubmitPressed: (flag: boolean) => void;
  setLedgerDataError: (flag: string) => void;
}
export default function useDelegation({
  handleClose,
  setWaitingForLedger,
  setSubmitPressed,
  setLedgerDataError,
}: UseDelegationType) {
  const { dapp, delegationContract, account, ledgerAccount, networkConfig } = useContext();
  const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider, account);

  const sendTransaction = (transactionArguments: DelegationTransactionType) => {
    transactionArguments.chainId = networkConfig.chainId;
    if (ledgerAccount) {
      setWaitingForLedger(true);
      setSubmitPressed(true);
    }
    delegation
      .sendTransaction(transactionArguments)
      .then(transaction => {
        setWaitingForLedger(false);
        handleClose(transaction.hash);
      })
      .catch(e => {
        if (e.statusCode in ledgerErrorCodes) {
          setLedgerDataError((ledgerErrorCodes as any)[e.statusCode].message);
        }
        setWaitingForLedger(false);
        setSubmitPressed(false);
        console.error(`${transactionArguments.type}`, e);
      });
  };

  return { sendTransaction };
}
