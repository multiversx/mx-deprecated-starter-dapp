interface ContinueAndCloseButtonsType {
  actionTitle: string;
  color: string;
  handleContinue: () => void;
  handleClose: () => void;
}

const ContinueAndCloseButtons = ({
  actionTitle,
  color,
  handleContinue,
  handleClose,
}: ContinueAndCloseButtonsType) => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-wrap">
      <button
        onClick={() => {
          handleContinue();
        }}
        className={`btn btn-${color} mx-2`}
      >
        {actionTitle}
      </button>
      <button id="closeButton" className="btn btn-link mx-2" onClick={handleClose}>
        Close
      </button>
    </div>
  );
};

export default ContinueAndCloseButtons;
