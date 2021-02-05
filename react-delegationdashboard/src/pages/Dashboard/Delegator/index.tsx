import React from 'react';
import MyActions from './MyActions';
import MyDelegation from './MyDelegation';
import UndelegatedListView from './PendingUndelegatedListView';

const Delegator = () => {
  return (
    <div className="row app-center-content">
      <MyDelegation />
      <UndelegatedListView />
      <MyActions />
    </div>
  );
};

export default Delegator;
