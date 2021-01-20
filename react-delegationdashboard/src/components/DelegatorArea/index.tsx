import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import DelegatorActionsContainer from "../DelegatorActionsContainer";

const DelegatorArea = () => {

    return (
        <div className="row app-center-content">
            <div className="card">
                <div className="card-body">
                    <div className={`icon text-muted fa=3x}`}>{<FontAwesomeIcon icon={faExchangeAlt} className="text-muted fa-3x" />}</div>
                    {'No info to show' && <p className="h3 mt-3">No info to show</p>}
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className={`icon text-muted fa=3x}`}>{<FontAwesomeIcon icon={faExchangeAlt} className="text-muted fa-3x" />}</div>
                    {'No info to show' && <p className="h3 mt-3">No info to show</p>}
                </div>
            </div>
            <DelegatorActionsContainer/>
        </div>
    )
};

export default DelegatorArea;