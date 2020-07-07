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

  const firstAction = (e: React.MouseEvent) => {
    e.preventDefault();
    elrond.sendTransaction({
      receiver: contractAddress,
      value: '1200000000000000000',
      gasLimit: '54500',
      data: 'a%@',
      callbackUrl: '/transaction',
    });
  };
  const secondAction = (e: React.MouseEvent) => {
    e.preventDefault();
    elrond.sendTransaction({
      receiver: contractAddress,
      value: '1200000000000000000',
      gasLimit: '54500',
      data: 'a%@',
      callbackUrl: '/transaction',
    });
  };
  const thirdAction = (e: React.MouseEvent) => {
    e.preventDefault();
    elrond.sendTransaction({
      receiver: contractAddress,
      value: '1200000000000000000',
      gasLimit: '54500',
      data: 'a%@',
      callbackUrl: '/transaction',
    });
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
        <button className="btn" onClick={firstAction}>
          <FontAwesomeIcon icon={faArrowUp} className="text-primary" />
        </button>
        <a href="/" onClick={firstAction} className="text-white text-decoration-none">
          First action
        </a>
      </div>

      <div className="action-btn">
        <button className="btn" onClick={secondAction}>
          <FontAwesomeIcon icon={faArrowDown} className="text-primary" />
        </button>
        <a href="/" onClick={secondAction} className="text-white text-decoration-none">
          Second action
        </a>
      </div>

      <div className="action-btn">
        <button className="btn" onClick={thirdAction}>
          <FontAwesomeIcon icon={faCaretDown} className="text-primary" />
        </button>
        <a href="/" onClick={thirdAction} className="text-white text-decoration-none">
          Third action
        </a>
      </div>
    </div>
  );
};

export default Actions;
