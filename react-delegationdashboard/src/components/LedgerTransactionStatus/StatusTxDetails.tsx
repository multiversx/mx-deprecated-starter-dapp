import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'context';
import * as React from 'react';
const StatusTxDetails = ({ lastTxHash }: { lastTxHash: string }) => {
  const { explorerAddress } = useContext();
  return (
    <>
      <div className="text-secondary">Transaction hash:</div>{' '}
      <span data-testid="lastTxHash" className="text-break-all">
        {lastTxHash}
      </span>
      <a
        href={`${explorerAddress}transactions/${lastTxHash}`}
        {...{
          target: '_blank',
        }}
        className="side-action"
      >
        <FontAwesomeIcon icon={faSearch} />
      </a>
    </>
  );
};

export default StatusTxDetails;
