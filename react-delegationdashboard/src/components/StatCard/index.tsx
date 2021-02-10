import SVG from 'react-inlinesvg';
import { StatCardType } from '../../helpers/types';

const StatCard = ({
  title = '',
  value = '0',
  valueUnit = '',
  color = '',
  svg = '',
  percentage = '',
  children = null,
}: StatCardType) => {
  return (
    <div
      className={`statcard bg-light-${color} text-dark-${color} py-3 px-4 mb-3 mb-lg-0 mx-2 ml-lg-spacer rounded`}
    >
      <div className="d-flex align-items-center justify-content-between mt-1 mb-2">
        <div className={`icon mb-1 fill-${color}`}>
          <SVG src={process.env.PUBLIC_URL + '/' + svg} className={`text-${color}`}></SVG>
        </div>
        <div>{children}</div>
      </div>
      <span className="opacity-6">{title}</span>
      <p className="h4 mb-0">
        {value} {valueUnit}
      </p>
      <small className="opacity-5">{percentage}</small>
    </div>
  );
};

export default StatCard;
