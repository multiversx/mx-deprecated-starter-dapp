interface BaseActionType {
    actionTitle: string;
    handleContinue: () => void;
  }

const ViewStatAction  = ({ actionTitle, handleContinue }: BaseActionType) => {
  
   return (
    <>
      <button onClick={() => handleContinue()} className="btn btn-primary mt-3">
        {actionTitle}
      </button>
    </>
  );
};

export default ViewStatAction;
