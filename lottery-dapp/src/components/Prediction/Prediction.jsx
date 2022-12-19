import React, { useEffect, useState } from "react";

import loadWeb3 from "../../utils/functions/loadWeb3";
import loadBlockchainData from "../../utils/functions/loadBlockchainData";

import "./Prediction.css";

const Prediction = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [bet_up_factor, setBetUpFactor] = useState(0);
  const [bet_down_factor, setBetDownFactor] = useState(0);
  const [bet_prediction_pool, setPredictionPool] = useState(0);
  const [price_pair, setPricePair] = useState(0);

  useEffect(() => {
    //carga de web3
    loadWeb3();
    //carga de los datos de la blockchain
    loadBlockchainData().then((current_contract) => {
      setAccount(current_contract.account);
      setContract(current_contract.contract);
    });
  }, []);

  const betUpFactor = async () => {
    contract.methods
      .betUpFactor()
      .call()
      .then((value) => {
        setBetUpFactor(value);
      });
  };

  const betDownFactor = async () => {
    contract.methods
      .betDownFactor()
      .call()
      .then((value) => {
        setBetDownFactor(value);
      });
  };

  const betPredictionPool = async () => {
    contract.methods.call().then((value) => {
      setPredictionPool(value);
    });
  };

  const pricePair = async () => {
    contract.methods.call().then((value) => {
      setPricePair(value);
    });
  };

  return (
    <div>
      <div className="tittle_prediction">PREDICTION</div>
      <div className="number_game_prediction"> Juego #40</div>
      <div className="line_img"></div>
      <div className="price_loked">Precio fijado: $4564532 USD</div>
      <div className="actual_pool">Pool Actual: ${bet_prediction_pool} USD</div>
      <div className="time"> Tiempo restante</div>
      <div className="countdown"> 03:23 m</div>
      <div className="up_price">UP {bet_up_factor}X Pay</div>
      <div className="actual_price">$16.952.25</div>
      <div className="pair">BTC/USD</div>
      <div className="down_price">DOWN {bet_down_factor}X Pay</div>

      <div className="user_interactive_prediction">
        <div className="btns_up_down">
          <button className="btn_up">UP </button>
          <input className="input_amount_prediction" placeholder="USD" />
          <button className="btn_down">DOWN </button>
        </div>
        <div className="texts_prediction">
          <div className="minimun_amount">1 USD min</div>
          <div className="user_balance">Your Balance: 42 USD</div>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
