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
  //     hash: "0x5cec7bcb3070419af4504ca7bc46c8582b4363b5f0ea22d61bdbd10f0db7174e",
  //   });
  //   console.log(transaction);
})();
