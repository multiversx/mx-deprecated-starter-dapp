import * as React from 'react';
import TopInfo from './TopInfo';

const Dashboard = () => {
  const ref = React.useRef(null);
  return (
    <div className="container pt-3 pb-3" ref={ref}>
      <div className="row">
        <div className="col-12">
          <TopInfo />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body card-details">
              <div className="empty">This is dashboard</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
