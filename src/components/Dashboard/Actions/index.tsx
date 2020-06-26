import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { elrond } from 'helpers';
import { useContext } from 'context';
import { faArrowUp, faArrowDown, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Actions = () => {
  const {
    config: { contractAddress },
  } = useContext();
  const history = useHistory();

  const firstAction = () => {
    elrond.sendTransaction({
      receiver: contractAddress,
      value: '100000000000000000',
      gasLimit: '54500',
      data: 'a%@',
      callbackUrl: '/transaction',
    });
  };

  const listen = () => {
    const handler = (event: any) => {
      if (typeof event.data === 'string' && event.data !== '') {
        elrond.closeWindow();
        history.push(decodeURIComponent(event.data));
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  };

  React.useEffect(listen, []);

  return (
    <div className="d-flex mt-4 justify-content-center">
      <div className="action-btn">
        <button className="btn btn-light" onClick={firstAction}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        First action
      </div>

      <div className="action-btn">
        <button className="btn btn-light">
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
        Second action
      </div>

      <div className="action-btn">
        <button className="btn btn-light">
          <FontAwesomeIcon icon={faCaretDown} />
        </button>
        Third action
      </div>
    </div>
  );
};

export default Actions;
