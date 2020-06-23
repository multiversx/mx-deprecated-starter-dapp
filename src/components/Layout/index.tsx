import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="d-flex flex-column flex-fill white-nav-bg">
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
    </>
  );
};

export default Layout;
