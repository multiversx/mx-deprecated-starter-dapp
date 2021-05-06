import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'context';
import * as React from 'react';

const StatusTxDetails = ({ txHash }: { txHash: string }) => {
  const { explorerAddress } = useContext();
  return (
    <>
      <div className="mb-spacer">Transaction hash:</div>{' '}
      <span data-testid="txHash" className="text-break-all">
        {txHash}
      </span>
      <a
        href={`${explorerAddress}transactions/${txHash}`}
        {...{
          target: '_blank',
        }}
        className="ml-2"
      >
        <FontAwesomeIcon icon={faSearch} className="text-muted" />
      </a>
    </>
  );
};

export default StatusTxDetails;
