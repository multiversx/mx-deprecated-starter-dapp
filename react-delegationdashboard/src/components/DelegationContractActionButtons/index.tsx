import { useContext } from 'context';

interface DelegationContractActionButtonsType {
  action: string;
  actionTitle: string;
  handleClose: () => void;
}

const DelegationContractActionButtons = ({
  action,
  actionTitle,
  handleClose,
}: DelegationContractActionButtonsType) => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-wrap">
        <button
          type="submit"
          className="btn btn-primary mx-2"
          id={`continue${action}`}
          data-testid={`continue${action}`}
        >
          {actionTitle}
        </button>
        <button id="closeButton" className="btn btn-link mx-2" onClick={handleClose}>
          Close
        </button>
      </div>
    </>
  );
};

export default DelegationContractActionButtons;
