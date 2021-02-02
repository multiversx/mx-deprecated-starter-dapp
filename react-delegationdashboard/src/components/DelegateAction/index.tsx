import React, { useState } from 'react';
import { useContext } from '../../context';

import DelegateModal from '../DelegateModal';
import Delegation from '../../contracts/Delegation';

const DelegateAction = () => {
  const { dapp, erdLabel, delegationContract } = useContext();
  const [showDelegateModal, setShowDelegateModal] = useState(
    false
  );

  const handleDelegate = (value: string) => {
    const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider);
    delegation.sendTransaction(value, 'delegate').then();
  };
  return (
    <div>
      <button onClick={() => setShowDelegateModal(true)} className="btn btn-primary mt-3">
        Delegate
      </button>
      <DelegateModal show={showDelegateModal} title="Delegate now" description={`Select the amount of ${erdLabel} you want to delegate.`}
        handleClose={() => {
          setShowDelegateModal(false);
        }} handleContinue={(value) => handleDelegate(value)} />
    </div>
  );
};

export default DelegateAction;
