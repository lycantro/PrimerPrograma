import lottery_contract from "../../build/contracts/Prediction.json";

const loadBlockchainData = async () => {
  const networkDeploy = 97;
  const web3 = window.web3;
  //carga de la cuenta
  let contract;
  const accounts = await web3.eth.getAccounts();
  console.log("Account: ", accounts[0]);
  const networkId = "97"; //---------------------------------------aca se cambia segun la red donde se despliegue ganache: 5777 BscTestnet: 97
  console.log("NetworkId: ", networkId);
  const networkData = lottery_contract.networks[networkId];
  console.log("NetworkData: ", networkData);
  const network = await web3.eth.getChainId();

  if (network !== networkDeploy) {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x61" }], // chainId must be in hexadecimal numbers
    });
  }

  if (networkData) {
    const abi_lottery = lottery_contract.abi;
    console.log("Abi SC: ", abi_lottery);
    const address = networkData.address;
    console.log("Address SC: ", address);
    contract = new web3.eth.Contract(abi_lottery, address); //asi se instancia el contrato
  } else {
    window.alert("El smart contrat no se ha desplegado en la red");
  }

  return {
    account: accounts[0],
    contract: contract ?? "Contract error",
  };
};

export default loadBlockchainData;
