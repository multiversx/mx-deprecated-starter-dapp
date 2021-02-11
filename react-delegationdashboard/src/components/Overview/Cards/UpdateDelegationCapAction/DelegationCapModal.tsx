import React from 'react';
import { Modal } from 'react-bootstrap';
import { useContext } from 'context';
import { ErrorMessage, Formik } from 'formik';
import BigNumber from 'bignumber.js';
import { object, number } from 'yup';
import denominate from 'components/Denominate/formatters';
import { ActionModalType } from 'helpers/types';
import { denomination, decimals } from 'config';

const DelegationCapModal = ({
  show,
  title,
  description,
  handleClose,
  handleContinue,
}: ActionModalType) => {
  const { egldLabel, totalActiveStake } = useContext();

  return (
    <Modal show={show} onHide={handleClose} className="modal-container" animation={false} centered>
      <div className="card">
        <div className="card-body text-center p-spacer">
          <p className="h6 mb-spacer" data-testid="delegateTitle">
            {title}
          </p>
          <p className="mb-spacer">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
          <Formik
            initialValues={{
              amount: denominate({
                input: totalActiveStake,
                denomination,
                decimals,
                showLastNonZeroDecimal: false,
                addCommas: false,
              }),
            }}
            onSubmit={values => {
              handleContinue(values.amount);
            }}
            validationSchema={object().shape({
              amount: number()
                .required('Required')
                .test(
                  'minimum',
                  `Minimum ${denominate({
                    input: totalActiveStake,
                    denomination,
                    decimals,
                    showLastNonZeroDecimal: false,
                    addCommas: false,
                  })} ${egldLabel}`,
                  value => {
                    const bnAmount = new BigNumber(value !== undefined ? value : '');
                    return (
                      bnAmount.comparedTo(
                        denominate({
                          input: totalActiveStake,
                          denomination,
                          decimals,
                          showLastNonZeroDecimal: false,
                          addCommas: false,
                        })
                      ) >= 0
                    );
                  }
                )
                .test('number', 'String not allowed, only numbers.', value => {
                  const regex = /^(\d+(?:[\.]\d{1,2})?)$/;
                  return regex.test(value?.toString() || '');
                }),
            })}
          >
            {props => {
              const { handleSubmit, values, handleBlur, handleChange, errors, touched } = props;
              return (
                <form onSubmit={handleSubmit} className="text-left">
                  <div className="form-group mb-spacer">
                    <label htmlFor="amount">{description}</label>
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
                    <ErrorMessage component="div" name="amount" className="invalid-feedback" />
                  </div>
                  <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <button
                      type="submit"
                      className="btn btn-primary mx-2"
                      id="continueDelegate"
                      data-testid="continueDelegate"
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

export default DelegationCapModal;
