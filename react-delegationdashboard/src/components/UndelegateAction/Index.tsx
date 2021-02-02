import React, { useState } from 'react';
import { useContext } from '../../context';
import Delegation from '../../contracts/Delegation';
import { nominateValToHex } from '../../helpers/nominate';
import UndelegateModal from '../UndelegateModal';

const UndelegateAction = () => {
  const { dapp, erdLabel, delegationContract } = useContext();
  const [showModal, setShowModal] = useState(
    false
  );

  const handleUndelegate = (value: string) => {
    const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider);
    delegation.sendTransaction('0', 'unDelegate', nominateValToHex(value)).then();
  };
  return (
    <div>
      <button onClick={() => setShowModal(true)} className="btn btn-primary mt-3">
        Undelegate
      </button>
      <UndelegateModal show={showModal} title="Undelegate now" description={`Select the amount of ${erdLabel} you want to undelegate.`}
        handleClose={() => {
          setShowModal(false);
        }}
        handleContinue={(value) => handleUndelegate(value)} />
    </div>
  );
};

export default UndelegateAction;
