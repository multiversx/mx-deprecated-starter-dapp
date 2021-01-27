import React from "react";
import DelegatorActionsContainer from "../DelegatorActionsContainer";
import DelegatorViews from "../DelegatorViews";

const DelegatorArea = () => {

    return (
        <div className="row app-center-content">
            <DelegatorViews title="My delegation"/>
            <DelegatorActionsContainer />
        </div>
    )
};

export default DelegatorArea;