import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ViewStatAction from 'components/ViewStatAction';
import { useDelegation } from 'helpers';
import { useContext } from 'context';
import { ledgerErrorCodes } from 'helpers/ledgerErrorCodes';

export interface ReDelegateCapActivationModalType {
  show: boolean;
  title: string;
  description: string;
  value: string;
  handleClose: () => void;
}

const ReDelegateCapActivationModal = ({
  show,
  title,
  description,
  value,
  handleClose,
}: ReDelegateCapActivationModalType) => {
  const { delegation } = useDelegation();
  const { ledgerAccount } = useContext();
  const [ledgerError, setLedgerDataError] = useState('');
  const [waitingForLedger, setWaitingForLedger] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);

  const handleReDelegationCapActivation = () => {
    if (ledgerAccount) {
      setWaitingForLedger(true);
      setSubmitPressed(true);
    }
    let redelegateRewardsActivation = Buffer.from(value === 'true' ? 'false' : 'true').toString(
      'hex'
    );
    delegation
      .sendTransaction('0', 'setReDelegateCapActivation', redelegateRewardsActivation)
      .then(() => {
        setWaitingForLedger(false);
        handleClose();
      })
      .catch(e => {
        if (e.statusCode in ledgerErrorCodes) {
          setLedgerDataError((ledgerErrorCodes as any)[e.statusCode].message);
        }
        setWaitingForLedger(false);
        setSubmitPressed(false);
        console.error('handleUpdateDelegationCap ', e);
      });
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
              handleContinue={handleReDelegationCapActivation}
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

export default ReDelegateCapActivationModal;
