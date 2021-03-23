import ContinueAndCloseButtons from 'components/ContinueAndCloseButtons';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import CheckYourLedgerModal from 'components/CheckYourLedgerModal';
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
  const [showCheckYourLedgerModal, setShowCheckYourLedgerModal] = useState(false);
  const [transactionArguments, setTransactionArguments] = useState(argumentsTx);

  const handleContinue = () => {
    handleCloseModal();
    setTransactionArguments(argumentsTx);
    setShowCheckYourLedgerModal(true);
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
              {title.charAt(0).toUpperCase() + title.slice(1)}
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
            <ContinueAndCloseButtons
              actionTitle={action}
              handleContinue={handleContinue}
              handleClose={handleClose}
              color="primary"
            />
          </div>
        </div>
      </Modal>
      <CheckYourLedgerModal
        show={showCheckYourLedgerModal}
        transactionArguments={transactionArguments}
        handleClose={() => {
          setShowCheckYourLedgerModal(false);
        }}
      />
    </>
  );
};

export default LedgerValidationTransaction;
