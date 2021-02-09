import React from 'react';
import { Modal } from 'react-bootstrap';
import ViewStatAction from 'components/ViewStatAction';
import { useDelegation } from 'helpers';
export interface ClaimRewardsModalType {
  show: boolean;
  title: string;
  description: string;
  handleClose: () => void;
}
const ClaimRewardsModal = ({ show, title, description, handleClose }: ClaimRewardsModalType) => {
  const { delegation } = useDelegation();
  const handleClaimRewards = () => {
    delegation
      .sendTransaction('0', 'claimRewards')
      .then()
      .catch(e => console.error('handleClaimRewards error', e));
  };

  const handleRedelegateRewards = () => {
    delegation
      .sendTransaction('0', 'reDelegateRewards')
      .then()
      .catch(e => console.error('handleRedelegateRewards error', e));
  };
  return (
    <Modal show={show} onHide={handleClose} className="modal-container" animation={false} centered>
      <div className="card card-small">
        <div className="card-body text-center p-spacer">
          <p className="h3" data-testid="delegateTitle">
            {title}
          </p>
          <p className="lead">{description}</p>
          <div className="d-flex justify-content-center align-items-center flex-wrap mt-3">
            <ViewStatAction
              actionTitle="Claim Rewards"
              handleContinue={handleClaimRewards}
              color="primary"
            />
            <ViewStatAction
              actionTitle="Redelegate Rewards"
              handleContinue={handleRedelegateRewards}
              color="green"
            />
            <button id="closeButton" className="btn btn-link mt-3 mx-2" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ClaimRewardsModal;
