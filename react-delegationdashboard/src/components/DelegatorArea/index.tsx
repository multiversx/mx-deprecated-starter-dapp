import { Address, ContractFunction, Argument } from "@elrondnetwork/erdjs/out";
import { Query } from "@elrondnetwork/erdjs/out/smartcontracts/query";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useContext } from "../../context";
import { addresses } from "../../contracts";
import DelegatorActionsContainer from "../DelegatorActionsContainer";

const DelegatorArea = () => {

    const { address, dapp } = useContext();

    const [totalRewards, setTotalRewards] = useState(0);
    const [claimableRewards, setClaimableRewards] = useState(0);
    useEffect(() => {
            getClaimableRewards();
            getTotalCumulatedRewards();
        }, [])
    const getClaimableRewards = () => {
        const query = new Query({
            address: new Address(addresses["delegation_smart_contract"]),
            func: new ContractFunction('getClaimableRewards'),
            args: [Argument.fromPubkey(new Address(address))]
        })
        dapp.proxy.queryContract(query)
            .then((value) => {
                console.log("query contract, ", value)
                setClaimableRewards(value.returnData[0].asNumber)
            })
            .catch(e => console.log("error ", e))
    }

    const getTotalCumulatedRewards = () => {
        const query = new Query({
            address: new Address(addresses["delegation_smart_contract"]),
            func: new ContractFunction('getTotalCumulatedRewards'),
            caller: new Address(address)
        })
        dapp.proxy.queryContract(query)
            .then((value) => {
                console.log("query contract, ", value)
                setTotalRewards(value.returnData[0].asNumber)
            })
            .catch(e => console.log("error ", e))
    }

    return (
        <div className="row app-center-content">
            <div className="card">
                <div className="card-body">
                    <span>Claimable Rewards</span>
                    <p>{claimableRewards}</p>
                    <div className={`icon text-muted fa=3x}`}>{<FontAwesomeIcon icon={faExchangeAlt} className="text-muted fa-3x" />}</div>
                    {'No info to show' && <p className="h3 mt-3">No info to show</p>}
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className={`icon text-muted fa=3x}`}>
                        <span>Total rewards</span>
                        <p>{totalRewards}</p>
                        {<FontAwesomeIcon icon={faExchangeAlt} className="text-muted fa-3x" />}</div>
                    {'No info to show' && <p className="h3 mt-3">No info to show</p>}
                </div>
            </div>
            <DelegatorActionsContainer />
        </div>
    )
};

export default DelegatorArea;