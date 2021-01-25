import { Address, ContractFunction, Argument } from '@elrondnetwork/erdjs/out';
import { Query } from '@elrondnetwork/erdjs/out/smartcontracts/query';
import * as React from 'react';
import { useContext } from '../../context';
import { addresses } from '../../contracts';
import StatCard from '../StatCard';

const StakeProviderViews = () => {
    const { dapp, address } = useContext();

    const [allNodesStats, setAllNodesStats] = React.useState(0);
    const [claimableRewards, setClaimableRewards] = React.useState(1);
    React.useEffect(() => {
        getClaimableRewards();
        getAllNodesStatus();
    }, [])
    const getClaimableRewards = () => {
        const query = new Query({
            address: new Address(addresses["delegation_smart_contract"]),
            func: new ContractFunction('getClaimableRewards'),
            args: [Argument.fromPubkey(new Address(address))]
        })
        dapp.proxy.queryContract(query)
            .then((value) => {
                setClaimableRewards(value.returnData[0].asNumber)
            })
            .catch(e => console.log("error ", e))
    }

    const getAllNodesStatus = () => {
        const query = new Query({
            address: new Address(addresses["delegation_smart_contract"]),
            func: new ContractFunction('getAllNodeStates'),
            caller: new Address(address)
        })
        dapp.proxy.queryContract(query)
            .then((value) => {
                console.log("getAllNodeStates ", value)
                setAllNodesStats(value.returnData[0].asNumber)
            })
            .catch(e => {
                console.log("error ", e)
            })
    }
    return (
        <div className="row stats full-width">
            <div className="col-12 mb-spacer">
                <div className="card card-small">
                    {"Network overview" && (
                        <div className="card-header border-bottom">
                            <h6 className="m-0">Network overview</h6>
                        </div>
                    )}<div className="card-body d-flex flex-wrap p-3">
                        <StatCard title="Nodes status" value={claimableRewards}></StatCard>
                        <StatCard title="Total rewards" value={allNodesStats}></StatCard>
                        <StatCard title="Future rewards" value={allNodesStats}></StatCard>
                        <StatCard title="Future rewards" value={allNodesStats}></StatCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StakeProviderViews;
