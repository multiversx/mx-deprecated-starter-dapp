import React from 'react';
import { Modal } from 'react-bootstrap';
import { ErrorMessage, Formik } from 'formik';

import { object, string } from 'yup';

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
      <div className="card card-small">
        <div className="card-body text-center p-spacer">
          <p className="h3" data-testid="baseActionModal">
            Change service fee
          </p>
          <p className="lead mb-spacer">Add the percentage fee (for example: 12.30)</p>

          <Formik
            initialValues={{
              amount: '',
            }}
            onSubmit={values => {
              handleContinue(values.amount);
            }}
            validationSchema={object().shape({
              amount: string()
                .required('Required')
                .test('number', 'String not allows, only numbers. For example (12.20)', value => {
                  const regex = /^(\d+(?:[\.]\d{1,2})?)$/;
                  return regex.test(value || '');
                }),
            })}
          >
            {props => {
              const { handleSubmit, values, handleBlur, handleChange } = props;

              return (
                <form onSubmit={handleSubmit} className="text-left">
                  <div className="form-group mb-spacer">
                    <div className="input-group input-group-seamless">
                      <input
                        type="text"
                        className="form-control"
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
                    <ErrorMessage name="amount" />
                  </div>
                  <div className="d-flex align-items-center flex-column mt-spacer">
                    <button
                      type="submit"
                      className="btn btn-primary px-spacer"
                      id="continueDelegate"
                      data-testid="continueUndelegate"
                    >
                      Continue
                    </button>
                    <button
                      id="closeButton"
                      className="btn btn-primary px-spacer mt-3"
                      onClick={handleClose}
                    >
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
