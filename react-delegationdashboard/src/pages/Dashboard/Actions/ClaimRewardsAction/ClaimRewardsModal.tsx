import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ViewStatAction from 'components/ViewStatAction';
import { useDelegation } from 'helpers';
import { useContext } from 'context';
import BigNumber from 'bignumber.js';
import { ledgerErrorCodes } from 'helpers/ledgerErrorCodes';
export interface ClaimRewardsModalType {
  show: boolean;
  title: string;
  description: string;
  handleClose: () => void;
}
const ClaimRewardsModal = ({ show, title, description, handleClose }: ClaimRewardsModalType) => {
  const { delegation } = useDelegation();
  const { totalActiveStake, contractOverview, ledgerAccount } = useContext();
  const [ledgerError, setLedgerDataError] = useState('');
  const [waitingForLedger, setWaitingForLedger] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);
  const handleClaimRewards = () => {
    if (ledgerAccount) {
      setWaitingForLedger(true);
      setSubmitPressed(true);
    }
    delegation
      .sendTransaction('0', 'claimRewards')
      .then(() => {
        setWaitingForLedger(false);
      })
      .catch(e => {
        if (e.statusCode in ledgerErrorCodes) {
          setLedgerDataError((ledgerErrorCodes as any)[e.statusCode].message);
        }
        setWaitingForLedger(false);
        setSubmitPressed(false);
        console.error('handleClaimRewards ', e);
      });
  };

  const isRedelegateEnable = () => {
    const bnTotalActiveStake = new BigNumber(totalActiveStake);
    const bnMaxDelegationCap = new BigNumber(contractOverview.maxDelegationCap);
    if (
      bnTotalActiveStake.comparedTo(bnMaxDelegationCap) >= 0 &&
      contractOverview.reDelegationCap === 'true'
    ) {
      return false;
    }
    return true;
  };

  const handleRedelegateRewards = () => {
    if (ledgerAccount) {
      setWaitingForLedger(true);
      setSubmitPressed(true);
    }
    delegation
      .sendTransaction('0', 'reDelegateRewards')
      .then(() => {
        setWaitingForLedger(false);
      })
      .catch(e => {
        if (e.statusCode in ledgerErrorCodes) {
          setLedgerDataError((ledgerErrorCodes as any)[e.statusCode].message);
        }
        setWaitingForLedger(false);
        setSubmitPressed(false);
        console.error('handleRedelegateRewards ', e);
      });
  };
  return (
    <Modal show={show} onHide={handleClose} className="modal-container" animation={false} centered>
      <div className="card">
        <div className="card-body p-spacer text-center">
          <p className="h6 mb-spacer" data-testid="claimRewardsTitle">
            {title}
          </p>
          <p className="mb-spacer">{description}</p>
          {ledgerError && (
            <p className="text-danger d-flex justify-content-center align-items-center">
              {ledgerError}
            </p>
          )}
          <div className="d-flex justify-content-center align-items-center flex-wrap">
            <ViewStatAction
              actionTitle="Claim Rewards"
              handleContinue={handleClaimRewards}
              waitingForLedger={waitingForLedger}
              submitPressed={submitPressed}
              color="primary"
            />
            {isRedelegateEnable() && (
              <ViewStatAction
                actionTitle="Redelegate Rewards"
                handleContinue={handleRedelegateRewards}
                waitingForLedger={waitingForLedger}
                submitPressed={submitPressed}
                color="primary"
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
