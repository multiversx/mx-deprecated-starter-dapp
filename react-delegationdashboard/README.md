# Dapp boilerplate for Delegation

The react implementation for Dashboard Delegation

## Instalation and running
### Requirements
Node version: v12.13.0

### Step 1. Install modules
Run ```npm install```

### Step 2. Update Configs

In the application root folder there are 3 config files (config.internal, config.testnet, config.mainnet).
Based on the environment used for running the configs will need to be updated
- delegationContract : should contain the address of the Delegation Smart Contract received after the creation of Delegation Smart Contract
- also check the walletAddress, apiAddress and explorerAddress

### Step 3. Build the solution
For internal run => ```npm run build-internal``` (for intrnal build the package.json script for start will need to be updated and remove the Https restriction)

For testnet run => ```npm run build-testnet```

For mainnet run => ```npm run build-mainnet```

### Step 4. Run the application
For development run => ```npm run start```
