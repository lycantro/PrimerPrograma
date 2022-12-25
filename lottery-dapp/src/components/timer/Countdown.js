import React, { useEffect, useState } from "react";
import { Chain, Common, Hardfork } from '@ethereumjs/common'

import loadWeb3 from "../../utils/functions/loadWeb3";
import loadBlockchainData from "../../utils/functions/loadBlockchainData";

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

    

    if (minutes_time_actual - minutes_time_locked > 0) {
      var Tx = require('ethereumjs-tx').Transaction;
      var privateKey = Buffer.from('ed8b712ed1a4ec98a05e34383329710a4de0c18789c4d222cff19958a8251adf', 'hex');
      const common = new Common({ chain: Chain.Mainnet})
      const c = contract;
      const rewardsCalculatedTx = contract.methods.RewardsCalculated();
var rawTx = {
  to: c._address,
  chainId: 97,
  data:rewardsCalculatedTx.encodeABI(),
}

var tx = new Tx(rawTx, {'chain':'ropsten'});
tx.sign(privateKey);

var serializedTx = tx.serialize();

console.log(serializedTx.toString('hex'));


web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
.on('receipt', console.log);
      /* 
      const c = contract;
      const rewardsCalculatedTx = contract.methods.RewardsCalculated();//contract.methods.getSender();
      console.log("hola")
      const priveKey =
        "0xed8b712ed1a4ec98a05e34383329710a4de0c18789c4d222cff19958a8251adf";

      const createTransaction = await window.web3.eth.accounts.signTransaction(
        { 
          from: '0xFbe2556Cba9BB1D2F184db64197593D8D14A218f',
          to: c._address,
          data: rewardsCalculatedTx.encodeABI(),
          gas: await rewardsCalculatedTx.estimateGas(),
        },
        priveKey,function (error, signedTx) {
          if (error) {
          console.log(error);}}
      );

      const createReceipt = await window.web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction,
        (err, txHash) => {
          console.log("err:", err, "txHash:", txHash);
        }
      );

      console.log(
        `Transaction send with hash: ${createReceipt.transactionHash}`
      );*/

      /*
      console.log("Entre");
      contract.methods
        .RewardsCalculated()
        .send({ from: account })
        .then(() => {
          console.log("Ejecutado");
          timeLocked();
        });*/
    }
  };
  const tick = async () => {
    if (mins === 0 && secs === 0) {
      reset();
    } else if (secs === 0) {
      setTime([mins - 1, 59]);
      timeLocked();
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
