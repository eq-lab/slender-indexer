# Configuration

Set the environment variables (or create an `.env` file in the root directory):

```
SLENDER_POOL_CONTRACT_ID=CC74P3CN6KT4LIKWLEJBL6MBY3HTOFQKCVPT5EMY2QC2YMNQCRYKG22O
SLENDER_POOL_DEPLOYMENT_LEDGER=325600

MONGO_INITDB_DATABASE=slender
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password
MONGO_CONNECTION_STRING=mongodb://localhost:27017/slender

HORIZON_URL=https://horizon-testnet.stellar.org
SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
```

Run `docker-compose -f docker-compose.yml up` wait for it to initialize completely.
