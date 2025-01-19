# Multi-Signature Wallet

A secure Ethereum multi-signature wallet smart contract implementation that requires multiple confirmations for transaction execution.

## Features

- Multiple owner management
- Configurable number of required confirmations
- Transaction submission and execution
- Confirmation management
- Event logging
- Complete test coverage

## Prerequisites

- Node.js >= 14.0.0
- npm >= 6.0.0

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd multisig-wallet
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

## Usage

### Compile Contracts
```bash
npx hardhat compile
```

### Run Tests
```bash
npx hardhat test
```

### Deploy
```bash
npx hardhat run scripts/deploy.js --network <network-name>
```

## Contract Functions

- `submitTransaction`: Submit a new transaction for approval
- `confirmTransaction`: Confirm a pending transaction
- `executeTransaction`: Execute a transaction after sufficient confirmations
- `revokeConfirmation`: Revoke a confirmation for a transaction
- `getOwners`: Get the list of wallet owners
- `getTransaction`: Get transaction details
- `getTransactionCount`: Get total number of transactions

## Security

This contract includes:
- Multiple signature requirements
- Owner-only access controls
- Transaction execution controls
- Confirmation management
- Event logging for transparency

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details