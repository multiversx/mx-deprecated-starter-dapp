import React from 'react';
import { useContext, useDispatch } from 'context';

const Iframe = () => {
  const {
    config: { walletUrl },
  } = useContext();

  const dispatch = useDispatch();

  const listen = () => {
    const handler = (event: any) => {
      try {
        const action: any = JSON.parse(event.data) as any;
        dispatch(action);
      } catch {}
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  };

  React.useEffect(listen, []);

  return (
    <iframe
      title="wallet"
      src={`${walletUrl}/hook/login?loginCallbackUrl=http://localhost:3000`}
      style={{
        display: 'block',
        background: '#000',
        border: 'none',
        height: '100vh',
        width: '100vw',
      }}
    />
  );
};

export default Iframe;
