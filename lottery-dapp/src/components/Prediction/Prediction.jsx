import React, { useEffect, useState } from "react";
import CountDownTimer from "../timer/Countdown";

import loadWeb3 from "../../utils/functions/loadWeb3";
import loadBlockchainData from "../../utils/functions/loadBlockchainData";

import "./Prediction.css";

const Prediction = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [user_deposits, setUserDeposits] = useState(0);
  const [bet_up_factor, setBetUpFactor] = useState(0);
  const [bet_down_factor, setBetDownFactor] = useState(0);
  const [bet_prediction_pool, setPredictionPool] = useState(0);
  const [price_pair, setPricePair] = useState(0);
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
    pricePairUpdate();
    priceLocked();
    userLotteryBalanceUpdate();
  }, [
    contract,
    account,
    price_pair,
    price_locked,
    value_choose,
    user_deposits,
  ]);

  setInterval(() => {
    pricePairUpdate();
  }, 10000);

  const userLotteryBalanceUpdate = async () => {
    console.log("me llamo");
    contract.methods
      .userDeposit()
      .call({ from: account })
      .then((amountDeposit) => {
        setUserDeposits(amountDeposit);
      });
  };

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

  const pricePairUpdate = async () => {
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

  const userUp = async (value) => {
    if (value > 0) {
      const _value = value * Math.pow(10, 18);
      contract.methods
        .priceUp(_value)
        .send({ from: account })
        .then(() => {
          betUpFactor();
          betDownFactor();
          betPredictionPool();
          pricePairUpdate();
          priceLocked();
        });
    }
  };

  const userDown = async (value) => {
    if (value > 0) {
      const _value = value * Math.pow(10, 18);
      contract.methods
        .priceDown(_value)
        .send({ from: account })
        .then(() => {
          betUpFactor();
          betDownFactor();
          betPredictionPool();
          pricePairUpdate();
          priceLocked();
        });
    }
  };

  return (
    <div>
      <div className="tittle_prediction">PREDICTION</div>
      <div className="number_game_prediction"> Juego #40</div>
      <div className="line_img"></div>
      <div className="price_loked">
        Precio fijado: ${price_locked.toString().substring(0, 3)}.
        {price_locked.toString().substring(3, 5)} BNB/USD
      </div>
      <div className="actual_pool">
        Pool Actual: $
        {(bet_prediction_pool * (1 / (1 * Math.pow(10, 18))))
          .toString()
          .substring(0, 7)}
        BNB
      </div>
      <div className="time"> Tiempo restante</div>
      <div className="countdown">
        <CountDownTimer minSecs={{ minutes: 5, seconds: 10 }} />
      </div>
      <div className="up_price">
        UP{" "}
        {(bet_up_factor * (1 / (1 * Math.pow(10, 18))))
          .toString()
          .substring(0, 4)}
        X Pay
      </div>
      <div className="actual_price">
        ${price_pair.toString().substring(0, 3)},
        {price_pair.toString().substring(3, 5)}
      </div>
      <div className="pair">BNB/USD</div>
      <div className="down_price">
        DOWN{" "}
        {(bet_down_factor * (1 / (1 * Math.pow(10, 18))))
          .toString()
          .substring(0, 4)}
        X Pay
      </div>

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
          <div className="minimun_amount">0.001 BNB min</div>
          <div className="user_balance">
            Your Balance:{" "}
            {(user_deposits * (1 / (1 * Math.pow(10, 18))))
              .toString()
              .substring(0, 6)}{" "}
            BNB
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
