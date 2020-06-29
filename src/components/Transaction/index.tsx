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
  // const nonce = query.get('nonce');

  return success ? (
    <PageState
      svgComponent={<FontAwesomeIcon icon={faCheck} className="text-success fa-3x" />}
      className="dapp-icon icon-medium"
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
      svgComponent={<FontAwesomeIcon icon={faTimes} className="text-danger fa-3x" />}
      className="dapp-icon icon-medium"
      title="Error sending transaction"
      description="Try again"
      showBackBtn={true}
    />
  );
};

export default Transaction;
