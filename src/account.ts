import {
  Hex,
  createPublicClient,
  createWalletClient,
  formatEther,
  http,
  parseEther,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

import doteven from "dotenv";

doteven.config();

const privateKey = process.env.PRIVATE_KEY;
const account = privateKeyToAccount(privateKey as Hex);

(async () => {
  const client = createPublicClient({
    chain: sepolia,
    transport: http(process.env.API_URL),
  });

  const maxPriorityFeePerGas = await client.estimateMaxPriorityFeePerGas();

  console.log(maxPriorityFeePerGas);

  //   const balance = await client.getBalance({
  //     address: account.address,
  //   });

  //   console.log(formatEther(balance));

  //   const nonce = await client.getTransactionCount({
  //     address: account.address,
  //   });

  //   console.log(nonce);

  //   const transaction = await client.getTransaction({
  //     hash: "",
  //   });
  //   console.log(transaction);
})();
