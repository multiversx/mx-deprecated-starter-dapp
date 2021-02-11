import React, { useState } from 'react';
import AutomaticActivationModal from './AutomaticActivationModal';

const AutomaticActivationAction = ({ automaticFlag }: { automaticFlag: string }) => {
  const [showAutomaticActivationModal, setShowAutomaticActivationModal] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowAutomaticActivationModal(true)}
        className="btn btn-white btn-sm text-green opacity-5 mr-n1"
      >
        Change
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

export default AutomaticActivationAction;
