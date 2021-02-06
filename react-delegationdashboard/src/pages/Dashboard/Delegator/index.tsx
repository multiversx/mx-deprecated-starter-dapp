import React from 'react';
import MyActions from './MyActions';
import MyDelegation from './MyDelegation';
import UndelegatedListView from './PendingUndelegatedListView';

const Delegator = () => {
  return (
    <div className="delegator">
      <MyActions />
      <MyDelegation />
      <UndelegatedListView />
    </div>
  );
};

export default Delegator;
