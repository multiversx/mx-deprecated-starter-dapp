import { useContext } from 'context';

interface ViewStatActionType {
  actionTitle: string;
  color: string;
  submitPressed: boolean;
  handleContinue: () => void;
}

const ViewStatAction = ({
  actionTitle,
  color,
  handleContinue,
  submitPressed,
}: ViewStatActionType) => {
  const { ledgerAccount } = useContext();
  return (
    <div>
      <button
        onClick={() => {
          handleContinue();
        }}
        className={`btn btn-${color} mx-2`}
        disabled={submitPressed}
      >
        {submitPressed ? (
          <>{ledgerAccount && 'Check your Ledger'}</>
        ) : (
          <>{ledgerAccount ? `${actionTitle} & Check your Ledger` : actionTitle}</>
        )}
      </button>
    </div>
  );
};

export default ViewStatAction;
