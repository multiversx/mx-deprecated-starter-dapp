import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDelegation } from 'helpers';
import { ErrorMessage, Formik } from 'formik';
import { object, string } from 'yup';
import { useContext } from 'context';
import { AgencyMetadata, DelegationTransactionType } from 'helpers/contractDataDefinitions';
import DelegationContractActionButtons from 'components/DelegationContractActionButtons';
import { TransactionHash } from '@elrondnetwork/erdjs/out';

const SetAgencyMetaDataModal = () => {
  const { agencyMetaData } = useContext();
  const [showDelegateModal, setShowDelegateModal] = useState(false);
  const [ledgerDataError, setLedgerDataError] = useState('');
  const [submitPressed, setSubmitPressed] = useState(false);
  const [showTransactionStatus, setShowTransactionStatus] = useState(false);
  const [txHash, setTxHash] = useState(new TransactionHash(''));
  const displayTransactionModal = (txHash: TransactionHash) => {
    setTxHash(txHash);
    setShowDelegateModal(false);
    setShowTransactionStatus(true);
  };
  const { sendTransaction } = useDelegation({
    handleClose: displayTransactionModal,
    setLedgerDataError,
    setSubmitPressed,
  });
  const handleReDelegationCapActivation = (values: AgencyMetadata) => {
    const hexName = Buffer.from(values.name).toString('hex');
    const hexWeb = Buffer.from(values.website).toString('hex');
    const hexKeyBase = Buffer.from(values.keybase).toString('hex');
    const data = hexName + '@' + hexWeb + '@' + hexKeyBase;
    let transactionArguments = new DelegationTransactionType('0', 'setMetaData', data);
    sendTransaction(transactionArguments);
  };

  return (
    <>
      <button
        onClick={() => {
          setShowDelegateModal(true);
        }}
        className="btn btn-primary btn-sm ml-3"
      >
        Identity
      </button>
      <Modal
        show={showDelegateModal}
        onHide={() => setShowDelegateModal(false)}
        className="modal-container"
        animation={false}
        centered
      >
        <div className="card">
          <div className="card-body p-spacer text-center">
            <p className="h6 mb-spacer" data-testid="metaDataTitle">
              Agency Details
            </p>
            <p className="mb-spacer">
              Update or set your agency details in order to validate your identity.
            </p>
            <Formik
              initialValues={agencyMetaData}
              onSubmit={values => {
                handleReDelegationCapActivation(values);
              }}
              validationSchema={object().shape({
                website: string()
                  .required('Required')
                  .test('URL', 'URL is not valid!', value => {
                    var expression = /^((?:http(?:s)?\:\/\/)?[a-zA-Z0-9_-]+(?:.[a-zA-Z0-9_-]+)*.[a-zA-Z]{2,4}(?:\/[a-zA-Z0-9_]+)*(?:\/[a-zA-Z0-9_]+.[a-zA-Z]{2,4}(?:\?[a-zA-Z0-9_]+\=[a-zA-Z0-9_]+)?)?(?:\&[a-zA-Z0-9_]+\=[a-zA-Z0-9_]+)*)$/;
                    var regex = new RegExp(expression);
                    if (value?.match(regex)) {
                      return true;
                    } else {
                      return false;
                    }
                  }),
              })}
            >
              {props => {
                const { handleSubmit, values, handleBlur, handleChange, errors, touched } = props;

                return (
                  <form onSubmit={handleSubmit} className="text-left">
                    <div className="form-group mb-spacer">
                      <label htmlFor="name">Name</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.name && touched.name ? 'is-invalid' : ''
                          }`}
                          id="name"
                          name="name"
                          data-testid="name"
                          required={true}
                          value={values.name}
                          autoComplete="off"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage component="div" name="name" className="invalid-feedback" />
                      </div>
                      <label htmlFor="website">Website</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.website && touched.website ? 'is-invalid' : ''
                          }`}
                          id="website"
                          name="website"
                          data-testid="website"
                          required={true}
                          value={values.website}
                          autoComplete="off"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage component="div" name="website" className="invalid-feedback" />
                      </div>
                      <label htmlFor="website">Keybase</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.keybase && touched.keybase ? 'is-invalid' : ''
                          }`}
                          id="keybase"
                          name="keybase"
                          data-testid="keybase"
                          required={true}
                          value={values.keybase}
                          autoComplete="off"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage component="div" name="keybase" className="invalid-feedback" />
                      </div>
                    </div>
                    <DelegationContractActionButtons
                      ledgerError={ledgerDataError}
                      action="setPercentageFe"
                      actionTitle="Continue"
                      submitPressed={submitPressed}
                      handleClose={() => {
                        setShowDelegateModal(false);
                      }}
                    />
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SetAgencyMetaDataModal;
