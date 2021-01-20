import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useContext } from '../../context';
import entireBalance from '../../helpers/entireBalance';
import { ErrorMessage, Formik } from 'formik';
import BigNumber from 'bignumber.js';

import { object, string } from 'yup';
import Denominate from '../Denominate';
import { Address, Balance, Transaction } from '@elrondnetwork/erdjs/out';
import { addresses } from '../../contracts';

interface BaseModalType {
  show: boolean;
  title: string;
  description: string;
  handleClose: () => void;
  handleContinue: (value: string) => void
}

const DelegateModal = ({ show, title, description, handleClose, handleContinue }: BaseModalType) => {
  const { erdLabel, denomination, decimals, account, dapp, address } = useContext();
  const [balance, setBalance] = useState("")
  var transaction = new Transaction()
  transaction.receiver = new Address(addresses["delegation_smart_contract"])
  transaction.value = new Balance(BigInt(0))
  useEffect(function () {
    dapp.proxy.getAccount(new Address(address)).then((value) => setBalance(value.balance.toString()));
  }, [])

  const available = entireBalance({
    balance: account.balance,
    gasPrice: "12000000",
    gasLimit: "12000000",
    denomination,
    decimals,
  });
  return (
    <Modal show={show} onHide={handleClose} className="modal-container" animation={false} centered>

      <div className="card card-small">
        <div className="card-body text-center p-spacer">
          <p className="h3" data-testid="delegateTitle">
            {title}
          </p>
          <p className="lead mb-spacer">{description}</p>

          <Formik initialValues={{
            amount: ''
          }}
            onSubmit={(values) => {
              handleContinue(values.amount);
            }}
            validationSchema={object().shape({
              amount: string()
                .required('Required')
                .test('minimum', `Minimum 10 ${erdLabel}`, (value) => {
                  const bnAmount = new BigNumber(value !== undefined ? value : "");
                  return bnAmount.comparedTo(10) >= 0;
                })
            })}
          >
            {(props) => {
              const {
                handleSubmit,
                values,
                handleBlur,
                handleChange,
                setFieldValue,
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
                    <label htmlFor="amount">Amount {erdLabel}</label>
                    <div className="input-group input-group-seamless">
                      <input type="text" className="form-control" id="amount" name="amount" data-testid="amount"
                        required={true} value={values.amount} autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleBlur} />
                      <span className="input-group-append">
                        <a href="/#" className="input-group-text" data-testid="maxBtn" onClick={getEntireBalance}>Max</a>
                      </span>
                    </div>
                    <small className="form-text text-secondary mt-0">
                      Available: <Denominate value={balance} />
                    </small>
                    <ErrorMessage name="amount" />
                  </div>
                  <div className="d-flex align-items-center flex-column mt-spacer">
                    <button type="submit" className="btn btn-primary px-spacer" id="continueDelegate" data-testid="continueDelegate">
                      Continue
                    </button>
                    <button id="closeButton" className="btn btn-primary px-spacer mt-3" onClick={handleClose}>
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
