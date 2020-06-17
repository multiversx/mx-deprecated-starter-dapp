import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <main role="main">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {children}
    </main>
  </>
);

export default Layout;
