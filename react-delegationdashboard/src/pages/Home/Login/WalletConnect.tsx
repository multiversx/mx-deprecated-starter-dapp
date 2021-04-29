// @ts-ignore
import platform from 'platform';

const WalletConnectLogin = () => {
  return (
    <a
      href={
        process.env.PUBLIC_URL +
        `/walletconnect?mobileplatform=${platform.os.family === 'iOS' ||
          platform.os.family === 'Android'}`
      }
      className="btn btn-primary px-sm-spacer mx-1 mx-sm-3"
    >
      Maiar
    </a>
  );
};

export default WalletConnectLogin;
