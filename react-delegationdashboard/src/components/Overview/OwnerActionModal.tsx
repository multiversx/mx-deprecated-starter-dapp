import { Modal } from 'react-bootstrap';
import ViewStatAction from 'components/ViewStatAction';
import { TransactionHash } from '@elrondnetwork/erdjs/out';
import TransactionStatusModal from 'components/LedgerTransactionStatus';

export interface OwnerActionModalType {
  show: boolean;
  title: string;
  actionTitle: string;
  description: string;
  extraDescription?: string;
  value: string;
  ledgerError: string;
  txHash: TransactionHash;
  showTransactionStatus: boolean;
  submitPressed: boolean;
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
  ledgerError,
  txHash,
  showTransactionStatus,
  submitPressed,
  handleClose,
  handleContinue,
}: OwnerActionModalType) => {
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

            {ledgerError && (
              <p className="text-danger d-flex justify-content-center align-items-center">
                {ledgerError}
              </p>
            )}
            <div className="d-flex justify-content-center align-items-center flex-wrap">
              <ViewStatAction
                actionTitle={actionTitle}
                handleContinue={handleContinue}
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
      <TransactionStatusModal show={showTransactionStatus} txHash={txHash} />
    </>
  );
};

export default OwnerActionModal;
