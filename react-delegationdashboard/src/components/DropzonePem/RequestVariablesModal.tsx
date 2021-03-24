import ModalActionButton from 'components/ModalActionButton';
import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { DropzoneFileType } from '.';
import PemUpload from './PemUpload';
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
    }
  };
  return (
    <Modal show={show} className="modal-container" animation={false} centered>
      <div className="card">
        <div className="card-body p-spacer text-center">
          <p className="h6 mb-0" data-testid="delegateTitle">
            {name}
          </p>
          <div className="mt-spacer">
            {variables?.map(variable => {
              return (
                <div key={variable.name}>
                  {variable.type === 'input' && (
                    <div className="form-group text-left mt-3 mb-0">
                      <label htmlFor={variable.name}>{variable.name}</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          id={variable.name}
                          name={variable.name}
                          onChange={e => {
                            const vals = { ...modalValues };
                            vals[variable.name] = e.target.value;
                            setModalValues(vals);
                          }}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  )}
                  <PemUpload handleClose={handleClose} onSubmit={onSubmit} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RequestVariablesModal;
