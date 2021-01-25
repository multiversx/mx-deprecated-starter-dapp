import React from "react";
import DelegatorActionsContainer from "../DelegatorActionsContainer";
import DelegatorViews from "../DelegatorViews";

const DelegatorArea = () => {

    return (
        <div className="row app-center-content">
            <DelegatorViews title="My network"/>
            <DelegatorActionsContainer />
        </div>
    )
};

export default DelegatorArea;