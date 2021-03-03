import React from 'react';
import { ErrorMessage, Formik } from 'formik';
import BigNumber from 'bignumber.js';
import { object, string } from 'yup';
import { Modal } from 'react-bootstrap';
import { useContext } from 'context';
import Denominate from 'components/Denominate';
import { entireBalance } from 'helpers';
import { denomination, decimals } from 'config';
import denominate from 'components/Denominate/formatters';

interface DelegateModalType {
  show: boolean;
  balance: string;
  handleClose: () => void;
  handleContinue: (value: string) => void;
}

const DelegateModal = ({ show, balance, handleClose, handleContinue }: DelegateModalType) => {
  const { egldLabel, contractOverview, totalActiveStake } = useContext();

  const available = entireBalance({
    balance: balance,
    gasPrice: '12000000',
    gasLimit: '12000000',
    denomination,
    decimals,
  });

  const isFullDelegationCapContract = () => {
    const bnTotalActiveStake = new BigNumber(totalActiveStake);
    const bnMaxDelegationCap = new BigNumber(contractOverview.maxDelegationCap);
    return (
      bnTotalActiveStake.comparedTo(bnMaxDelegationCap) >= 0 &&
      contractOverview.maxDelegationCap !== String(0)
    );
  };

  return (
    <Modal show={show} onHide={handleClose} className="modal-container" animation={false} centered>
      <div className="card">
        <div className="card-body p-spacer text-center">
          <p className="h6 mb-spacer" data-testid="delegateTitle">
            Delegate now
          </p>
          {isFullDelegationCapContract() ? (
            <p className="mb-spacer">
              The maximum delegation cap was reached you can not delegate more
            </p>
          ) : (
            <p className="mb-spacer">{`Select the amount of ${egldLabel} you want to delegate.`}</p>
          )}
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
                .test('minimum', `Minimum 10 ${egldLabel}`, value => {
                  const bnAmount = new BigNumber(value !== undefined ? value : '');
                  return bnAmount.comparedTo(10) >= 0;
                })
                .test('maximum', `Maximum ${available} ${egldLabel}`, value => {
                  const bnAmount = new BigNumber(value !== undefined ? value : '');
                  const bnAvailable = new BigNumber(available);
                  return bnAmount.comparedTo(bnAvailable) <= 0;
                }),
            })}
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
                  {!isFullDelegationCapContract() && (
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
                          Available: <Denominate value={balance} />
                        </small>
                      )}
                    </div>
                  )}
                  <div className="d-flex justify-content-center align-items-center flex-wrap">
                    {!isFullDelegationCapContract() && (
                      <button
                        type="submit"
                        className="btn btn-primary mx-2"
                        id="continueDelegate"
                        data-testid="continueDelegate"
                      >
                        Continue
                      </button>
                    )}
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

export default DelegateModal;
