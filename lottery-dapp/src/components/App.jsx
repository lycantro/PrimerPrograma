import React, { useEffect, useState } from "react";

import loadWeb3 from "../utils/functions/loadWeb3";
import loadBlockchainData from "../utils/functions/loadBlockchainData";

import "./App.css";
import Logo from "../assets/images/CL_Logo.png";
import "./popupDeposit.js";

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [user_deposits, setUserDeposits] = useState(0);
  const [deposits, setDeposits] = useState(0);
  const [user_wins, setUserWins] = useState(0);
  const [user_profits, setUserProfits] = useState(0);
  const [user_withdrawalls, setUserWithdrawalls] = useState(false);
  const [user_balance, setUserBalance] = useState(0);

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
    userDepositUpdate();
    userViewBalance();
  }, [user_deposits, user_withdrawalls, contract, account,deposits]);

  const deposit = async (value) => {
    contract.methods
      .userFunding()
      .send({ from: account, value: value })
      .then(() => {
        userDepositUpdate();
      });
  };

  const userDepositUpdate = async () => {
    contract.methods
      .userDeposit()
      .call({ from: account })
      .then((amountDeposit) => {
        console.log("Tu deposito fue de: ", amountDeposit);
        setUserDeposits(amountDeposit);
      });
  };

  const userViewBalance = async () => {
    var value = await window.web3.eth.getBalance(account);
    value = await window.web3.utils.fromWei(value);
    setUserBalance(value);
  };

  const withdrawall = async () => {
    setUserWithdrawalls(false);
    contract.methods
      .userWithdrawall(10000000000000000n)
      .send({ from: account })
      .then(() => {
        setUserWithdrawalls(true);
      });
  };

  return (
    <div className="App">
      <div className="App-header-account-details">
        <div className="App-WDA">
          <div>
            <button
              className="App-buttonWDA"
              onClick={() => {
                withdrawall();
              }}
            >
              WITHDRAWALL
            </button>
          </div>
          <div>
            <button class="App-buttonWDA" id="open">
              DEPOSIT
            </button>
          </div>
          <div>
            <button className="App-buttonWDA">
              ACCOUNT: {account.toString().substring(0, 6)}...{account.slice(-4)}{" "}
            </button>
          </div>
        </div>
        <div>
          <button className="App-button-user-detail">
            BALANCE: {user_deposits.toString().substring(0, 6)} USD | WINS: 3 | PROFITS: 23
            USD
          </button>
        </div>
      </div>
      <div className="App-Logo">
        <img src={Logo} className="Logo"></img>
      </div>

      <div id="modal_container" class="modal-container">
        <div class="modal">
          <p>Deposit your funds</p>
          <div class="balance">
            Your balance: {user_balance.toString().substring(0, 6)} BNB
          </div>
          <div class="balance">
            Your Lottery balance: {user_deposits.toString().substring(0, 6)} BNB
          </div>
          <input
            type="number"
            placeholder="USD"
            value={deposits === 0 ? "" : deposits}
            onChange={(event) => {
              setDeposits(event.target.value);
            }}
          />
          <div class="modal-btn">
            <button
              id="send"
              className="btn1"
              onClick={() => {
                deposit(deposits);
              }}
            >
              DEPOSIT
            </button>
            <button id="close" className="btn2">
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
