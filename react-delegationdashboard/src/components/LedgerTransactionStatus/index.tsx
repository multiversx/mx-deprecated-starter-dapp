import { TransactionHash } from '@elrondnetwork/erdjs/out';
import { faCheck, faHourglass, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'context';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import StatusTxDetails from './StatusTxDetails';
import txStatus from './txStatus';
export interface ClaimRewardsModalType {
  show: boolean;
  txHash: TransactionHash;
  id: string;
  handleClose: () => void;
}
const LedgerTransactionStatus = ({ show, handleClose, txHash, id }: ClaimRewardsModalType) => {
  const [lastTxStatus, setLastTxStatus] = useState('');
  const [spin, setSpin] = useState(false);
  const [txDStatus, setTxStatus] = useState({ icon: faHourglass, status: '', title: '' });
  const { dapp } = useContext();

  const getStatus = (current: string) => lastTxStatus === current.toLowerCase();

  const getTransactionStatus = (txHash2: TransactionHash) => {
    if (!txHash.isEmpty()) {
      dapp.proxy
        .getTransactionStatus(txHash2)
        .then(status => {
          console.log('get Transaction status', status);
          switch (true) {
            case getStatus(txStatus.pending):
              setTxStatus({ icon: faHourglass, status: 'Pending', title: 'Procesing request' });
              break;
            case getStatus(txStatus.success):
              setTxStatus({ icon: faCheck, status: 'Success', title: 'Success' });
              break;
            default:
              setTxStatus({ icon: faTimes, status: 'Failed', title: 'Request failed' });
          }
          setLastTxStatus(status.status.valueOf().toLowerCase());
        })
        .catch(e => console.log('error ', e));
    }
  };

  const fetch = () => {
    if (!txHash.isEmpty()) {
      const interval = setInterval(() => {
        setSpin(currentSpin => !currentSpin);
        console.log('txhash after ', txHash);
        getTransactionStatus(txHash);
      }, 5000);
      return () => {
        clearInterval(interval);
      };
    }
  };
  useEffect(fetch, [txHash, lastTxStatus]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      className="modal-container"
      animation={false}
      centered
      id={id}
    >
      <div className="card">
        <div className="card-body p-spacer text-center">
          <div className="h6 mb-spacer" data-testid="transactionTitle">
            {txDStatus.title}
          </div>
          <div className="mb-spacer">
            <FontAwesomeIcon
              icon={txDStatus.icon}
              className={`text-white ml-1 ${getStatus(txStatus.pending) && spin ? 'fa-spin' : ''}`}
            />
            <StatusTxDetails lastTxHash={txHash.hash} />
          </div>

          <button
            id="closeButton"
            className="btn btn-link mt-spacer mx-2"
            onClick={handleClose}
            disabled={getStatus(txStatus.pending)}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LedgerTransactionStatus;
