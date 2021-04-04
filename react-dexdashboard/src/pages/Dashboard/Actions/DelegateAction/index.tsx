import { useState } from 'react';
import { useContext } from 'context';
import DelegateModal from './DelegateModal';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
import ConfirmOnLedgerModal from 'components/ConfirmOnLedgerModal';
import { useDelegationWallet } from 'helpers/useDelegation';
import fetchGraphQL from '../../../../fetchGraphQL';
import {
  Transaction,
  GasLimit,
  GasPrice,
  Address,
  TransactionPayload,
} from '@elrondnetwork/erdjs';

const DelegateAction = () => {
  const { account, ledgerAccount, dapp } = useContext();
  const [showDelegateModal, setShowDelegateModal] = useState(false);
  const [showCheckYourLedgerModal, setShowCheckYourLedgerModal] = useState(false);
  const [transactionArguments, setTransactionArguments] = useState(
    new DelegationTransactionType('', '')
  );
  const { sendTransactionWallet } = useDelegationWallet();

  const handleDelegate = () => {
    console.log('Send Transaction');
    // const txArguments = new DelegationTransactionType(value, 'delegate');
    // sendTransactionWallet(txArguments);
    fetchGraphQL(`
      query {
        addLiquidity(
          address: "erd1qqqqqqqqqqqqqpgqx0xh8fgpr5kjh9n7s53m7qllw42m5t7u0n4suz39xc",
          amount0: 2000,
          amount1: 4000,
          amount0Min: 1990,
          amount1Min: 3990
        ) {
          nonce
          value
          receiver
          gasPrice
          gasLimit
          data
          chainID
          version
        }
      }
    `).then(response => {
      const data = response.data;
      data.addLiquidity.nonce = account?.nonce;
      let transaction = new Transaction({
        ...data.addLiquidity,
        data: TransactionPayload.fromEncoded(data.addLiquidity.data),
        receiver: new Address(data.addLiquidity.receiver),
        gasLimit: new GasLimit(data.addLiquidity.gasLimit),
        gasPrice: new GasPrice(data.addLiquidity.gasPrice),
      });
      console.log(transaction);

      dapp.provider.sendTransaction(transaction);
    }).catch(error => {
      console.error(error);
    });

  };

  return (
    <div>
      <button
        onClick={handleDelegate}
        className="btn btn-primary mb-3"
      >
        Send Transaction
      </button>
    </div>
  );
};

export default DelegateAction;
