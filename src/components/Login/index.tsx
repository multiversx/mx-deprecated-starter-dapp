import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { elrond } from 'helpers';

const Login = () => {
  const history = useHistory();

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    elrond.login({ callbackUrl: `/dashboard` });
  };

  const listen = () => {
    const handler = (event: any) => {
      if (typeof event.data === 'string' && event.data !== '') {
        history.push(event.data);
        elrond.closeWindow();
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  };

  React.useEffect(listen, []);

  return (
    <div className="d-flex flex-fill align-items-center container">
      <div className="row w-100">
        <div className="col-12 col-md-8 col-lg-5 mx-auto">
          <div className="card shadow-sm rounded p-4 border-0">
            <div className="card-body text-center">
              <h2 className="mb-3">Dapp</h2>

              <p className="mb-3">
                This is an Elrond dapp sample.
                <br /> Login using your Elrond wallet.
              </p>

              <button onClick={onClick} className="btn btn-primary mt-3">
                Login with Elrond
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
