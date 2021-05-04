import React from 'react';
import { useHistory } from 'react-router-dom';
import QRCode from 'qrcode';
import { useContext, useDispatch } from 'context';
import { WalletConnectProvider } from '@elrondnetwork/erdjs';
import { walletConnectBridge } from 'config';

const WalletConnect = () => {
  const { dapp } = useContext();
  const dispatch = useDispatch();
  const history = useHistory();
  const [qrSvg, setQrSvg] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const urlParams = new URLSearchParams(window.location.search);
  const isFromMobile = urlParams.get('mobileplatform') === 'true';

  const svgQr: any = {
    dangerouslySetInnerHTML: {
      __html: qrSvg,
    },
    style: {
      width: '15rem',
      height: '15rem',
    },
  };

  const buildQrCode = (string: string) => {
    (async () => {
      if (string) {
        const svg = await QRCode.toString(string, { type: 'svg' });
        setQrSvg(svg);
      }
    })();
  };

  const handleOnLogin = () => {
    dapp.provider
      .getAddress()
      .then(address => {
        dispatch({
          type: 'setWalletConnectLogin',
          walletConnectLogin: {
            loginType: 'walletConnect',
          },
        });
        dispatch({ type: 'login', address });
        history.push('/dashboard');
      })
      .catch(e => {
        setError('Invalid address');
        console.log(e);
      });
  };

  const handleOnLogout = () => {
    dispatch({ type: 'logout', provider: dapp.provider });
  };

  const walletConnectInit = async () => {
    const walletConnect = new WalletConnectProvider(dapp.proxy, walletConnectBridge);
    dapp.provider = walletConnect;
    walletConnect.addEventListener('onWalletConnectLogin', handleOnLogin);
    walletConnect.addEventListener('onWalletConnectDisconect', handleOnLogout);

    const walletConectUri = await walletConnect.login();
    buildQrCode(walletConectUri);
  };

  React.useEffect(() => {
    walletConnectInit();
  }, []);

  return (
    <div className="m-auto login-container">
      <div className="card my-3 text-center">
        <div className="card-body p-spacer mx-lg-spacer">
          <div className="mx-auto mb-3" {...svgQr} />

          <h4 className="mb-3">Connect Maiar</h4>
          <p className="lead mb-0">
            {isFromMobile
              ? 'Confirm the connection in the Maiar app'
              : 'Scan the QR code using Maiar'}
          </p>
          <div>
            {error && (
              <p className="text-danger d-flex justify-content-center align-items-center">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnect;
