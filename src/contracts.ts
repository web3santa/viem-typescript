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
  const client = createWalletClient({
    account,
    chain: sepolia,
    transport: http(process.env.API_URL),
  }).extend(publicActions);

  // const hash = await client.deployContract({
  //   abi: abi,
  //   bytecode: bytecode.object as Hex,
  //   args: [444n],
  // });

  const { contractAddress } = await client.getTransactionReceipt({
    hash: "0xe7ef3c6d21bd78a544834ca2de976effdb11da231f0311231a351801377a3d24",
  });

  console.log(contractAddress);

  if (contractAddress) {
    const contract = getContract({
      address: contractAddress,
      abi,
      client,
    });

    const x = await contract.read.x();
    console.log(x);

    const y = await contract.write.changeX([989898n]);

    const c = await contract.read.x();
    console.log(c);

    // let x = await client.readContract({
    //   address: contractAddress,
    //   abi: abi,
    //   functionName: "x",
    // });
    // console.log(x);

    // await client.writeContract({
    //   address: contractAddress,
    //   abi: abi,
    //   functionName: "changeX",
    //   args: [333n],
    // });

    // const x2 = await client.readContract({
    //   address: contractAddress,
    //   abi: abi,
    //   functionName: "x",
    // });
    // console.log(x2);

    // const x = await client.getStorageAt({
    //   address: contractAddress,
    //   slot: toHex(0),
    // });
    // console.log(x);
  }

  // * const result = await client.readContract({
  // *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  // *   abi: parseAbi(['function balanceOf(address) view returns (uint256)']),
  // *   functionName: 'balanceOf',
  // *   args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'],
  // * })
})();
