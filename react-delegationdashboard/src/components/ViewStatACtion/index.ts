Merge pull request #63 from ElrondNetwork/Fix-ledger-login
2be9702
Fix ledger flow
interface ViewStatActionType {
  actionTitle: string;
  color: string;
  handleContinue: () => void;
}
const ViewStatAction = ({ actionTitle, color, handleContinue }: ViewStatActionType) => {
  return (
    <div>
      <button
        onClick={() => {
          handleContinue();
        }}
        className={`btn btn-${color} mx-2`}
      >
        {actionTitle}
      </button>
    </div>
  );
};
export default ViewStatAction;
