import React, { useState } from 'react';
import AutomaticActivationModal from './AutomaticActivationModal';

const SetAutomaticActivationAction = ({ automaticFlag }: { automaticFlag: string }) => {
  const [showAutomaticActivationModal, setShowAutomaticActivationModal] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowAutomaticActivationModal(true)}
        className="btn btn-primary mt-2"
      >
        Automatic activation
      </button>
      <AutomaticActivationModal
        show={showAutomaticActivationModal}
        title="Automatic activation"
        description="Set automatic activation"
        handleClose={() => {
          setShowAutomaticActivationModal(false);
        }}
        value={automaticFlag}
      />
    </div>
  );
};

export default SetAutomaticActivationAction;
