import { useContext } from 'context';

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
