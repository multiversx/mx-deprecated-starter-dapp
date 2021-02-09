import React from 'react';
import { Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import { ActionModalType } from 'helpers/types';

const AutomaticActivationModal = ({
  show,
  title,
  description,
  handleClose,
  handleContinue,
}: ActionModalType) => {
  return (
    <Modal show={show} onHide={handleClose} className="modal-container" animation={false} centered>
      <div className="card card-small">
        <div className="card-body text-center">
          <p className="h3" data-testid="delegateTitle">
            {title}
          </p>
          <p className="lead">{description}</p>

          <Formik
            initialValues={{
              option: 'yes',
            }}
            onSubmit={values => {
              handleContinue(values.option);
            }}
          >
            {props => {
              const { handleSubmit, values, handleBlur, handleChange } = props;

              return (
                <form onSubmit={handleSubmit} className="text-center">
                  <div className="form-group mt-3 mb-0">
                    <div className="input-group">
                      <select
                        name="option"
                        className="dropdown"
                        value={values.option}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <button
                      type="submit"
                      className="btn btn-outline-primary mx-2 mt-3"
                      id="continueDelegate"
                      data-testid="continueDelegate"
                    >
                      Continue
                    </button>
                    <button
                      id="closeButton"
                      className="btn btn-link mx-2 mt-3"
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

export default AutomaticActivationModal;
