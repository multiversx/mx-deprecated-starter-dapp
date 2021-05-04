import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDelegation } from 'helpers';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
import { TransactionHash } from '@elrondnetwork/erdjs';
import TransactionStatusModal from 'components/TransactionStatus';
import { useHistory } from 'react-router-dom';
import { useContext, useDispatch } from 'context';
export interface ConfirmTransactionModalType {
  show: boolean;
  transactionArguments: DelegationTransactionType;
  handleClose: () => void;
}
const ConfirmTransactionModal = ({
  show,
  transactionArguments,
  handleClose,
}: ConfirmTransactionModalType) => {
  const dispatch = useDispatch();
  const { egldLabel, delegationContract, dapp } = useContext();
  const [error, setError] = useState('');
  const [showTransactionStatus, setShowTransactionStatus] = useState(false);
  const [txHash, setTxHash] = useState(new TransactionHash(''));
  const closeTransactionModal = (txHash: TransactionHash) => {
    setTxHash(txHash);
    handleClose();
    setShowTransactionStatus(true);
  };
  const history = useHistory();

  const handleCloseModal = () => {
    setShowTransactionStatus(false);
    if (error === 'Your session has expired. Please login again') {
      dispatch({ type: 'logout', provider: dapp.provider });
    }
    history.push('');
  };
  const { sendTransaction } = useDelegation({
    handleClose: closeTransactionModal,
    setError: setError,
  });

  useEffect(
    () => {
      if (transactionArguments.type !== '') {
        sendTransaction(transactionArguments);
      }
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [transactionArguments]
  );
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
          <div className="card-body p-spacer ">
            <div className="h6 mb-spacer text-center" data-testid="transactionTitle">
              Confirm transaction on device
            </div>
            <div className="form-group" data-testid="transactionTitle">
              <span className="form-label">To: </span>
              {delegationContract}
            </div>
            <div className="form-group" data-testid="transactionTitle">
              <span className="form-label">Amount: </span>
              {transactionArguments.value} {egldLabel}
            </div>
            <div className="form-group">
              <span className="form-label">Data: </span>
              {transactionArguments.type}
              {`${transactionArguments.args !== '' ? '@' + transactionArguments.args : ''}`}
            </div>
            {error && (
              <p className="text-danger d-flex justify-content-center align-items-center">
                {error}
              </p>
            )}
            <div className="text-center">
              <button
                id="closeButton"
                className="btn btn-primary mx-2 "
                onClick={handleCloseModal}
                disabled={error === ''}
              >
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

export default ConfirmTransactionModal;
