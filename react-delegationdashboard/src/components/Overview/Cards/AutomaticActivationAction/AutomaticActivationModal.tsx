import React from 'react';
import { Modal } from 'react-bootstrap';
import ViewStatAction from 'components/ViewStatAction';
import { useDelegation } from 'helpers';

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
  const { delegation } = useDelegation();
  const handleAutomaticActivation = () => {
    let activation = Buffer.from(value).toString('hex');
    delegation.sendTransaction('0', 'setAutomaticActivation', activation).then();
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
          <div className="d-flex justify-content-center align-items-center flex-wrap">
            <ViewStatAction
              actionTitle={`Turn ${value === 'true' ? 'OFF' : 'ON'}`}
              handleContinue={handleAutomaticActivation}
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
