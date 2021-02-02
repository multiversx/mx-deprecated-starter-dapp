import { Address, ContractFunction } from '@elrondnetwork/erdjs/out';
import { Query } from '@elrondnetwork/erdjs/out/smartcontracts/query';
import React, { useEffect, useState } from 'react';
import { useContext } from '../../context';
import { encode } from '../../helpers/bech32';
import NodesTable from '../NodesList';
import StakeProviderActionsContainer from '../StakeProviderActionsContainer';
import StakeProviderViews from '../StakeProviderViews';

const StakeProviderArea = () => {
    const { dapp, address, delegationContract } = useContext();
    const [isOwner, setIsOwner] = useState(false);
    const [serviceFee, setServiceFee] = useState('0');
    const [maxDelegationCap, setMaxDelegationCap] = useState('0');

    const getContractConfig = () => {
        const query = new Query({
            address: new Address(delegationContract),
            func: new ContractFunction('getContractConfig')
        });

        dapp.proxy.queryContract(query)
            .then((value) => {
                let ownerAddress = encode(value.returnData[0].asHex);
                setIsOwner(address.localeCompare(ownerAddress) < 0 ? false : true);
                setServiceFee((parseFloat(value.returnData[1].asHex) / 100).toString());
                setMaxDelegationCap(value.returnData[2].asString || '0');
                console.log('getContractConfig', value);
            })
            .catch(e => console.error('getContractConfig error ', e));
    };

    useEffect(getContractConfig, []);

    if (!isOwner) {
        return (<></>);
    }

    return (
        <>
            <StakeProviderViews serviceFee={serviceFee} maxDelegationCap={maxDelegationCap} />
            <StakeProviderActionsContainer />
            <NodesTable />
        </>
    );
};

export default StakeProviderArea;