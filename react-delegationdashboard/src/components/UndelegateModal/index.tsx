import React from 'react';
import { Modal } from 'react-bootstrap';
import { useContext } from '../../context';
import { ErrorMessage, Formik } from 'formik';

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

const UndelegateModal = ({ show, title, description, handleClose, handleContinue }: BaseModalType) => {

  const { erdLabel, account } = useContext();
  var transaction = new Transaction()
  transaction.receiver = new Address(addresses["delegation_smart_contract"])
  transaction.value = new Balance(BigInt(0))

  return (
    <Modal show={show} onHide={handleClose} className="modal-container" animation={false} centered>

      <div className="card card-small">
        <div className="card-body text-center p-spacer">
          <p className="h3" data-testid="undelegateTitle">
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
              amount: string().required('Required')
            })}
          >
            {(props) => {
              const {
                handleSubmit,
                values,
                handleBlur,
                handleChange,
              } = props;

              return (
                <form onSubmit={handleSubmit} className="text-left">
                  <div className="form-group mb-spacer">
                    <label htmlFor="amount">Amount {erdLabel}</label>
                    <div className="input-group input-group-seamless">
                      <input type="text" className="form-control" id="amount" name="amount" data-testid="amount"
                        required={true} value={values.amount} autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    </div>
                    <small className="form-text text-secondary mt-0">
                      Available: <Denominate value={account.balance} />
                    </small>
                    <ErrorMessage name="amount" />
                  </div>
                  <div className="d-flex align-items-center flex-column mt-spacer">
                    <button type="submit" className="btn btn-primary px-spacer" id="continueDelegate" data-testid="continueUndelegate">
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

export default UndelegateModal;
