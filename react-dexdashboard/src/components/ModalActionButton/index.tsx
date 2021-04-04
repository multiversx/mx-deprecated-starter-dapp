interface SubmitAndCloseButtonsType {
  action: string;
  actionTitle: string;
  isHandleActionDisabled?: boolean;
  handleClose: () => void;
}

const ModalActionButton = ({
  action,
  actionTitle,
  isHandleActionDisabled,
  handleClose,
}: SubmitAndCloseButtonsType) => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-wrap">
        <button
          type="submit"
          className="btn btn-primary mx-2"
          id={`continue${action}`}
          data-testid={`continue${action}`}
          disabled={isHandleActionDisabled}
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

export default ModalActionButton;
