import React, { useState } from 'react'
import { useContext } from '../../context';
import Delegation from '../../contracts/Delegation';
import UndelegateModal from '../UndelegateModal';

const UndelegateAction = () => {
  const { dapp, erdLabel } = useContext();
  const [showModal, setShowModal] = useState(
    false
  );

  const handleUndelegate = (value: string) => {
    const delegationContract = new Delegation(dapp.proxy, dapp.provider);
    delegationContract.sendUndelegate(value).then();
  }
  return (
    <div>
      <button onClick={() => setShowModal(true)} className="btn btn-primary mt-3">
        Undelegate
      </button>
      <UndelegateModal show={showModal} title = "Undelegate now" description={`Select the amount of ${erdLabel} you want to undelegate.`}
        handleClose={() => {
          setShowModal(false);
        }}
        handleContinue={(value) => handleUndelegate(value)} />
    </div>
  );
};

export default UndelegateAction;
