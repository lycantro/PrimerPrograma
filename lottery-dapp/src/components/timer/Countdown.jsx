import React, { useEffect, useState } from "react";
import loadWeb3 from "../../utils/functions/loadWeb3";
import loadBlockchainData from "../../utils/functions/loadBlockchainData";
import userLotteryBalanceUpdate from "../Prediction/Prediction";

const CountDownTimer = ({ minSecs }) => {
  const { minutes = 0, seconds = 60 } = minSecs;
  const [[mins, secs], setTime] = useState([minutes, seconds]);

  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [time_locked, setTimeLocked] = useState(0);
  const [time_reward, setTimeReward] = useState(0);

  useEffect(() => {
    timeLocked();
    //carga de web3
    loadWeb3();
    //carga de los datos de la blockchain
    loadBlockchainData().then((current_contract) => {
      setAccount(current_contract.account);
      setContract(current_contract.contract);
    });
  }, []);

  const timeLocked = async () => {
    contract.methods
      .timeLoked()
      .call()
      .then((value) => {
        setTimeLocked(value);
      });
  };
  const rewards = async () => {
    timeLocked();

    const last_block = await window.web3.eth.getBlockNumber();
    const block = await window.web3.eth.getBlock(last_block);
    const timestamp = block.timestamp;
    const time = new Date(timestamp * 1000); //x1000 to convert from seconds to milliseconds
    const minutes_time_actual = time.getMinutes(); //Tiempo actual
    const seconds_time_actual = time.getSeconds(); //Tiempo actual
    console.log("Time actual: ", minutes_time_actual, " ", seconds_time_actual);

    const date_time_locked = new Date(time_locked * 1000); //x1000 to convert from seconds to milliseconds
    const minutes_time_locked = date_time_locked.getMinutes(); //Tiempo bloqueado
    const seconds_time_locked = date_time_locked.getSeconds(); //Tiempo actual
    console.log("Time locked: ", minutes_time_locked, " ", seconds_time_locked);

    if (
      Math.abs(minutes_time_actual - minutes_time_locked) > 5 &&
      Math.abs(seconds_time_actual - seconds_time_locked) > 0
    ) {
      const c = contract;
      const rewardsCalculatedTx = contract.methods.RewardsCalculated();
      const private_key = process.env.REACT_APP_PRIVATE_KEY;
      const Tx = {
        to: c._address,
        data: rewardsCalculatedTx.encodeABI(),
        gas: 2000000,
      };

      const createTransaction = await window.web3.eth.accounts.signTransaction(
        Tx,
        private_key,
        async function (err, data) {
          await window.web3.eth.sendSignedTransaction(data.rawTransaction);
          console.log("Transaction send: ", data);
        }
      );
      userLotteryBalanceUpdate();
    }
  };
  const tick = async () => {
    if (mins === 0 && secs === 0) {
      reset();
    } else if (secs === 0) {
      setTime([mins - 1, 59]);
    } else {
      setTime([mins, secs - 1]);
    }
  };
  const reset = () => {
    rewards();
    setTime([parseInt(minutes), parseInt(seconds)]);
  };

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <div>
      <div>{`${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`}</div>
    </div>
  );
};

export default CountDownTimer;
