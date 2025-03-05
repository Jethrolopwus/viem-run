
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

const contractAddress = "0x4Ca582ACcEF2a243248C0537b16da7604b15BF15";

(async() =>{
    const client = await createWalletClient({
        account: contractAddress,
        transport: http(process.env.API_URL),
        chain: arbitrumSepolia,
    });
    const contract = await getContract({
        address: contractAddress,
        abi,
        client,
    });
   const events =  await contract.getEvents.xchange({
        fromBlock: BigInt(0),
    });
    console.log(events);

         await contract.watchEvent.xchange({
       onLogs: (logs) => console.log(logs),
    });
    console.log(events);

    let x = BigInt(55);
    setInterval(async() => {
        await contract.write.xchange([x])
        x++;
    }, 3000);

    
})();