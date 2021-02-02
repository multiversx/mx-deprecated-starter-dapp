import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { DropzoneFileType } from '.';
import PlaygroundPemUpload from './PemUpload';
import { RequestType } from './Request';

interface RequestVariablesModalType {
  name: string;
  show: boolean;
  variables: RequestType['variables'];
  data: RequestType['data'];
  handleClose: () => void;
  triggerDispatchEvent: (variablesData: string) => void;
}

interface ModalValuesType {
  [key: string]: any;
}

const RequestVariablesModal = ({
  name,
  show,
  variables,
  data,
  handleClose,
  triggerDispatchEvent,
}: RequestVariablesModalType) => {
  const [modalValues, setModalValues] = React.useState<ModalValuesType>({});

  const onSubmit = (pemFiles?: DropzoneFileType[]) => {
    if (typeof data !== 'string') {
      triggerDispatchEvent(`${data(pemFiles ? pemFiles : modalValues)}`);
      handleClose();
    }
  };

  const isPemUpload = variables && variables.some((variable) => variable.type === 'pemUpload');

  return (
    <Modal show={show} className="modal-container" animation={false} centered>
      <div className="card card-small">
      <div className="card-body text-center p-spacer">
          <p className="h3" data-testid="delegateTitle">
            {name}
          </p>
          <div className="mt-4 lead">
            {variables?.map((variable) => {
              return (
                <div key={variable.name}>
                  {variable.type === 'input' && (
                    <div className="form-group text-left">
                      <label htmlFor={variable.name}>{variable.name}</label>
                      <div className="input-group input-group-seamless">
                        <input
                          type="text"
                          className="form-control"
                          id={variable.name}
                          name={variable.name}
                          onChange={(e) => {
                            const vals = { ...modalValues };
                            vals[variable.name] = e.target.value;
                            setModalValues(vals);
                          }}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  )}
                  {variable.type === 'pemUpload' && (
                    <PlaygroundPemUpload handleClose={handleClose} onSubmit={onSubmit} />
                  )}
                </div>
              );
            })}
          </div>
          {!isPemUpload && (
            <>
              <div className="d-flex align-items-center flex-column mt-spacer">
                <button
                  type="submit"
                  className="btn btn-primary px-spacer"
                  id="continueReq"
                  onClick={() => {
                    onSubmit();
                  }}
                >
                  Continue
                </button>
                <div className="mt-3 btn btn-link" onClick={handleClose}>
                  Close
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default RequestVariablesModal;
