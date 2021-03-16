
<div style="text-align:center">
  <img
  src="https://raw.githubusercontent.com/ElrondNetwork/starter-dapp/master/react-delegationdashboard/preview.png"
  alt="Elrond Network">
</div>
<br>

[![](https://img.shields.io/badge/made%20by-Elrond%20Network-blue.svg)](http://elrond.com/)
<br />
<p align="center">

 <h3 align="center">Dapp boilerplate for Delegation </h3>

  <p align="center">
The react implementation for Dashboard Delegation
    <br />
    <br />
    <br />
    ·
    <a href="https://github.com/ElrondNetwork/starter-dapp/issues">Report Bug</a>
    ·
    <a href="https://github.com/ElrondNetwork/starter-dapp/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#built-with">Built With</a>    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>


### Built With

* [React](https://reactjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Bootstrap](https://getbootstrap.com)



<!-- GETTING STARTED -->
## Getting Started

The dapp is a client side only poject and is built using the Create React App scripts.

Follow the next step to start using this dapp or follow the next tutorial on [Youtube](https://www.youtube.com/watch?v=BkjUmBsmQYM&feature=youtu.be&ab_channel=ElrondNetwork)

### Prerequisites

For *development* you will need to have the following:

* node version 12.13.0
* npm

### Instalation and running

### Step 1. Install modules
From a terminal, navigate to the project folder and run ```npm install```

### Step 2. Update Configs

In the application's src folder there are 3 config files (config.devnet.ts, config.testnet.ts, config.mainnet.ts).

Based on the environment used the configs will need to be updated:
- delegationContract : should contain the address of the Delegation Smart Contract received after the creation of Delegation Smart Contract
- also check the walletAddress, apiAddress and explorerAddress

### Step 3. Build for testing and production use

A build of the app is necessary to deploy for testing purposes or for production use.
The dapp is configured with build scripts targeting either the public devnet, the public testnet or the public mainnet.

For testing on the devnet run => ```npm run build-devnet```

For testing on the testnet run => ```npm run build-testnet```

For production use on the mainnet run => ```npm run build-mainnet```

### Step 4. Run the dashboard

To run the project locally run ```npm run start``` from the project folder. This will start the React app in development mode, using the configs found in the config.ts file.

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/ElrondNetwork/starter-dapp/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

One can contribute by creating *pull requests*, or by opening *issues* for discovered bugs or desired features.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Developers

The [Elrond Team](https://elrond.com/team/).


