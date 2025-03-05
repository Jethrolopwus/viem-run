import { createWalletClient, getContract, Hex, http, publicActions, toHex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { arbitrumSepolia } from "viem/chains";
import Fun from "../artifacts/Fun.json";
import dotenv from "dotenv";

dotenv.config();

const { abi, bin } = Fun["contracts"]["contracts/Fun.sol:Fun"];

const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
  throw new Error("PRIVATE_KEY is not defined in .env");
}

const account = privateKeyToAccount(privateKey as Hex);

(async () => {
  const client = createWalletClient({
    account,
    chain: arbitrumSepolia,
    transport: http(process.env.API_URL),
  }).extend(publicActions);

  try {
    const hash = await client.deployContract({
      abi,
      bytecode: `0x${bin}`,
      
    });

    const contractAddress = await client.getTransactionReceipt({hash});

    if(!contractAddress){
        const contract = getContract({
            address: contractAddress,
            abi,
            client,
        });


        const x = await contract.read.x();
        const xchange = await contract.write.changex([BigInt(123)]);
        console.log(await contract.read.x());

        console.log({contractAddress});
                
    }

  } catch (error) {
    console.error("Error deploying contract:", error);

    const balance = await client.getBalance({ address: account.address });
    console.log(`Updated balance: ${Number(balance) / 1e18} ETH`);
    
  }
})();
