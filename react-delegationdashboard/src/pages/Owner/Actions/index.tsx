import React from 'react';
import AddNodeAction from './AddNodeAction';
import SetPercentageFeeAction from './SetPercentageFeeAction';
import SetAutomaticActivationAction from './SetAutomaticActivationAction';
import UpdateDelegationCapAction from './UpdateDelegationCapAction';

const Actions = () => {
  return (
    <>
      <div className="stats w-100 mb-spacer">
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          <h4 className="mb-2">Delegation Manager</h4>
          <div className="d-flex flex-wrap">
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

export default Actions;
