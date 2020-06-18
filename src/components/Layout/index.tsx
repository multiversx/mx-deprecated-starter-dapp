import React from 'react';
import { useHistory } from 'react-router-dom';
import { useContext, useDispatch } from 'context';
import Iframe from 'components/Iframe';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { hideApp, accountAddress } = useContext();
  const history = useHistory();
  const dispatch = useDispatch();

  const login = () => {
    if (accountAddress && hideApp) {
      dispatch({ type: 'toggleApp', hideApp: false });
      history.push('/dashboard');
    }
  };

  React.useEffect(login, [accountAddress]);

  return (
    <>
      <div className={`${hideApp ? 'd-none' : 'd-flex'} flex-column flex-fill white-nav-bg`}>
        <Navbar />
        <main className="d-flex flex-column flex-grow-1">
          <div className={`d-flex flex-fill align-items-center container `}>
            <div className="row w-100">
              <div className={`col-md-12`}>{children}</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
      <div style={{ minHeight: '100vh', display: hideApp ? 'block' : 'none' }}>
        <Iframe />
      </div>
    </>
  );
};

export default Layout;
