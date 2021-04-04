import React, { useState } from 'react';
import { ErrorMessage, Formik } from 'formik';
import BigNumber from 'bignumber.js';
import { object, string } from 'yup';
import { Modal } from 'react-bootstrap';
import { useContext } from 'context';
import Denominate from 'components/Denominate';
import { entireBalance } from 'helpers';
import { denomination, decimals } from 'config';
import denominate from 'components/Denominate/formatters';
import ModalActionButton from 'components/ModalActionButton';

interface DelegateModalType {
  show: boolean;
  balance: string;
  handleClose: () => void;
  handleContinue: (value: string) => void;
}

const DelegateModal = ({ show, balance, handleClose, handleContinue }: DelegateModalType) => {
  const { egldLabel, contractOverview, totalActiveStake, minDelegationAmount } = useContext();
  const [displayDelegationCapMessage, setDisplayDelegationCapMessage] = useState(false);
  const [maxPressed, setMaxPressed] = React.useState(false);

  const { entireBalance: available, entireBalanceMinusDust } = entireBalance({
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

  const getAvailableToDelegate = () => {
    if (contractOverview?.withDelegationCap) {
      const bnAvailable = new BigNumber(entireBalanceMinusDust);
      const totalActive = denominate({
        input: totalActiveStake,
        denomination,
        decimals,
      }).replace(/,/g, '');
      const maxDelegationCap = denominate({
        input: contractOverview.maxDelegationCap,
        denomination,
        decimals,
      }).replace(/,/g, '');
      const availableToDelegate = new BigNumber(maxDelegationCap).minus(new BigNumber(totalActive));
      if (bnAvailable.comparedTo(availableToDelegate) >= 0) {
        setDisplayDelegationCapMessage(true);
        return availableToDelegate.toFixed();
      }
    }
    return entireBalanceMinusDust;
  };

  const handleOnShow = () => {
    setDisplayDelegationCapMessage(false);
    setMaxPressed(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      onShow={handleOnShow}
      className="modal-container"
      animation={false}
      centered
    >
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
              amount: denominate({
                input: minDelegationAmount.toFixed(),
                denomination,
                decimals,
              }),
            }}
            onSubmit={values => {
              handleContinue(values.amount);
            }}
            validationSchema={object().shape({
              amount: string()
                .required('Required')
                .test(
                  'minimum',
                  `Minimum ${denominate({
                    input: minDelegationAmount.toFixed(),
                    denomination,
                    decimals,
                  })} ${egldLabel}`,
                  value => {
                    const bnAmount = new BigNumber(value !== undefined ? value : '');
                    return bnAmount.comparedTo(1) >= 0;
                  }
                )
                .test('maximum', `Maximum ${available} ${egldLabel}`, value => {
                  const bnAmount = new BigNumber(value !== undefined ? value : '');
                  const bnAvailable = new BigNumber(available);
                  return bnAmount.comparedTo(bnAvailable) <= 0;
                })
                .test(
                  'maximum',
                  'Max delegation cap set, use the max button to delegate the maximum amount',
                  value => {
                    const bnAmount = new BigNumber(value !== undefined ? value : '');
                    const bnAvailable = new BigNumber(getAvailableToDelegate());
                    return bnAmount.comparedTo(bnAvailable) <= 0;
                  }
                ),
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
                if (entireBalanceMinusDust !== undefined) {
                  setMaxPressed(true);
                  const availableToDelegate = getAvailableToDelegate();
                  setFieldValue('amount', availableToDelegate);
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
                          Available: <Denominate value={balance} />
                        </small>
                      )}
                      {displayDelegationCapMessage && maxPressed && (
                        <small className="form-text">
                          Max delegation cap reached. That is the maximum amount you can delegate:{' '}
                        </small>
                      )}
                    </div>
                  )}
                  <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <ModalActionButton
                      action="delegate"
                      actionTitle="Continue"
                      isHandleActionDisabled={isFullDelegationCapContract()}
                      handleClose={handleClose}
                    />
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
