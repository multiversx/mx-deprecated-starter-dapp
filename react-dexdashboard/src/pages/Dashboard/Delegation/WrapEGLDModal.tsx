import React, { useEffect, useState } from 'react';
import { useContext, useDispatch } from 'context';
import fetchGraphQL from '../../../fetchGraphQL';
import { graphql } from 'babel-plugin-relay/macro';
import {
    Transaction,
    GasLimit,
    GasPrice,
    Address,
    SmartContract,
    ContractFunction,
    Balance
} from '@elrondnetwork/erdjs';
import {
    Grid,
    Button,
    Input,
    Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { request, gql, GraphQLClient } from 'graphql-request';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const WrapEGLDAction = () => {
    const classes = useStyles();
    const { account, dapp } = useContext();
    const [egldAmount, setEgldAmount] = useState('');


    const handleAddLiquidity = () => {
        console.log('Send Transaction');
        let contract = new SmartContract({ address: new Address('erd1qqqqqqqqqqqqqpgqte2prd032ffa43nyhzae4pdsws62hcnv0n4s242vf5') });
        let transaction = contract.call({
            func: new ContractFunction('wrapEgld'),
            gasLimit: new GasLimit(10000000)
        });
        transaction.value = Balance.eGLD(parseInt(egldAmount));
        transaction.nonce = account?.nonce;
        console.log(transaction);

        dapp.provider.sendTransaction(transaction);
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Box>
                    <h3>WRAP EGLD</h3>
                </Box>
            </Grid>
            <Grid container spacing={2}>
                <Grid item md={3}>
                    <Input placeholder="EGLD Amount" type='string' onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setEgldAmount(ev.target.value)} />
                </Grid>
                <Grid item md={3}>
                    <Button onClick={handleAddLiquidity}>
                        Wrap xEGLD
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default WrapEGLDAction;
