import * as React from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import { PageState } from 'sharedComponents';
import { useContext } from 'context';

const Transaction = () => {
  const { search } = useLocation();
  const { accountAddress: contextAccountAddress } = useContext();
  const query = new URLSearchParams(search);
  let explorerAddr = 'https://explorer.elrond.com/';

  const success = query.get('success') === 'true' ? true : false;
  const txHash = query.get('txHash');
  const accountAddress = query.get('accountAddress') || contextAccountAddress;

  return success ? (
    <PageState
      svgComponent={<FontAwesomeIcon icon={faCheck} className="text-success fa-3x" />}
      className="dapp-icon icon-medium"
      title="Transaction submitted successfully"
      description={
        <>
          <p>
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
          </p>

          <a href={`/dashboard?accountAddress=${accountAddress}`} className="btn btn-primary mt-3">
            Back to dashboard
          </a>
        </>
      }
    />
  ) : (
    <PageState
      svgComponent={<FontAwesomeIcon icon={faTimes} className="text-danger fa-3x" />}
      className="dapp-icon icon-medium"
      title="Error sending transaction"
      description={
        <>
          Try again
          <a href={`/dashboard?accountAddress=${accountAddress}`} className="btn btn-primary mt-3">
            Back to dashboard
          </a>
        </>
      }
    />
  );
};

export default Transaction;
