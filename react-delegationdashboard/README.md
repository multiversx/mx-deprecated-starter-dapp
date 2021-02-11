
<div style="text-align:center">
  <img
  src="https://raw.githubusercontent.com/ElrondNetwork/elrond-go/master/elrond_logo_01.svg"
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

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
* [React](https://reactjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Bootstrap](https://getbootstrap.com)



<!-- GETTING STARTED -->
## Getting Started

Follow the next step to start using this dapp

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
* node version 12.13.0

### Instalation and running

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


### Step 4. Run the application Run the application (in order to run the application on testnet env you don't have to build the solution, you can just run the following command)
For development run => ```npm run start```


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


