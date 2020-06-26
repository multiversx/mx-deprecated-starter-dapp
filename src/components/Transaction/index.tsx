import * as React from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import { PageState } from 'sharedComponents';

const Transaction = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  let explorerAddr = 'https://explorer.elrond.com/';

  const success = query.get('success') === 'true' ? true : false;
  const txHash = query.get('txHash');
  const nonce = query.get('nonce');

  return (
    <div className="d-flex flex-fill align-items-center container">
      <div className="row w-100">
        <div className="col-12 col-md-8 col-lg-5 mx-auto">
          <div className="card shadow-sm rounded p-4 border-0">
            <div className="card-body text-center">
              {success ? (
                <PageState
                  svgComponent={<FontAwesomeIcon icon={faCheck} className="text-danger" />}
                  title="Transaction submitted successfully"
                  showBackBtn={true}
                  description={
                    <>
                      <a
                        href={`${explorerAddr}transactions/${txHash}`}
                        {...{
                          target: '_blank',
                        }}
                        className="tx-link"
                        title="View in Explorer"
                      >
                        {txHash}
                      </a>
                    </>
                  }
                />
              ) : (
                <PageState
                  svgComponent={<FontAwesomeIcon icon={faTimes} className="text-danger" />}
                  title="Error sending transaction"
                  description="Try again"
                  showBackBtn={true}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
