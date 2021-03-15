import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ViewStatAction from 'components/ViewStatAction';
import { useDelegation } from 'helpers';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';

export interface AutomaticActivationModalType {
  show: boolean;
  title: string;
  description: string;
  value: string;
  handleClose: () => void;
}

const AutomaticActivationModal = ({
  show,
  title,
  description,
  value,
  handleClose,
}: AutomaticActivationModalType) => {
  const [ledgerError, setLedgerDataError] = useState('');
  const [waitingForLedger, setWaitingForLedger] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);
  const { sendTransaction } = useDelegation({
    handleClose: handleClose,
    setLedgerDataError,
    setWaitingForLedger,
    setSubmitPressed,
  });

  const handleAutomaticActivation = () => {
    let activation = Buffer.from(value === 'true' ? 'false' : 'true').toString('hex');
    let transactionArguments = new DelegationTransactionType(
      '0',
      'setAutomaticActivation',
      activation
    );
    sendTransaction(transactionArguments);
  };

  return (
    <Modal show={show} onHide={handleClose} className="modal-container" animation={false} centered>
      <div className="card">
        <div className="card-body p-spacer text-center">
          <p className="h6 mb-spacer" data-testid="delegateTitle">
            {title}
          </p>
          <p className="mb-spacer">{description}</p>
          <p className="lead mb-spacer">Currently is {value === 'true' ? 'ON' : 'OFF'}</p>
          {ledgerError && (
            <p className="text-danger d-flex justify-content-center align-items-center">
              {ledgerError}
            </p>
          )}
          <div className="d-flex justify-content-center align-items-center flex-wrap">
            <ViewStatAction
              actionTitle={`Turn ${value === 'true' ? 'OFF' : 'ON'}`}
              handleContinue={handleAutomaticActivation}
              waitingForLedger={waitingForLedger}
              submitPressed={submitPressed}
              color="primary"
            />
            <button id="closeButton" className="btn btn-link mx-2" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AutomaticActivationModal;
