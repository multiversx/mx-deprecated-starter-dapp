import { useContext } from 'context';
import { Delegation } from 'contracts';
import { DelegationTransactionType } from './contractDataDefinitions';
import { ledgerErrorCodes } from './ledgerErrorCodes';
export interface UseDelegationType {
  handleClose: (flag: boolean) => void;
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
  const { dapp, delegationContract, account, ledgerAccount } = useContext();
  const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider, account);

  const sendTransaction = (transactionArguments: DelegationTransactionType) => {
    debugger;
    if (ledgerAccount) {
      setWaitingForLedger(true);
      setSubmitPressed(true);
    }
    delegation
      .sendTransaction(transactionArguments)
      .then(() => {
        setWaitingForLedger(false);
        handleClose(true);
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
