import React, { useEffect, useState } from 'react';
import { useContext, useDispatch } from 'context';
import {
    Transaction,
    GasLimit,
    GasPrice,
    Address,
    TransactionPayload,
    Balance,
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


const CreatePairAction = () => {
    const classes = useStyles();
    const { account, dapp, loading, serviceAddress } = useContext();
    const [tokenA, setTokenA] = useState('');
    const [tokenB, setTokenB] = useState('');

    const client = new GraphQLClient(serviceAddress, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const handleCreatePair = () => {
        console.log('Send Transaction');
        const createPairQuery = gql`
        query($tokenA: String!, $tokenB: String!){
            createPair(
                token_a: $tokenA,
                token_b: $tokenB
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

        const variables = {
            tokenA: tokenA,
            tokenB: tokenB
        };

        client.request(createPairQuery, variables)
            .then(response => {
                const rawTransaction = response.createPair;
                console.log(rawTransaction);
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
    };

    const handleIssueLpToken = () => {
        console.log('Send Transaction');
        const pairsQuery = gql`
        {
            pairs {
                token_a
                token_b
                address
            }
        }
        `;

        const issueLPTokenQuery = gql`
        query($address: String!, $lpTokenName: String!, $lpTokenTicker: String!){
            issueLPToken(
                address: $address,
                lpTokenName: $lpTokenName,
                lpTokenTicker: $lpTokenTicker
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
                if (pair == undefined) {
                    pair = pairs.find((value: { token_a: string; token_b: string; address: string; }) => value.token_b == tokenA && value.token_a == tokenB);
                }
                if (pair == undefined) {
                    alert('PAIR NOT AVAILABLE');
                    return;
                }

                console.log(pair.address);
                const variables = {
                    address: pair.address,
                    lpTokenName: 'LiquidityToken' + pair.token_a[0] + pair.token_b[0],
                    lpTokenTicker: 'LPT' + pair.token_a[0] + pair.token_b[0]
                };
                client.request(issueLPTokenQuery, variables)
                    .then(response => {
                        const rawTransaction = response.issueLPToken;
                        console.log(response);
                        rawTransaction.nonce = account?.nonce;
                        let transaction = new Transaction({
                            ...rawTransaction,
                            data: TransactionPayload.fromEncoded(rawTransaction.data),
                            receiver: new Address(rawTransaction.receiver),
                            gasLimit: new GasLimit(rawTransaction.gasLimit),
                            gasPrice: new GasPrice(rawTransaction.gasPrice),
                        });
                        transaction.value = Balance.eGLD('5');
                        console.log(transaction);

                        dapp.provider.sendTransaction(transaction);
                    }).catch(error => {
                        console.error(error);
                    });

            }).catch(error => {
                console.error(error);
            });
    };

    const handleSetLocalRoles = () => {
        console.log('Send Transaction');
        const pairsQuery = gql`
        {
            pairs {
                token_a
                token_b
                address
            }
        }
        `;

        const setLocalRolesQuery = gql`
        query($address: String!){
            setLocalRoles(
                address: $address,
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
                if (pair == undefined) {
                    pair = pairs.find((value: { token_a: string; token_b: string; address: string; }) => value.token_b == tokenA && value.token_a == tokenB);
                }
                if (pair == undefined) {
                    alert('PAIR NOT AVAILABLE');
                    return;
                }

                console.log(pair.address);
                const variables = {
                    address: pair.address,
                };
                client.request(setLocalRolesQuery, variables)
                    .then(response => {
                        const rawTransaction = response.setLocalRoles;
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
                <Box>
                    <h3>CREATE PAIR</h3>
                </Box>
            </Grid>
            <Grid container spacing={2}>
                <Grid item md={3}>
                    <Input placeholder="Token A" type='text' onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setTokenA(ev.target.value)} />
                </Grid>
                <Grid item md={3}>
                    <Input placeholder="Token B" type='text' onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setTokenB(ev.target.value)} />
                </Grid>
                <Grid item md={2}>
                    <Button onClick={handleCreatePair}>
                        CREATE PAIR
                    </Button>
                </Grid>
                <Grid item md={2}>
                    <Button onClick={handleIssueLpToken}>
                        ISSUE LP TOKEN
                    </Button>
                </Grid>
                <Grid item md={2}>
                    <Button onClick={handleSetLocalRoles}>
                        SET LOCAL ROLES
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default CreatePairAction;
