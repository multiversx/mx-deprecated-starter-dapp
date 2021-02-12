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
      className="statcard py-3 px-4 mb-spacer ml-spacer rounded"
      style={{ backgroundColor: '#fff' }}
    >
      <div className="d-flex align-items-center justify-content-between mt-1 mb-2">
        <div className={`icon my-1 fill-${color}`}>
          <SVG src={process.env.PUBLIC_URL + '/' + svg} className={`text-${color}`}></SVG>
        </div>
        <div>{children}</div>
      </div>
      <span className="text-muted">{title}</span>
      <p className="h5 mb-0">
        {value} {valueUnit}
      </p>
      <small className="text-muted">{percentage}</small>
    </div>
  );
};

export default StatCard;
