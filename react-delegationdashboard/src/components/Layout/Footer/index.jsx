import React from 'react';
import { ReactComponent as HeartIcon } from '../../../assets/images/heart.svg';

const Footer = () => {
  return (
    <footer className="footer d-flex justify-content-center mt-2 mb-3">
      <a
        {...{
          target: '_blank',
        }}
        className="align-items-center"
        href="https://elrond.com/"
      >
        Made with <HeartIcon className="mx-1" /> by Elrond Network.
      </a>
    </footer>
  );
};

export default Footer;
