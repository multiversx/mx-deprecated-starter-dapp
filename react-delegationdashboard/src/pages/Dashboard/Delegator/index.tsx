import React from 'react';
import MyActions from './MyActions';
import MyDelegation from './MyDelegation';
import UndelegatedListView from './PendingUndelegatedListView';

const Delegator = () => {
  return (
    <div className="delegator">
      <MyDelegation />
      <UndelegatedListView />
      <MyActions />
    </div>
  );
};

export default Delegator;
