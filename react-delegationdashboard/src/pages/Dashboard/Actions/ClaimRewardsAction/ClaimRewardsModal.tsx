import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useContext } from 'context';
import BigNumber from 'bignumber.js';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
import { useDelegationWallet } from 'helpers/useDelegation';
import ConfirmOnLedgerModal from 'components/ConfirmOnLedgerModal';
export interface ClaimRewardsModalType {
  show: boolean;
  title: string;
  description: string;
  handleClose: () => void;
}
const ClaimRewardsModal = ({ show, title, description, handleClose }: ClaimRewardsModalType) => {
  const { totalActiveStake, contractOverview, ledgerAccount } = useContext();
  const [showCheckYourLedgerModal, setShowCheckYourLedgerModal] = useState(false);
  const [transactionArguments, setTransactionArguments] = useState(
    new DelegationTransactionType('', '')
  );
  const { sendTransactionWallet } = useDelegationWallet();

  const handleClaimRewards = (): void => {
    let txArguments = new DelegationTransactionType('0', 'claimRewards');
    if (ledgerAccount) {
      handleClose();
      setTransactionArguments(txArguments);
      setShowCheckYourLedgerModal(true);
    } else {
      sendTransactionWallet(txArguments);
    }
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
    let txArguments = new DelegationTransactionType('0', 'reDelegateRewards');
    if (ledgerAccount) {
      handleClose();
      setTransactionArguments(txArguments);
      setShowCheckYourLedgerModal(true);
    } else {
      sendTransactionWallet(txArguments);
    }
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
            <p className="h6 mb-spacer" data-testid="claimRewardsTitle">
              {title}
            </p>
            <p className="mb-spacer">{description}</p>
            <div className="d-flex justify-content-center align-items-center flex-wrap">
              <button
                className="btn btn-primary mx-2"
                onClick={() => {
                  handleClaimRewards();
                }}
              >
                Claim Rewards
              </button>
              {isRedelegateEnable() && (
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => {
                    handleRedelegateRewards();
                  }}
                >
                  Redelegate Rewards
                </button>
              )}
            </div>
            <button id="closeButton" className="btn btn-link mt-spacer mx-2" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </Modal>
      <ConfirmOnLedgerModal
        show={showCheckYourLedgerModal}
        transactionArguments={transactionArguments}
        handleClose={() => {
          setShowCheckYourLedgerModal(false);
        }}
      />
    </>
  );
};

export default ClaimRewardsModal;
