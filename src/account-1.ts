import { createPublicClient, formatEther, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { arbitrumSepolia } from "viem/chains";
import dotenv from "dotenv";

dotenv.config();
const privateKey =
  "0x9ce7cff1b87575aeebd187348f6b4d149cc8149210709cc06d8c74b8d043b278";

const account = privateKeyToAccount(privateKey);
//   IIFE
(async () => {
  const client = createPublicClient({
    chain: arbitrumSepolia,
    transport: http(process.env.API_URL),
  });

  const balance = await client.getBalance({
    address: account.address,
  });
  console.log(formatEther(balance));
  const nonce = await client.getTransactionCount({
    address: account.address,
  })
  console.log(nonce);
  
})();

  
