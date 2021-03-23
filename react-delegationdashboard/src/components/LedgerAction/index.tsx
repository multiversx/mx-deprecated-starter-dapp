import { TransactionHash } from '@elrondnetwork/erdjs/out';
import TransactionStatusModal from 'components/LedgerTransactionStatus';
import ViewStatAction from 'components/ViewStatAction';
import { useDelegation } from 'helpers';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
export interface LedgerValidationTransactionType {
  show: boolean;
  title: string;
  action: string;
  argumentsTx: DelegationTransactionType;
  handleCloseModal: () => void;
}
const LedgerValidationTransaction = ({
  show,
  title,
  action,
  argumentsTx,
  handleCloseModal,
}: LedgerValidationTransactionType) => {
  const [, setShowModal] = useState(show);
  const [ledgerError, setLedgerDataError] = useState('');
  const [submitPressed, setSubmitPressed] = useState(false);
  const [showTransactionStatus, setShowTransactionStatus] = useState(false);
  const [txHash, setTxHash] = useState(new TransactionHash(''));
  const displayTransactionModal = (txHash: TransactionHash) => {
    setTxHash(txHash);
    setShowModal(false);
    handleCloseModal();
    setShowTransactionStatus(true);
  };
  const { sendTransaction } = useDelegation({
    handleClose: displayTransactionModal,
    setLedgerDataError,
  });

  const handleContinue = () => {
    setSubmitPressed(true);
    sendTransaction(argumentsTx);
  };
  const history = useHistory();

  const handleClose = () => {
    history.push('');
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className="modal-container"
        animation={false}
        centered
      >
        <div className="card">
          <div className="card-body p-spacer text-center">
            <div className="h6 mb-spacer" data-testid="transactionTitle">
              {title.charAt(0).toUpperCase() + title.slice(1)} Node
            </div>

            {argumentsTx.value && argumentsTx.value !== '0' && (
              <div className="mb-spacer" data-testid="transactionTitle">
                {argumentsTx.value}
              </div>
            )}
            {argumentsTx.args !== '' && (
              <div className="mb-spacer">
                {argumentsTx.type}@{argumentsTx.args}
              </div>
            )}
            {ledgerError && (
              <p className="text-danger d-flex justify-content-center align-items-center">
                {ledgerError}
              </p>
            )}
            <div className="d-flex justify-content-center align-items-center flex-wrap">
              <ViewStatAction
                actionTitle={action}
                handleContinue={handleContinue}
                color="primary"
              />
              <button id="closeButton" className="btn btn-link mx-2" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <TransactionStatusModal show={showTransactionStatus} txHash={txHash} />
    </>
  );
};

export default LedgerValidationTransaction;
