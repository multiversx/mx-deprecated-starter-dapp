import { Address } from "@elrondnetwork/erdjs/out";
import React, { useEffect, useState } from "react"
import { useContext } from "../../context"
import Delegation from "../../contracts/Delegation";

const StakeProviderArea = () => {
    const { loggedIn, address, dapp } = useContext()    
    const [, setBalance] = useState("")
    useEffect(function () {
            dapp.proxy.getAccount(new Address(address)).then((value) => setBalance(value.balance.toString()));
        }, [])

    if (!loggedIn) {
        return (<div></div>)
    }

    const handleUpdateFee = () => {
        const delegationContract = new Delegation(dapp.proxy, dapp.provider);
        delegationContract.sendDelegate("").then();
    }

    return (
        <div className="card rounded border-3 app-center-content">
            <div className="card-body text-center p-4">
                <div className="d-flex mt-4 justify-content-center sp-action-btn">
                    <div>
                        <button onClick={() => handleUpdateFee()} className="btn btn-primary mt-3">
                            Update Fee
                        </button>
                    </div>
                    <div>
                        <button onClick={() => handleUpdateFee()} className="btn btn-primary mt-3">
                            Set Delegation Cap
                        </button>
                    </div>
                    <div>
                        <button onClick={() => handleUpdateFee()} className="btn btn-primary mt-3">
                            Add Nodes
                        </button>
                    </div>
                    <div>
                        <button onClick={() => handleUpdateFee()} className="btn btn-primary mt-3">
                            Activate Nodes
                        </button>
                    </div>
                    <div>
                        <button onClick={() => handleUpdateFee()} className="btn btn-primary mt-3">
                            Deactivate Nodes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default StakeProviderArea;