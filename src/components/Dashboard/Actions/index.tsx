import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { newTransaction } from 'helpers';
import elrond, { ElrondTransaction } from 'helpers/elrond';
import { useContext, useDispatch } from 'context';
import { faArrowUp, faArrowDown, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Actions = () => {
  const {
    config: { contractAddress },
  } = useContext();
  const history = useHistory();
  const dispatch = useDispatch();

  const sendTransaction = (transaction: ElrondTransaction) => (e: React.MouseEvent) => {
    e.preventDefault();
    const lastTransaction = newTransaction(transaction);
    dispatch({ type: 'setLastTransaction', lastTransaction });
    elrond.sendTransaction({ ...transaction });
  };

  const firstTransaction = {
    receiver: contractAddress,
    data: 'a%@',
    value: '1200000000000000000',
    gasLimit: '54500',
    callbackUrl: '/transaction',
  };

  const listen = () => {
    const handler = (event: any) => {
      if (typeof event.data === 'string' && event.data !== '') {
        elrond.closeWindow();
        const decodedUrl = decodeURIComponent(event.data);
        if (decodedUrl.includes('/')) {
          history.push(decodedUrl);
        }
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  };

  React.useEffect(listen, []);

  return (
    <div className="d-flex mt-4 justify-content-center">
      <div className="action-btn">
        <button className="btn" onClick={sendTransaction(firstTransaction)}>
          <FontAwesomeIcon icon={faArrowUp} className="text-primary" />
        </button>
        <a
          href="/"
          onClick={sendTransaction(firstTransaction)}
          className="text-white text-decoration-none"
        >
          First action
        </a>
      </div>

      <div className="action-btn">
        <button className="btn" onClick={sendTransaction(firstTransaction)}>
          <FontAwesomeIcon icon={faArrowDown} className="text-primary" />
        </button>
        <a
          href="/"
          onClick={sendTransaction(firstTransaction)}
          className="text-white text-decoration-none"
        >
          Second action
        </a>
      </div>

      <div className="action-btn">
        <button className="btn" onClick={sendTransaction(firstTransaction)}>
          <FontAwesomeIcon icon={faCaretDown} className="text-primary" />
        </button>
        <a
          href="/"
          onClick={sendTransaction(firstTransaction)}
          className="text-white text-decoration-none"
        >
          Third action
        </a>
      </div>
    </div>
  );
};

export default Actions;
