import { TransactionHash } from '@elrondnetwork/erdjs';
import { faCheck, faHourglass, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'context';
import useInterval from 'helpers/useInterval';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import StatusTxDetails from './StatusTxDetails';
import txStatus from './txStatus';
export interface TransactionStatusModalType {
  show: boolean;
  txHash: TransactionHash;
}
const TransactionStatusModal = ({ show, txHash }: TransactionStatusModalType) => {
  const [lastTxStatus, setLastTxStatus] = useState(txStatus.pending);
  const [spin, setSpin] = useState(false);
  const [delay] = useState(1000);
  const [txDStatus, setTxStatus] = useState({
    icon: faHourglass,
    status: txStatus.pending,
    title: 'Procesing request',
  });
  const { dapp } = useContext();
  const history = useHistory();

  const handleCloseModal = () => {
    history.push('');
  };
  const getStatus = (current: string) => lastTxStatus === current.toLowerCase();

  useInterval(
    () => {
      getTransactionStatus(txHash);
      setSpin(currentSpin => !currentSpin);
    },
    txDStatus.status.toLowerCase() === 'pending' ? delay : null
  );

  useEffect(() => {}, [lastTxStatus]);

  const getTransactionStatus = (hash: TransactionHash) => {
    if (!txHash.isEmpty()) {
      dapp.apiProvider
        .getTransaction(hash)
        .then(transaction => {
          switch (true) {
            case getStatus(txStatus.success):
              setTxStatus({ icon: faCheck, status: 'Success', title: 'Success' });
              break;

            case getStatus(txStatus.notExecuted):
            case getStatus(txStatus.invalid):
            case getStatus(txStatus.fail):
              setTxStatus({ icon: faTimes, status: 'Failed', title: 'Request failed' });
              break;
            default:
              setTxStatus({ icon: faHourglass, status: 'Pending', title: 'Procesing request' });
          }
          setLastTxStatus(transaction.status.status.valueOf().toLowerCase());
        })
        .catch(e => console.log('error ', e));
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleCloseModal}
      className="modal-container"
      animation={false}
      centered
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
            <StatusTxDetails txHash={txHash.toString()} />
          </div>

          <button
            id="closeButton"
            className="btn btn-primary mx-2"
            onClick={handleCloseModal}
            disabled={getStatus(txStatus.pending)}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionStatusModal;
