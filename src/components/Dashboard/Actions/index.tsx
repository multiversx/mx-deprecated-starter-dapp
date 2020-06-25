import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { elrond } from 'helpers';
import { useContext } from 'context';

const Actions = () => {
  const {
    config: { contractAddress },
  } = useContext();
  const history = useHistory();

  //TODO: pagini de post-transaction cu PageState iconita si link catre explorer
  const firstAction = () => {
    elrond.sendTransaction({
      receiver: contractAddress,
      value: '100000000000000000',
      gasLimit: '54500',
      data: 'a%@ -',
      callbackUrl: '/transaction',
    });
  };

  const listen = () => {
    const handler = (event: any) => {
      if (typeof event.data === 'string') {
        elrond.closeWindow();
        history.push(decodeURIComponent(event.data));
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  };

  React.useEffect(listen, []);

  return (
    <div className="d-flex">
      <button className="btn btn-outline-primary" onClick={firstAction}>
        First action
      </button>
      <button className="btn btn-outline-secondary">Second action</button>
      <button className="btn btn-outline-info">Third action</button>
    </div>
  );
};

export default Actions;
