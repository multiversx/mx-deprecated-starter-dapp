import { Formik } from 'formik';
import { Modal } from 'react-bootstrap';
import { useContext } from 'context';
import DelegationContractActionButtons from 'components/DelegationContractActionButtons';

interface DelegateModalType {
  show: boolean;
  waitingForLedger: boolean;
  submitPressed: boolean;
  ledgerError?: string;
  blsKey?: string;
  handleClose: () => void;
  handleContinue: () => void;
}

const NodeActionModal = ({
  show,
  waitingForLedger,
  submitPressed,
  ledgerError,
  blsKey,
  handleClose,
  handleContinue,
}: DelegateModalType) => {
  const { egldLabel } = useContext();

  return (
    <Modal show={show} onHide={handleClose} className="modal-container" animation={false} centered>
      <div className="card">
        <div className="card-body p-spacer text-center">
          <p className="h6 mb-spacer" data-testid="delegateTitle">
            Delegate now
          </p>
          ) : (
          <p className="mb-spacer">{`Select the amount of ${egldLabel} you want to delegate.`}</p>
          <Formik
            initialValues={{
              amount: blsKey,
            }}
            onSubmit={() => {
              handleContinue();
            }}
          >
            {props => {
              const { handleSubmit, values, handleBlur, handleChange, errors, touched } = props;

              return (
                <form onSubmit={handleSubmit} className="text-left">
                  <div className="form-group mb-spacer">
                    <label htmlFor="amount">blskey</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className={`form-control ${
                          errors.amount && touched.amount ? 'is-invalid' : ''
                        }`}
                        id="amount"
                        name="amount"
                        data-testid="amount"
                        required={true}
                        value={values.amount}
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  <DelegationContractActionButtons
                    ledgerError={ledgerError}
                    action="nodeAction"
                    actionTitle="Continue"
                    submitPressed={submitPressed}
                    waitingForLedger={waitingForLedger}
                    handleClose={handleClose}
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Modal>
  );
};

export default NodeActionModal;
