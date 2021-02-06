import React from 'react';
import { ErrorMessage, Formik } from 'formik';
import BigNumber from 'bignumber.js';
import { object, string } from 'yup';
import { Modal } from 'react-bootstrap';
import { useContext } from 'context';
import Denominate from 'components/Denominate';
import { entireBalance } from 'helpers';

interface DelegateModalType {
  show: boolean;
  balance: string;
  handleClose: () => void;
  handleContinue: (value: string) => void;
}

const DelegateModal = ({ show, balance, handleClose, handleContinue }: DelegateModalType) => {
  const { erdLabel, denomination, decimals } = useContext();
  const available = entireBalance({
    balance: balance,
    gasPrice: '12000000',
    gasLimit: '12000000',
    denomination,
    decimals,
  });

  return (
    <Modal show={show} onHide={handleClose} className="modal-container" animation={false} centered>
      <div className="card card-small">
        <div className="card-body text-center p-spacer">
          <p className="h3" data-testid="delegateTitle">
            Delegate now
          </p>
          <p className="lead mb-spacer">{`Select the amount of ${erdLabel} you want to delegate.`}</p>

          <Formik
            initialValues={{
              amount: '10',
            }}
            onSubmit={values => {
              handleContinue(values.amount);
            }}
            validationSchema={object().shape({
              amount: string()
                .required('Required')
                .test('minimum', `Minimum 10 ${erdLabel}`, value => {
                  const bnAmount = new BigNumber(value !== undefined ? value : '');
                  return bnAmount.comparedTo(10) >= 0;
                })
                .test('number', 'String not allows, only numbers. For example (12.20)', value => {
                  const regex = /^(\d+(?:[\.]\d+)?)$/;
                  return regex.test(value || '');
                }),
            })}
          >
            {props => {
              const { handleSubmit, values, handleBlur, handleChange, setFieldValue } = props;

              const getEntireBalance = (e: React.MouseEvent) => {
                e.preventDefault();
                if (available !== undefined) {
                  setFieldValue('amount', available);
                }
              };
              return (
                <form onSubmit={handleSubmit} className="text-left">
                  <div className="form-group mb-spacer">
                    <label htmlFor="amount">Amount {erdLabel}</label>
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
                      {values.amount !== available && available !== '0' && (
                        <span className="input-group-append">
                          <a
                            href="/#"
                            className="input-group-text"
                            onClick={getEntireBalance}
                            data-testid="maxBtn"
                          >
                            Max
                          </a>
                        </span>
                      )}
                    </div>
                    <small className="form-text text-secondary mt-0">
                      Available: <Denominate value={balance} />
                    </small>
                    <ErrorMessage name="amount" />
                  </div>
                  <div className="d-flex justify-content-center align-items-center flex-wrap mt-spacer">
                    <button
                      type="submit"
                      className="btn btn-outline-primary mx-2"
                      id="continueDelegate"
                      data-testid="continueDelegate"
                    >
                      Continue
                    </button>
                    <button
                      id="closeButton"
                      className="btn btn-outline-primary mx-2"
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

export default DelegateModal;
