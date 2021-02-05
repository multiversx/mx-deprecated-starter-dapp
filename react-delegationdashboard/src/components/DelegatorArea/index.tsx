import React from 'react';
import DelegatorActionsContainer from '../DelegatorActionsContainer';
import DelegatorViews from '../DelegatorViews';
import UndelegatedListView from '../PendingUndelegatedListView';

const DelegatorArea = () => {
  return (
    <div className="app-center-content">
      <DelegatorViews />
      <UndelegatedListView />
      <DelegatorActionsContainer />
    </div>
  );
};

export default DelegatorArea;
