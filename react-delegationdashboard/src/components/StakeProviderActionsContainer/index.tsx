import React from 'react';
import AddNodeAction from './AddNodeAction';
import SetPercentageFeeAction from './SetPercentageFeeAction';
import SetAutomaticActivationAction from './SetAutomaticActivationAction';
import UpdateDelegationCapAction from './UpdateDelegationCapAction';

const StakeProviderActionsContainer = () => {
  return (
    <>
      <div className="stats mb-spacer w-100">
        <div className="card card-small">
          <div className="card-header border-bottom">
            <h6 className="m-0">{'Actions'}</h6>
          </div>
          <div className="card-body d-flex flex-wrap justify-content-around p-3 sp-action-btn">
            <SetPercentageFeeAction />
            <AddNodeAction />
            <UpdateDelegationCapAction />
            <SetAutomaticActivationAction />
          </div>
        </div>
      </div>
    </>
  );
};

export default StakeProviderActionsContainer;
