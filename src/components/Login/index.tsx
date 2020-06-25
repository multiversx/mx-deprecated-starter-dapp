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
    <div className="container pt-3 pb-3">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body card-details">
              <div className="empty">
                <button onClick={onClick} className="btn btn-primary">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
