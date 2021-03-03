import React from 'react';
import { Modal } from 'react-bootstrap';
import ViewStatAction from 'components/ViewStatAction';
import { useDelegation } from 'helpers';
import { useContext } from 'context';
import BigNumber from 'bignumber.js';
export interface ClaimRewardsModalType {
  show: boolean;
  title: string;
  description: string;
  handleClose: () => void;
}
const ClaimRewardsModal = ({ show, title, description, handleClose }: ClaimRewardsModalType) => {
  const { delegation } = useDelegation();
  const { totalActiveStake, contractOverview } = useContext();
  const handleClaimRewards = () => {
    delegation
      .sendTransaction('0', 'claimRewards')
      .then()
      .catch(e => console.error('handleClaimRewards error', e));
  };

  const isRedelegateEnable = () => {
    const bnTotalActiveStake = new BigNumber(totalActiveStake);
    const bnMaxDelegationCap = new BigNumber(contractOverview.maxDelegationCap);
    if (
      bnTotalActiveStake.comparedTo(bnMaxDelegationCap) >= 0 &&
      contractOverview.reDelegationCap !== 'true'
    ) {
      return false;
    }
    return true;
  };

  const handleRedelegateRewards = () => {
    delegation
      .sendTransaction('0', 'reDelegateRewards')
      .then()
      .catch(e => console.error('handleRedelegateRewards error', e));
  };
  return (
    <Modal show={show} onHide={handleClose} className="modal-container" animation={false} centered>
      <div className="card">
        <div className="card-body p-spacer text-center">
          <p className="h6 mb-spacer" data-testid="delegateTitle">
            {title}
          </p>
          <p className="mb-spacer">{description}</p>
          <div className="d-flex justify-content-center align-items-center flex-wrap">
            <ViewStatAction
              actionTitle="Claim Rewards"
              handleContinue={handleClaimRewards}
              color="primary"
            />
            {isRedelegateEnable() && (
              <ViewStatAction
                actionTitle="Redelegate Rewards"
                handleContinue={handleRedelegateRewards}
                color="green"
              />
            )}
          </div>
          <button id="closeButton" className="btn btn-link mt-spacer mx-2" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ClaimRewardsModal;
