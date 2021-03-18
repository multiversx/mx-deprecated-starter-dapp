import { useContext } from 'context';

interface DelegationContractActionButtonsType {
  ledgerError?: string;
  action: string;
  actionTitle: string;
  submitPressed: boolean;
  waitingForLedger: boolean;
  handleClose: () => void;
}

const DelegationContractActionButtons = ({
  ledgerError,
  action,
  actionTitle,
  submitPressed,
  waitingForLedger,
  handleClose,
}: DelegationContractActionButtonsType) => {
  const { ledgerAccount } = useContext();
  return (
    <>
      {ledgerError && (
        <p className="text-danger d-flex justify-content-center align-items-center">
          {ledgerError}
        </p>
      )}
      <div className="d-flex justify-content-center align-items-center flex-wrap">
        <button
          type="submit"
          className="btn btn-primary mx-2"
          id={`continue${action}`}
          data-testid={`continue${action}`}
          disabled={submitPressed}
        >
          {submitPressed ? (
            <>{ledgerAccount && 'Check your Ledger'}</>
          ) : (
            <>{ledgerAccount ? `${actionTitle} & Check your Ledger` : actionTitle}</>
          )}
        </button>
        <button id="closeButton" className="btn btn-link mx-2" onClick={handleClose}>
          Close
        </button>
      </div>
    </>
  );
};

export default DelegationContractActionButtons;
