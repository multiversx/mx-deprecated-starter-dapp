import * as React from 'react';
import DelegateAction from '../MyActions/DelegateAction';

const EmptyStake = () => {
  return (
    <div className="stats w-100 mb-spacer">
      <div className="card">
        <div className="card-header border-bottom-0 d-flex flex-wrap align-items-center">
          <h6 className="mt-2 mr-2 mb-0">My Stake</h6>
        </div>
        <div className="card-body d-flex flex-wrap">
          <div className="m-auto text-center py-3 py-sm-5">
            <div>
              <p className="m-0 text-dark">No Stake Yet</p>
              <p className="mb-4 flex-wrap">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's
              </p>
            </div>
            <DelegateAction />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyStake;
