import contrato_loteria from "../../build/contracts/Prediction.json";

const loadBlockchainData = async () => {
  const networDeploy = 97;
  const web3 = window.web3;
  //carga de la cuenta
  let contract;
  const accounts = await web3.eth.getAccounts();
  console.log("Account: ", accounts[0]);
  const networkId = "97"; //---------------------------------------aca se cambia segun la red donde se despliegue ganache: 5777 BscTestnet: 97
  console.log("NetworkId: ", networkId);
  const networkData = contrato_loteria.networks[networkId];
  console.log("NetworkData: ", networkData);
  const network = await web3.eth.getChainId();
  console.log("Network Id:", network);

  if (network != networDeploy) {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x61" }], // chainId must be in hexadecimal numbers
    });
  }

  if (networkData) {
    const abi = contrato_loteria.abi;
    console.log("Abi: ", abi);
    const address = networkData.address;
    console.log("Address SC: ", address);
    contract = new web3.eth.Contract(abi, address); //asi se instancia el contrato
  } else {
    window.alert("El smart contrat no se ha desplegado en la red");
  }

  return {
    account: accounts[0],
    contract: contract ?? "Contract error",
  };
};

export default loadBlockchainData;
