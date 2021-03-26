import SVG from 'react-inlinesvg';
import { StatCardType } from 'helpers/types';
import React from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const StatCard = ({
  title = '',
  value = '0',
  valueUnit = '',
  color = '',
  svg = '',
  percentage = '',
  tooltipText = '',
  children = null,
}: StatCardType) => {
  return (
    <div className={'statcard card text-white py-3 px-4 mb-spacer ml-spacer rounded'}>
      <div className="d-flex align-items-center justify-content-between mt-1 mb-2">
        <div className="icon my-1 fill-white">
          <SVG src={process.env.PUBLIC_URL + '/' + svg} className="text-white"></SVG>
        </div>
        <div>{children}</div>
      </div>
      <span className="opacity-6">{title}</span>
      <p className="h5 mb-0">
        {value} {valueUnit}
      </p>
      <small className="opacity-5">
        {percentage}
        {tooltipText !== '' && (
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={props => (
              <Tooltip id="button-tooltip" {...props}>
                {tooltipText}
              </Tooltip>
            )}
          >
            <FontAwesomeIcon icon={faInfoCircle} className="text-white ml-1" />
          </OverlayTrigger>
        )}
      </small>
    </div>
  );
};

export default StatCard;
