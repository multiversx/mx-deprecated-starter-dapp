import { useDelegation } from 'helpers';
import React, { useState } from 'react';
import AutomaticActivationModal from './AutomaticActivationModal';

const SetAutomaticActivationAction = () => {
  const { delegation } = useDelegation();
  const [showAutomaticActivationModal, setShowAutomaticActivationModal] = useState(false);

  const handleAutomaticActivation = (value: string) => {
    let activation = Buffer.from(value).toString('hex');
    delegation.sendTransaction('0', 'setAutomaticActivation', activation).then();
  };

  return (
    <div>
      <button
        onClick={() => setShowAutomaticActivationModal(true)}
        className="btn btn-primary mt-3"
      >
        Set Automatic Activation
      </button>
      <AutomaticActivationModal
        show={showAutomaticActivationModal}
        title="Automatic activation"
        description="Set automatic activation 'yes' or 'no'"
        handleClose={() => {
          setShowAutomaticActivationModal(false);
        }}
        handleContinue={handleAutomaticActivation}
      />
    </div>
  );
};

export default SetAutomaticActivationAction;
