import React, { useEffect, useState } from "react";

import loadWeb3 from "../utils/functions/loadWeb3";
import loadBlockchainData from "../utils/functions/loadBlockchainData";

import "./App.css";
import Logo from "../assets/images/CL_Logo.png";
import Prediction from "./Prediction/Prediction";

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [user_deposits, setUserDeposits] = useState(0);
  const [value_choose, setValueChoose] = useState(0);
  const [user_choose, setUserChoose] = useState(false);
  const [user_wins, setUserWins] = useState(0);
  const [user_profits, setUserProfits] = useState(0);
  const [user_balance, setUserBalance] = useState(0);

  const open_deposit = document.getElementById("open-deposit");
  const open_close = document.getElementById("open-close");
  const modal_container = document.getElementById("modal_container");
  const close = document.getElementById("close");

  open_deposit?.addEventListener("click", () => {
    modal_container?.classList.add("show");
  });
  open_close?.addEventListener("click", () => {
    modal_container?.classList.add("show");
  });
  close?.addEventListener("click", () => {
    modal_container?.classList.remove("show");
  });

  useEffect(() => {
    //carga de web3
    loadWeb3();
    //carga de los datos d ela blockchain
    loadBlockchainData().then((current_contract) => {
      setAccount(current_contract.account);
      setContract(current_contract.contract);
    });
  }, []);
  useEffect(() => {
    userLotteryBalanceUpdate();
    userViewBalance();
    userLotteryWinsUpdate();
    userLotteryProfitUpdate();
  }, [user_deposits, user_choose, contract, account, value_choose]);

  const deposit = async (value) => {
    contract.methods
      .userFunding()
      .send({ from: account, value: value })
      .then(() => {
        userLotteryBalanceUpdate();
        document.getElementById("input_send").placeholder = "USD";
      });
  };

  const withdrawall = async (value) => {
    contract.methods
      .userWithdrawall(value)
      .send({ from: account })
      .then(() => {
        userLotteryBalanceUpdate();
        document.getElementById("input_send").placeholder = "USD";
      });
  };

  const userLotteryBalanceUpdate = async () => {
    contract.methods
      .userDeposit()
      .call({ from: account })
      .then((amountDeposit) => {
        console.log("Tu deposito fue de: ", amountDeposit);
        setUserDeposits(amountDeposit);
      });
  };

  const userLotteryWinsUpdate = async () => {
    contract.methods
      .userWins()
      .call({ from: account })
      .then((valueWins) => {
        setUserWins(valueWins);
      });
  };

  const userLotteryProfitUpdate = async () => {
    contract.methods
      .userProfits()
      .call({ from: account })
      .then((amountProfits) => {
        setUserProfits(amountProfits);
      });
  };

  const userViewBalance = async () => {
    var value = await window.web3.eth.getBalance(account);
    value = await window.web3.utils.fromWei(value);
    setUserBalance(value);
  };

  return (
    <div className="App">
      <div className="App-header-account-details">
        <div className="App-WDA">
          <div>
            <button
              className="App-buttonWDA"
              id="open-close"
              onClick={() => {
                setUserChoose(false);
              }}
            >
              WITHDRAW
            </button>
          </div>
          <div>
            <button
              class="App-buttonWDA"
              id="open-deposit"
              onClick={() => {
                setUserChoose(true);
              }}
            >
              DEPOSIT
            </button>
          </div>
          <div>
            <button className="App-buttonWDA">
              ACCOUNT: {account.toString().substring(0, 6)}...
              {account.slice(-4)}{" "}
            </button>
          </div>
        </div>
        <div>
          <button className="App-button-user-detail">
            BALANCE: {user_deposits.toString().substring(0, 6)} USD | WINS:{" "}
            {user_wins} | PROFITS: {user_profits} USD
          </button>
        </div>
      </div>
      <div className="App-Logo">
        <img src={Logo} className="Logo"></img>
      </div>

      <div id="modal_container" class="modal-container">
        <div class="modal">
          <p>{user_choose ? "Deposit your funds" : "Withdraw your funds"}</p>
          <div class="balance">
            Your balance: {user_balance.toString().substring(0, 6)} BNB
          </div>
          <div class="balance">
            Your Lottery balance: {user_deposits.toString().substring(0, 6)} BNB
          </div>
          <input
            className="input_value"
            id="input_send"
            type="number"
            placeholder="USD"
            value={value_choose === 0 ? "" : value_choose}
            onChange={(event) => {
              setValueChoose(event.target.value);
            }}
          />
          <div class="modal-btn">
            <button
              id="send"
              className="btn1"
              onClick={() => {
                user_choose ? deposit(value_choose) : withdrawall(value_choose);
              }}
            >
              {user_choose ? "DEPOSIT" : "WITHDRAW"}
            </button>
            <button id="close" className="btn2">
              CLOSE
            </button>
          </div>
        </div>
      </div>
      <Prediction />
    </div>
  );
};

export default App;
