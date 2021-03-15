import { useDelegation } from 'helpers';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
import { useState } from 'react';
import SetPercentageFeeModal from './SetPercentageFeeModal';

const SetPercentageFeeAction = () => {
  const [showUpdateFeeModal, setShowUpdateFeeModal] = useState(false);
  const [ledgerDataError, setLedgerDataError] = useState('');
  const [waitingForLedger, setWaitingForLedger] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);
  const { sendTransaction } = useDelegation({
    handleClose: setShowUpdateFeeModal,
    setLedgerDataError,
    setWaitingForLedger,
    setSubmitPressed,
  });

  const nominateVal = (value: string) => {
    let perc = (parseFloat(value) * 100).toString(16);
    if (perc.length % 2 !== 0) {
      perc = '0' + perc;
    }
    return perc;
  };
  const handleUpdateFee = (value: string) => {
    let transactionArguments = new DelegationTransactionType(
      '0',
      'changeServiceFee',
      nominateVal(value)
    );

    sendTransaction(transactionArguments);
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
        waitingForLedger={waitingForLedger}
        submitPressed={submitPressed}
        ledgerError={ledgerDataError}
        handleClose={() => {
          setShowUpdateFeeModal(false);
        }}
        handleContinue={handleUpdateFee}
      />
    </div>
  );
};

export default SetPercentageFeeAction;
