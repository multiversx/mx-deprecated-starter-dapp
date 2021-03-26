import * as React from 'react';
import { useContext } from 'context';

const ConfirmedAddress = () => {
  const { ledgerAccount } = useContext();

  return (
    <div className="m-auto">
      <div className="card my-spacer text-center">
        <div className="card-body p-spacer mx-lg-spacer">
          <h4 className="mb-spacer">Confirm Ledger Address</h4>
          <p>For security, please confirm that your address: </p>
          <p className="lead">{ledgerAccount?.address}</p>
          <p className="m-0">is the one shown on your Ledger device screen now. </p>
          <p>Select Approve on your device to confirm.</p>
          <p>
            Or, if it does not match, close this page and{' '}
            <a
              href="https://help.elrond.com/en/"
              {...{
                target: '_blank',
              }}
            >
              contact support
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmedAddress;
