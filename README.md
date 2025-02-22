# Decentralized Drive Project

A decentralized file storage system built with Ethereum smart contracts and React.

## Tech Stack

- **Smart Contract Development**:

  - Solidity
  - Hardhat (Development Environment)
  - Ethers.js (Blockchain Interaction)

- **Frontend**:

  - React 18
  - Vite (Build Tool)
  - TailwindCSS (Styling)
  - React Router DOM (Navigation)
  - React-PDF & React-Player (File Preview)

- **Infrastructure**:
  - IPFS (File Storage)
  - Infura (Ethereum Node Provider)

## Project Structure

```
decentralized_drive/
├── contracts/           # Smart contracts
├── scripts/            # Deployment scripts
├── test/              # Contract test files
├── client/            # React frontend application
│   ├── src/
│   ├── public/
│   └── package.json
├── hardhat.config.js  # Hardhat configuration
└── .env              # Environment variables
```

## Environment Setup

1. Create a `.env` file in the root directory:

```
INFURA_API_KEY=your_infura_api_key
PRIVATE_KEY=your_wallet_private_key
```

⚠️ Never commit your real private keys or API keys to GitHub!

## Smart Contract Deployment

1. Install dependencies:

```bash
npm install
```

2. Compile contracts:

```bash
npx hardhat compile
```

3. Deploy to local network:

```bash
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

4. Deploy to testnet (e.g., Sepolia):

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## Frontend Development

1. Navigate to client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

## Key Features

- Decentralized file storage using IPFS
- File upload and management through Ethereum smart contracts
- Support for various file types (PDF, video, etc.)
- Secure access control using blockchain authentication

## Architecture

1. **Smart Contract Layer**:

   - Handles file metadata storage
   - Manages access permissions
   - Tracks file ownership

2. **Frontend Layer**:

   - User interface for file management
   - Web3 integration for blockchain interaction
   - File preview capabilities

3. **Storage Layer**:
   - IPFS for decentralized file storage
   - Content addressing for file retrieval

## Best Practices

- Always use environment variables for sensitive data
- Test smart contracts thoroughly before deployment
- Use the latest stable versions of dependencies
- Follow React best practices and component structure
- Implement proper error handling for blockchain transactions

## Testing

```bash
# Run smart contract tests
npx hardhat test

# Run with gas reporting
REPORT_GAS=true npx hardhat test
```
