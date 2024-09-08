# Morphic

Morphic is a credit score prediction system that leverages LLMs (Large Language Models) and Homomorphic Encryption to generate hybrid credit scores, combining both on-chain and off-chain information. This system is designed to provide traditional and DeFi lenders with a way to assess borrowing capacity, especially in developing countries where credit score data might be fragmented or unavailable.

## Project Overview

The project is built on a Yarn monorepo structure with two primary packages:

- `client:` a Next.js project for the front-end DApp, which allows users to interact with the system.
- `smart-contracts`: This contains two subfolders, fhenix-hardhat and galadriel, both of which are Hardhat projects designed for smart contract development related to the credit scoring logic.

### Sponsors and Technology Stack

- **Fhenix:** Provides homomorphic encryption to securely process users’ hybrid credit scores.
- **Galadriel:** Utilizes LLM interaction on-chain to determine the coefficients (ax + b) for linear regression, crucial in off-chain credit scoring.
- **Web3Auth:** Powers the social login functionality for easy DApp access.

## Key Features

- **Hybrid Credit Scoring:** Combines both on-chain and off-chain data for a comprehensive view of a user’s creditworthiness.
- **LLM and Machine Learning:** LLMs are used to determine key linear regression coefficients based on off-chain data.
- **Homomorphic Encryption:** Ensures that sensitive data (e.g., credit history) can be processed securely without exposing raw data to third parties.
- **DeFi and Traditional Lenders:** The system is designed to bridge the gap between traditional credit assessment and DeFi, offering a secure, trustworthy credit score prediction.
- **Social Login:** Powered by Web3Auth, enabling a seamless user experience with easy access through common login providers.

## Benefits

- **Empowering Developing Countries:** Provides a solution for individuals in developing countries who may not have access to traditional credit scoring systems.
- **Privacy-Preserving:** Homomorphic encryption ensures that users’ financial data remains private and secure during the credit score calculation process.
- **Seamless On-Chain Integration:** By utilizing smart contracts and LLMs, Morphic makes credit score data verifiable and accessible on-chain.
- **User-Friendly Interface:** A DApp built on Next.js offers a clean and intuitive interface for users and lenders alike.

## Folder Structure

```
morphic/
├── packages/
│   ├── client/                # Next.js DApp for the front-end interface
│   └── smart-contracts/
│       ├── fhenix-hardhat/    # Hardhat project for homomorphic encryption functionality
│       └── galadriel/         # Hardhat project for LLM-based linear regression smart contracts
├── README.md
├── yarn.lock
└── package.json
```

## Run the Project

### Prerequisites

- Node.js (v16 or higher)
- Yarn (v1.22 or higher)
- Hardhat (for smart contract development)
- Next.js (for the front-end)

### Set up

1. Clone the repository:

```
git clone https://github.com/dacarva/morphic.git
cd morphic
```

2. Install dependencies:

```
yarn install
```

3. Add env vars on client

```
cd packages/client
touch .env
echo "NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=<your-client-id>" >> .env
```

4. Run the project:

```
yarn dev
```

### Authors

- [dacarva](https://github.com/dacarva)
- [scguaquetam](https://github.com/scguaquetam)
- [rookiecol](https://github.com/RookieCol)
- [flash](https://github.com/chrisarevalo11)
