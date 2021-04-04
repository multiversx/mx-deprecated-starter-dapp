import React, { useEffect, useState } from 'react';
import { useContext, useDispatch } from 'context';
import fetchGraphQL from '../../../fetchGraphQL';
import { graphql } from 'babel-plugin-relay/macro';
import {
    Transaction,
    GasLimit,
    GasPrice,
    Address,
    TransactionPayload,
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

interface IPair {
    token_a: string,
    token_b: string,
    address: string
}


const SwapFixedOutputAction = () => {
    const classes = useStyles();
    const { account, dapp, loading } = useContext();
    const [tokenA, setTokenA] = useState('');
    const [tokenB, setTokenB] = useState('');
    const [amountOut, setAmountOut] = useState(0);

    const client = new GraphQLClient('http://localhost:3005/graphql', {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const handleAddLiquidity = () => {
        console.log('Send Transaction');
        // const txArguments = new DelegationTransactionType(value, 'delegate');
        // sendTransactionWallet(txArguments);
        const pairsQuery = gql`
        {
            pairs {
                token_a
                token_b
                address
                info {
                    reserves_a
                    reserves_b
                    total_supply
                }
                price {
                    tokena_price
                    tokenb_price
                }
            }
        }
        `;

        const addLiquidityQuery = gql`
        query($address: String!, $tokenIn: String!, $amountInMax: Int!, $tokenOut: String!, $amountOut: Int!){
            swapTokensFixedOutput(
                address: $address,
                tokenIn: $tokenIn,
                amountInMax: $amountInMax,
                tokenOut: $tokenOut,
                amountOut: $amountOut
            ) {
                nonce
                value
                receiver
                gasPrice
                gasLimit
                data
                chainID
                version
            }
        }
        `;

        client.request(pairsQuery)
            .then(response => {
                const pairs = response.pairs;
                console.log(pairs);
                let pair = pairs.find((value: { token_a: string; token_b: string; address: string; }) => value.token_a == tokenA && value.token_b == tokenB);
                console.log(pair.address);
                let amountInMax = Math.floor(((amountOut * 1000 * pair.info.reserves_a) / ((pair.info.reserves_b - amountOut) * 997) + 1) * 1.01);
                const variables = {
                    address: pair.address,
                    tokenIn: tokenA,
                    amountInMax: amountInMax,
                    tokenOut: tokenB,
                    amountOut: amountOut,
                };
                console.log(variables);
                client.request(addLiquidityQuery, variables)
                    .then(response => {
                        const rawTransaction = response.swapTokensFixedOutput;
                        console.log(response);
                        rawTransaction.nonce = account?.nonce;
                        let transaction = new Transaction({
                            ...rawTransaction,
                            data: TransactionPayload.fromEncoded(rawTransaction.data),
                            receiver: new Address(rawTransaction.receiver),
                            gasLimit: new GasLimit(rawTransaction.gasLimit),
                            gasPrice: new GasPrice(rawTransaction.gasPrice),
                        });
                        console.log(transaction);

                        dapp.provider.sendTransaction(transaction);
                    }).catch(error => {
                        console.error(error);
                    });

            }).catch(error => {
                console.error(error);
            });
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid container spacing={2}>
                    <Box>
                        <h3>SWAP FIXED OUTPUT</h3>
                    </Box>
                </Grid>
                <Grid item md={4}>
                    <Input placeholder="Token A" type='text' onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setTokenA(ev.target.value)} />
                </Grid>
                <Grid item md={4}>
                    <Input placeholder="Token B" type='text' onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setTokenB(ev.target.value)} />
                </Grid>
                <Grid item md={4}>
                    <Button onClick={handleAddLiquidity}>
                        Swap Fixed Outptut
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item md={4}>
                    <Input placeholder="Amount Out" type='number' onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setAmountOut(parseInt(ev.target.value))} />
                </Grid>
                <Grid item md={4}>
                </Grid>
            </Grid>
        </div>
    );
};

export default SwapFixedOutputAction;
