import React from 'react';
import { Modal } from 'react-bootstrap';
import { ErrorMessage, Formik } from 'formik';
import { object, string } from 'yup';

const SetPercentageFeeSchema = object().shape({
  amount: string()
    .required('Required')
    .test('minimum', 'Minimum fee percentage is 0.01', value => {
      const feeAmount = parseFloat(value !== undefined ? value : '');
      return feeAmount > 0;
    })
    .test('minimum', 'Maximum fee percentage is 100', value => {
      const feeAmount = parseFloat(value !== undefined ? value : '');
      return feeAmount <= 100;
    }),
});

interface SetPercentageFeeModalType {
  show: boolean;
  handleClose: () => void;
  handleContinue: (value: string) => void;
}

const SetPercentageFeeModal = ({
  show,
  handleClose,
  handleContinue,
}: SetPercentageFeeModalType) => {
  return (
    <Modal show={show} onHide={handleClose} className="modal-container" animation={false} centered>
      <div className="card">
        <div className="card-body text-center p-spacer">
          <p className="h6 mb-spacer" data-testid="baseActionModal">
            Change service fee
          </p>
          <p className="mb-spacer">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
          <Formik
            initialValues={{
              amount: '',
            }}
            onSubmit={values => {
              handleContinue(values.amount);
            }}
            validationSchema={SetPercentageFeeSchema}
          >
            {props => {
              const { handleSubmit, values, handleBlur, handleChange, errors, touched } = props;

              return (
                <form onSubmit={handleSubmit} className="text-left">
                  <div className="form-group mb-spacer mb-0">
                    <label htmlFor="amount">Add the percentage fee</label>
                    <input
                      type="number"
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
                    {!(errors.amount && touched.amount) && (
                      <small className="form-text">For example: 12.30</small>
                    )}
                    <ErrorMessage component="div" name="amount" className="invalid-feedback" />
                  </div>
                  <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <button
                      type="submit"
                      className="btn btn-primary mx-2"
                      id="continueDelegate"
                      data-testid="continueUndelegate"
                    >
                      Continue
                    </button>
                    <button id="closeButton" className="btn btn-link mx-2" onClick={handleClose}>
                      Close
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Modal>
  );
};

export default SetPercentageFeeModal;
