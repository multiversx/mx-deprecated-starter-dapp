import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'context';
import { elrond } from 'helpers';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    elrond.login({ callbackUrl: 'http://localhost:3000/' });
  };

  const listen = () => {
    const handler = (event: any) => {
      try {
        const queryString = event.data.split('?').pop();
        const accountAddress = new URLSearchParams(queryString).get('accountAddress');
        if (accountAddress) {
          dispatch({ type: 'login', accountAddress });
          elrond.closeWindow();
          history.push('/dashboard');
        }
      } catch {
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
