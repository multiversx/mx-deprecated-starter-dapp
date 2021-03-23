import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDelegation } from 'helpers';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
import { TransactionHash } from '@elrondnetwork/erdjs/out';
import TransactionStatusModal from 'components/LedgerTransactionStatus';
import { useHistory } from 'react-router-dom';
import useInterval from 'helpers/useInterval';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';
export interface ClaimRewardsModalType {
  show: boolean;
  transactionArguments: DelegationTransactionType;
  handleClose: () => void;
}
const CheckYourLedgerModal = ({
  show,
  transactionArguments,
  handleClose,
}: ClaimRewardsModalType) => {
  const [spin, setSpin] = useState(false);
  const [delay] = useState(1000);
  const [ledgerError, setLedgerDataError] = useState('');
  const [showTransactionStatus, setShowTransactionStatus] = useState(false);
  const [txHash, setTxHash] = useState(new TransactionHash(''));
  const displayTransactionModal = (txHash: TransactionHash) => {
    setTxHash(txHash);
    handleClose();
    setShowTransactionStatus(true);
  };
  const history = useHistory();
  useInterval(
    () => {
      setSpin(currentSpin => !currentSpin);
    },
    ledgerError === '' ? delay : null
  );

  const handleCloseModal = () => {
    history.push('');
  };
  const { sendTransaction } = useDelegation({
    handleClose: displayTransactionModal,
    setLedgerDataError,
  });

  useEffect(() => {
    if (transactionArguments.type !== '') {
      sendTransaction(transactionArguments);
    }
  }, [transactionArguments]);
  return (
    <>
      <Modal
        show={show}
        onHide={handleCloseModal}
        className="modal-container"
        animation={false}
        centered
      >
        <div className="card">
          <div className="card-body p-spacer text-center">
            <div className="h6 mb-spacer" data-testid="transactionTitle">
              Ledger Flow
            </div>
            <div className="mb-spacer">
              <FontAwesomeIcon
                icon={faHourglass}
                className={`text-white ml-1 ${spin ? 'fa-spin' : ''}`}
              />
            </div>
            <div className="mb-spacer" data-testid="claimRewardsTitle">
              Check your Ledger
            </div>
            {ledgerError && (
              <p className="text-danger d-flex justify-content-center align-items-center">
                {ledgerError}
              </p>
            )}
            <button
              id="closeButton"
              className="btn btn-primary mx-2"
              onClick={handleCloseModal}
              disabled={ledgerError === ''}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
      <TransactionStatusModal show={showTransactionStatus} txHash={txHash} />
    </>
  );
};

export default CheckYourLedgerModal;
