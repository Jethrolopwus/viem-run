# important contract address, public key etc
{
  address: '0x4Ca582ACcEF2a243248C0537b16da7604b15BF15',
  nonceManager: undefined,
  sign: [AsyncFunction: sign],
  experimental_signAuthorization: [AsyncFunction: experimental_signAuthorization],
  signMessage: [AsyncFunction: signMessage],
  signTransaction: [AsyncFunction: signTransaction],
  signTypedData: [AsyncFunction: signTypedData],
  source: 'privateKey',
  type: 'local',
  publicKey: '0x049f9deb64edf54e1c83d3446b532dd4ee1436a40ebc06992202b894192542c35f31427e008ad57e4b357a3a83b6077ddcbd7fdf736c8000c1cb441d02eeb4946f'
}


# compiling the contract
solc --optimize --combined-json abi,bin contracts/Fun.sol > artifacts/Fun.sol

# to run the application by file name
npx ts-node src/contracts.ts 