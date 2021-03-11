import { useContext } from 'context';

interface ViewStatActionType {
  actionTitle: string;
  color: string;
  submitPressed: boolean;
  waitingForLedger: boolean;
  handleContinue: () => void;
}

const ViewStatAction = ({
  actionTitle,
  color,
  handleContinue,
  submitPressed,
  waitingForLedger,
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
          <>{ledgerAccount && waitingForLedger ? 'Check your Ledger' : 'Sending...'}</>
        ) : (
          <>{ledgerAccount ? `${actionTitle} & Check your Ledger` : actionTitle}</>
        )}
      </button>
    </div>
  );
};

export default ViewStatAction;
