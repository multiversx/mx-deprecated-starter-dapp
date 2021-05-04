import ConfirmTransactionModal from 'components/ConfirmTransactionModal';
import { useContext } from 'context';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
import { useDelegationWallet } from 'helpers/useDelegation';
import React, { useState } from 'react';
import SetPercentageFeeModal from './SetPercentageFeeModal';

const SetPercentageFeeAction = () => {
  const { ledgerAccount, walletConnectAccount } = useContext();

  const [showUpdateFeeModal, setShowUpdateFeeModal] = useState(false);
  const [showCheckYourLedgerModal, setShowCheckYourLedgerModal] = useState(false);
  const [transactionArguments, setTransactionArguments] = useState(
    new DelegationTransactionType('', '')
  );
  const { sendTransactionWallet } = useDelegationWallet();

  const nominateVal = (value: string) => {
    let perc = (parseFloat(value) * 100).toString(16);
    if (perc.length % 2 !== 0) {
      perc = '0' + perc;
    }
    return perc;
  };
  const handleUpdateFee = (value: string) => {
    let txArguments = new DelegationTransactionType('0', 'changeServiceFee', nominateVal(value));
    if (ledgerAccount || walletConnectAccount) {
      setShowUpdateFeeModal(false);
      setTransactionArguments(txArguments);
      setShowCheckYourLedgerModal(true);
    } else {
      sendTransactionWallet(txArguments);
    }
  };
  return (
    <div>
      <button
        onClick={() => setShowUpdateFeeModal(true)}
        className="btn btn-primary text-white btn-sm mr-n1"
      >
        Change
      </button>
      <SetPercentageFeeModal
        show={showUpdateFeeModal}
        handleClose={() => {
          setShowUpdateFeeModal(false);
        }}
        handleContinue={handleUpdateFee}
      />
      <ConfirmTransactionModal
        show={showCheckYourLedgerModal}
        transactionArguments={transactionArguments}
        handleClose={() => {
          setShowCheckYourLedgerModal(false);
        }}
      />
    </div>
  );
};

export default SetPercentageFeeAction;
