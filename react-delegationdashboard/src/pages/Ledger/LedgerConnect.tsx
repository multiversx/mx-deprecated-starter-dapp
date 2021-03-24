import * as React from 'react';
import { ReactComponent as LedgerLogo } from 'assets/images/ledger-nano.svg';

const LedgerConnect = ({ onClick, error }: { onClick: () => void; error: string }) => {
  const [ledgerError] = React.useState(error);
  return (
    <div className="m-auto login-container">
      <div className="card my-spacer text-center">
        <div className="card-body p-spacer mx-lg-spacer">
          <LedgerLogo className=" mb-spacer" />
          <h4 className="mb-spacer">Connect Ledger</h4>
          <p className="lead mb-spacer">Unlock your device &amp; open the Elrond App.</p>
          <div>
            {ledgerError && (
              <p className="text-danger d-flex justify-content-center align-items-center">
                {ledgerError}
              </p>
            )}
            <button
              className="btn btn-primary px-spacer"
              onClick={onClick}
              data-testid="connectBtn"
            >
              Connect Ledger
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LedgerConnect;
