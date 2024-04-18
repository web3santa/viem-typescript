import {
  Hex,
  createPublicClient,
  createWalletClient,
  formatEther,
  getContract,
  http,
  parseEther,
  publicActions,
  toHex,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

import doteven from "dotenv";
import boomJson from "../artifacts/Boom.json";
doteven.config();

const { abi, bytecode } = boomJson;
const privateKey = process.env.PRIVATE_KEY;
const account = privateKeyToAccount(privateKey as Hex);

(async () => {
  const client = await createWalletClient({
    account,
    transport: http(process.env.API_URL),
    chain: sepolia,
  });

  const contractAddress = "0x6f19ed66c4ba21ff35772517dba2855ebd845bdc";

  if (contractAddress) {
    const contract = await getContract({
      address: contractAddress,
      abi,
      client,
    });

    await contract.watchEvent.XWasChanged({
      onLogs: (logs) => console.log(logs),
    });
    let x = 55;
    setInterval(async () => {
      await contract.write.changeX([x]);
      x++;
    }, 3000);
  }
})();
