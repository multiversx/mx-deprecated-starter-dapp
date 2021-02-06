import React from 'react';

const Footer = () => {
  return (
    <footer className="footer d-flex justify-content-center mt-2 mb-3">
      <a
        {...{
          target: '_blank',
          rel: 'noopener noreferrer',
        }}
        className="align-items-center"
        href="https://elrond.com/"
      >
        Powered by Elrond Network.
      </a>
    </footer>
  );
};

export default Footer;
