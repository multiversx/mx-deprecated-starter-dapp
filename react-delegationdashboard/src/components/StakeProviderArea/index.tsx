import { Address, ContractFunction } from "@elrondnetwork/erdjs/out";
import { Query } from "@elrondnetwork/erdjs/out/smartcontracts/query";
import React, { useEffect, useState } from "react"
import { useContext } from "../../context"
import { addresses } from "../../contracts";
import { encode } from "../../helpers/bech32";
import StakeProviderActionsContainer from "../StakeProviderActionsContainer";
import StakeProviderViews from "../StakeProviderViews";

const StakeProviderArea = () => {
    const { dapp, address } = useContext()
    const [isOwner, setIsOwner] = useState(false)

    const getContractConfig = () => {
        const query = new Query({
            address: new Address(addresses["delegation_smart_contract"]),
            func: new ContractFunction("getContractConfig")
        })

        dapp.proxy.queryContract(query)
            .then((value) => {
                let ownerAddress = encode(value.returnData[0].asHex)
                console.log("Owner address ", ownerAddress);

                setIsOwner(address.localeCompare(ownerAddress) < 0 ? false : true);
            })
            .catch(e => {
                console.log("error ", e)
            })
    }


    useEffect(function () {
        let resp = getContractConfig()
        console.log("response ", resp)
    }, [])

    if (!isOwner) {
        return (<div></div>)
    }

    return (
        <div>
            <StakeProviderViews />
            <StakeProviderActionsContainer />
        </div>
    )
};

export default StakeProviderArea;