import { useDelegation } from 'helpers';
import React, { useState } from 'react';
import { useContext } from 'context';
import { nominateValToHex } from 'helpers/nominate';
import UndelegateModal from './UndelegateModal';

interface UndelegateModalType {
  balance: string;
}

const UndelegateAction = ({balance}: UndelegateModalType) => {
  const { egldLabel } = useContext();
  const { delegation } = useDelegation();
  const [showModal, setShowModal] = useState(false);

  const handleUndelegate = (value: string) => {
    delegation.sendTransaction('0', 'unDelegate', nominateValToHex(value)).then();
  };
  return (
    <div>
      <button onClick={() => setShowModal(true)} className="btn btn-primary ml-3 mb-3">
        Undelegate
      </button>
      <UndelegateModal
        show={showModal}
        balance={balance}
        title="Undelegate now"
        description={`Select the amount of ${egldLabel} you want to undelegate.`}
        handleClose={() => {
          setShowModal(false);
        }}
        handleContinue={handleUndelegate}
      />
    </div>
  );
};

export default UndelegateAction;
