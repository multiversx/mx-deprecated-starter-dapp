import React from 'react'
interface BaseActionType {
    actionTitle: string;
    handleContinue: () => void
  }

const BaseAction  = ({ actionTitle, handleContinue }: BaseActionType) => {
  
   return (
    <div>
      <button onClick={() => handleContinue()} className="btn btn-primary mt-3">
        {actionTitle}
      </button>
    </div>
  );
};

export default BaseAction;
