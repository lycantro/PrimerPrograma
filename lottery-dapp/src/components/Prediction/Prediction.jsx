import React, { useEffect, useState } from "react";
import CountDownTimer from "../timer/Countdown";

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
  const [time_locked, setTimeLocked] = useState(0);
  const [time_reward, setTimeReward] = useState(0);
  const [price_locked, setPriceLocked] = useState(0);
  const [value_choose, setValueChoose] = useState(0);

  useEffect(() => {
    //carga de web3
    loadWeb3();
    //carga de los datos de la blockchain
    loadBlockchainData().then((current_contract) => {
      setAccount(current_contract.account);
      setContract(current_contract.contract);
    });
  }, []);

  useEffect(() => {
    betUpFactor();
    betDownFactor();
    betPredictionPool();
    pricePair();
    priceLocked();
    timeLocked();
  }, [contract, account, price_pair, value_choose]);

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
    contract.methods
      .betTotalPrediction()
      .call()
      .then((value) => {
        setPredictionPool(value);
      });
  };

  const pricePair = async () => {
    contract.methods
      .pricePair()
      .call()
      .then((value) => {
        setPricePair(value);
      });
  };

  const priceLocked = async () => {
    contract.methods
      .priceLoked()
      .call()
      .then((value) => {
        setPriceLocked(value);
      });
  };

  const timeLocked = async () => {
    contract.methods
      .timeLoked()
      .call()
      .then((value) => {
        CountDownTimer({ minutes: 5, seconds: 0 });
        var d = new Date(value * 1000); //x1000 to convert from seconds to milliseconds
        var dr = d;
        var s = d.toUTCString();
        var sr = dr.setMinutes(d.getMinutes() + 5);
        console.log(sr);
        sr = dr.toUTCString();

        s = s.substring(0, s.indexOf("GMT")) + "UTC"; //change the confusing 'GMT' to 'UTC'
        sr = sr.substring(0, sr.indexOf("GMT")) + "UTC"; //change the confusing 'GMT' to 'UTC'
        console.log("Time locked: ", s, " Time reward: ", sr);
        setTimeLocked(s);
      });
  };

  const userUp = async (value) => {
    contract.methods
      .priceUp(value)
      .send({ from: account })
      .then(() => {
        betUpFactor();
        betDownFactor();
        betPredictionPool();
        pricePair();
        priceLocked();
        timeLocked();
      });
  };

  const userDown = async (value) => {
    contract.methods
      .priceDown(value)
      .send({ from: account })
      .then(() => {
        betUpFactor();
        betDownFactor();
        betPredictionPool();
        pricePair();
        priceLocked();
        timeLocked();
      });
  };
  return (
    <div>
      <div className="tittle_prediction">PREDICTION</div>
      <div className="number_game_prediction"> Juego #40</div>
      <div className="line_img"></div>
      <div className="price_loked">Precio fijado: ${price_locked} USD</div>
      <div className="actual_pool">Pool Actual: ${bet_prediction_pool} USD</div>
      <div className="time"> Tiempo restante</div>
      <div className="countdown">
        <CountDownTimer minSecs={{ minutes: 5, seconds: 0 }} />
      </div>
      <div className="up_price">UP {bet_up_factor}X Pay</div>
      <div className="actual_price">${price_pair}</div>
      <div className="pair">BTC/USD</div>
      <div className="down_price">DOWN {bet_down_factor}X Pay</div>

      <div className="user_interactive_prediction">
        <div className="btns_up_down">
          <button
            className="btn_up"
            onClick={() => {
              userUp(value_choose);
            }}
          >
            UP
          </button>
          <input
            className="input_amount_prediction"
            type="number"
            placeholder="USD"
            value={value_choose === 0 ? "" : value_choose}
            onChange={(event) => {
              setValueChoose(event.target.value);
            }}
          />
          <button
            className="btn_down"
            onClick={() => {
              userDown(value_choose);
            }}
          >
            DOWN
          </button>
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
