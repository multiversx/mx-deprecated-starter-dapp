import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <main role="main">{children}</main>
  </>
);

export default Layout;
