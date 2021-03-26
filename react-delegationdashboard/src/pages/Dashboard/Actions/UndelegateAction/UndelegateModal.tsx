import React from 'react';
import { Modal } from 'react-bootstrap';
import { useContext } from 'context';
import BigNumber from 'bignumber.js';
import { ErrorMessage, Formik } from 'formik';
import { entireBalance } from 'helpers';
import Denominate from 'components/Denominate';
import { denomination, decimals } from 'config';
import { object, string } from 'yup';
import { ActionModalType } from 'helpers/types';

const UndelegateModal = ({
  show,
  title,
  balance,
  description,
  handleClose,
  handleContinue,
}: ActionModalType) => {
  const { egldLabel } = useContext();

  const available = entireBalance({
    balance: balance as string,
    gasPrice: '0',
    gasLimit: '0',
    denomination,
    decimals,
  });

  const UndelegateSchema = object().shape({
    amount: string()
      .required('Required')
      .test('minimum', `Minimum 1 ${egldLabel}`, value => {
        const bnAmount = new BigNumber(value !== undefined ? value : '');
        return bnAmount.comparedTo(1) >= 0;
      })
      .test('dustLeft', `You can not keep under 1 ${egldLabel}. Use the Max option.`, value => {
        const bnAmount = new BigNumber(value !== undefined ? value : '');
        const bnAvailable = new BigNumber(available);
        return (
          bnAvailable.minus(bnAmount).comparedTo(1) >= 0 || bnAvailable.comparedTo(bnAmount) == 0
        );
      }),
  });
  return (
    <Modal show={show} onHide={handleClose} className="modal-container" animation={false} centered>
      <div className="card">
        <div className="card-body p-spacer text-center">
          <p className="h6 mb-spacer" data-testid="undelegateTitle">
            {title}
          </p>
          <p className="mb-spacer">{description}</p>
          <Formik
            initialValues={{
              amount: '1',
            }}
            onSubmit={values => {
              handleContinue(values.amount.toString());
            }}
            validationSchema={UndelegateSchema}
          >
            {props => {
              const {
                handleSubmit,
                values,
                handleBlur,
                handleChange,
                setFieldValue,
                errors,
                touched,
              } = props;

              const getEntireBalance = (e: React.MouseEvent) => {
                e.preventDefault();
                if (available !== undefined) {
                  setFieldValue('amount', available);
                }
              };

              return (
                <form onSubmit={handleSubmit} className="text-left">
                  <div className="form-group mb-spacer">
                    <label htmlFor="amount">Amount {egldLabel}</label>
                    <div className="input-group">
                      <input
                        type="number"
                        className={`form-control ${
                          errors.amount && touched.amount ? 'is-invalid' : ''
                        }`}
                        id="amount"
                        name="amount"
                        data-testid="amount"
                        min={1}
                        step={'any'}
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
                            className="input-group-text text-dark"
                            onClick={getEntireBalance}
                            data-testid="maxBtn"
                          >
                            Max
                          </a>
                        </span>
                      )}
                      <ErrorMessage component="div" name="amount" className="invalid-feedback" />
                    </div>
                    {!(errors.amount && touched.amount) && (
                      <small className="form-text">
                        Available: <Denominate value={balance as string} />
                      </small>
                    )}
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

export default UndelegateModal;
