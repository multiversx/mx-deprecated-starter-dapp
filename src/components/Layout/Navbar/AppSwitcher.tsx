import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as ElrondLogo } from 'assets/img/elrond-symbol.svg';
import React from 'react';
import { NavDropdown } from 'react-bootstrap';

export default function AppSwitcher() {
  const hidePopover = () => {
    document.body.click();
  };

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const apps = [
    {
      id: 'wallet',
      name: 'Wallet',
      to: 'https://wallet.elrond.com/',
    },
    {
      id: 'staking',
      name: 'Staking',
      to: 'https://genesis.elrond.com',
    },
    {
      id: 'pre-staking',
      name: 'Pre-staking',
      to: 'https://stake.elrond.com',
    },
    {
      id: 'explorer',
      name: 'Explorer',
      to: 'https://explorer.elrond.com/',
    },
    {
      id: 'docs',
      name: 'Docs',
      to: 'https://docs.elrond.com/',
    },
  ];

  const activeAppId = 'staking';

  return (
    <NavDropdown
      title={
        <span className="appSwitcherButton" onClick={onClick}>
          <ElrondLogo className="elrond-logo" />

          <span className="activeApp">
            {(apps.filter((app) => app.id === activeAppId).pop() as any).name}{' '}
            <small>
              <FontAwesomeIcon icon={faAngleDown} />
            </small>
          </span>
        </span>
      }
      id="basic-nav-dropdown"
      className="brandDropdown"
    >
      {apps.map((app) => {
        return (
          <NavDropdown.Item
            key={app.id}
            onClick={hidePopover}
            href={app.to}
            target={`${activeAppId === app.id ? '' : '_blank'}`}
            className={`my-2 ${activeAppId === app.id ? 'active' : ''}`}
          >
            {app.name}
          </NavDropdown.Item>
        );
      })}
    </NavDropdown>
  );
}
