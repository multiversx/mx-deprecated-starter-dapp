import * as React from 'react';
import { useDispatch } from 'context';

const Login = () => {
  const dispatch = useDispatch();

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'toggleApp', hideApp: true });
  };

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
