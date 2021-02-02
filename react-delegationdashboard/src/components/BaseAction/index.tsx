import React from 'react';
interface BaseActionType {
    actionTitle: string;
    handleContinue: () => void;
  }

const BaseAction  = ({ actionTitle, handleContinue }: BaseActionType) => {
  
   return (
    <>
      <button onClick={() => handleContinue()} className="btn btn-primary mt-3">
        {actionTitle}
      </button>
    </>
  );
};

export default BaseAction;
