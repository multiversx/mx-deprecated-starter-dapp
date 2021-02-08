import React from 'react';

import MyDelegation from './MyDelegation';
import UndelegatedListView from './PendingUndelegatedListView';

const Delegator = () => {
  return (
    <div className="delegator">
      <MyDelegation />
      <UndelegatedListView />
    </div>
  );
};

export default Delegator;
