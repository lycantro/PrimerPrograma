import React, { useEffect, useState } from "react";
import loadWeb3 from "../utils/functions/loadWeb3";
import loadBlockchainData from "../utils/functions/loadBlockchainData";
import "./App.css";

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);

  useEffect(() => {
    //carga de web3
    loadWeb3();
    //carga de los datos d ela blockchain
    loadBlockchainData().then((current_contract) => {
      setContract(current_contract.contract);
      setAccount(current_contract.account);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Hola, sigo sirviendo</p>
      </header>
    </div>
  );
};

export default App;
