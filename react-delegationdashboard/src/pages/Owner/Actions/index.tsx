import React from 'react';
import AddNodeAction from './AddNodeAction';
import SetPercentageFeeAction from './SetPercentageFeeAction';
import SetAutomaticActivationAction from './SetAutomaticActivationAction';
import UpdateDelegationCapAction from './UpdateDelegationCapAction';

const Actions = () => {
  return (
    <>
      <AddNodeAction />
      <SetPercentageFeeAction />
      <UpdateDelegationCapAction />
      <SetAutomaticActivationAction />
    </>
  );
};

export default Actions;
