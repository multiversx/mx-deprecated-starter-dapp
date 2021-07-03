import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import QRCode from 'qrcode';
import { useContext, useDispatch } from 'context';
import { WalletConnectProvider } from '@elrondnetwork/erdjs';
import { walletConnectBridge, walletConnectDeepLink } from 'config';

const WalletConnect = () => {
  const { dapp } = useContext();
  const dispatch = useDispatch();
  const history = useHistory();
  const [qrSvg, setQrSvg] = useState('');
  const [wcUri, setWcUri] = useState('');
  const [error, setError] = useState<string>('');

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

  const buildQrCode = () => {
    (async () => {
      if (wcUri) {
        const svg = await QRCode.toString(wcUri, { type: 'svg' });
        setQrSvg(svg);
      }
    })();
  };

  useEffect(buildQrCode, [wcUri]);
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
    const walletConnect = new WalletConnectProvider(dapp.proxy, walletConnectBridge, {
      onClientLogin: handleOnLogin,
      onClientLogout: handleOnLogout,
    });
    dapp.provider = walletConnect;

    const walletConectUri = await walletConnect.login();
    setWcUri(walletConectUri);
  };

  useEffect(
    () => {
      walletConnectInit();
    },
    /* eslint-disable react-hooks/exhaustive-deps */ []
  );

  return (
    <div className="m-auto login-container">
      <div className="card my-3 text-center">
        <div className="card-body p-spacer mx-lg-spacer">
          <div className="mx-auto mb-3" {...svgQr} />

          <h4 className="mb-3">Connect Maiar</h4>
          <p className="lead mb-0">
            {isFromMobile ? (
              <>
                <p className="lead mb-0">
                  Scan the QR code using Maiar or click the button below to open the App
                </p>
                <a
                  id="accessWalletBtn"
                  data-testid="accessWalletBtn"
                  className="btn btn-primary px-spacer mt-spacer"
                  href={`${walletConnectDeepLink}?wallet-connect=${encodeURIComponent(wcUri)}`}
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  Maiar Login
                </a>
              </>
            ) : (
              'Scan the QR code using Maiar'
            )}
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
