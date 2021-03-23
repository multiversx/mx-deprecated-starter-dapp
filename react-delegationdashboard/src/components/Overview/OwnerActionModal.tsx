import { Modal } from 'react-bootstrap';
import ContinueAndCloseButtons from 'components/ContinueAndCloseButtons';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
import { useState } from 'react';
import CheckYourLedgerModal from 'components/CheckYourLedgerModal';

export interface OwnerActionModalType {
  show: boolean;
  title: string;
  actionTitle: string;
  description: string;
  extraDescription?: string;
  value: string;
  handleClose: () => void;
  handleContinue: () => void;
}

const OwnerActionModal = ({
  show,
  title,
  actionTitle,
  description,
  extraDescription,
  value,
  handleClose,
  handleContinue,
}: OwnerActionModalType) => {
  const [showCheckYourLedgerModal, setShowCheckYourLedgerModal] = useState(false);
  const [transactionArguments, setTransactionArguments] = useState(
    new DelegationTransactionType('', '')
  );
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
            <p className="h6 mb-spacer" data-testid="delegateTitle">
              {title}
            </p>
            {description && <p className="mb-spacer">{description}</p>}
            {extraDescription && <p className="lead mb-spacer">{extraDescription}</p>}
            <ContinueAndCloseButtons
              actionTitle={actionTitle}
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

export default OwnerActionModal;
