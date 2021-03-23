import { Modal } from 'react-bootstrap';
import ViewStatAction from 'components/ViewStatAction';
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

            <div className="d-flex justify-content-center align-items-center flex-wrap">
              <ViewStatAction
                actionTitle={actionTitle}
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
