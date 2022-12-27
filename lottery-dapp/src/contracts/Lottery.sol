// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Lottery {

    using SafeMath for uint256;

    constructor() {
        Owner_Contract = msg.sender;
        Contract_Address = address(this);
    }

    address public Owner_Contract;
    address public Contract_Address;
    uint256 public OWNER_FEE = 2;
    uint256 public Owner_Profits;

    mapping (address => Competitor) public users;

    event Deposit (address, uint256) ;
    event withdraw (address, uint256);
    event Sender (address);

    struct Competitor {
        address funder;
        uint256 amount;
        uint256 wins;
        uint256 amountWins;
        bool betUpPrediction;
        bool betDownPrediction;
        uint256 betAmountUpPrediction;
        uint256 betAmountDownPrediction;
    }

    address[] public usersAddress;
       

    modifier OnlyOwner(){
        require(msg.sender == Owner_Contract,"You arent the owner of this Lottery");
        _;
    }

    function changeOwnerFee(uint256 _fee) public OnlyOwner {
        OWNER_FEE = _fee;
    }

    receive()external payable{
        emit Deposit(msg.sender,msg.value);
    }

    function userFunding() public payable{
        require(msg.sender.balance > 0 ether,"Your wallet don have money");
        require(msg.value > 0 ether,"Your amount funded is invalid, please spend more ETH");
        
        users[msg.sender] = Competitor(
                            msg.sender, users[msg.sender].amount, 
                            users[msg.sender].wins, 
                            users[msg.sender].amountWins,
                            users[msg.sender].betUpPrediction,
                            users[msg.sender].betDownPrediction,
                            users[msg.sender].betAmountUpPrediction,
                            users[msg.sender].betAmountDownPrediction
                            );

        users[msg.sender].amount += msg.value ;
        usersAddress.push(msg.sender);

        emit Deposit(msg.sender,msg.value);
    }

    function userWithdrawall (uint256 _amountWithdrawall) public {
        require(_amountWithdrawall != 0,"You cant withdraw 0");        
        require(_amountWithdrawall <= users[msg.sender].amount && users[msg.sender].amount > 0,"You cant withdraw more money than you have");
        

        users[msg.sender].amount -= _amountWithdrawall;
        payable(msg.sender).transfer(_amountWithdrawall);

        emit withdraw(msg.sender, _amountWithdrawall);
    }      

    function ownerWithdrawall (uint256 _amountWithdrawall) public OnlyOwner{
        require(_amountWithdrawall != 0,"You cant withdraw 0");   
        require(_amountWithdrawall <= Owner_Profits,"You cant withdraw more money than you have"); 

        Owner_Profits -= _amountWithdrawall;
        payable(Owner_Contract).transfer(_amountWithdrawall);

        emit withdraw(msg.sender, _amountWithdrawall);
    }

    function userDeposit() public view returns(uint256){
        return users[msg.sender].amount;
    }

    function userWins() public view returns(uint256){
        return users[msg.sender].wins;
    }

    function userProfits() public view returns(uint256){
        return users[msg.sender].amountWins;
    }

    function userBetAmountUp() public view returns(uint256){
        return users[msg.sender].betAmountUpPrediction;
    }

    function userBetAmountDown() public view returns(uint256){
        return users[msg.sender].betAmountDownPrediction;
    }

}

contract Prediction is Lottery {

    AggregatorV3Interface internal priceFeed;

    constructor() {
        //BNB Chain TestNet
        //BNB/USD

        priceFeed = AggregatorV3Interface(
            0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526
        );
    }
    
    uint256 private Bet_Up;
    uint256 private Bet_Down;    

    uint256 private Bet_Up_Factor;
    uint256 private Bet_Down_Factor;

    int private ActualPrice; //Alimentado por chainlink
    int private PriceLocked; // Precio Bloqueado desde chainlink

    uint256 private timeLocked;

    event betPriceUp (address, uint256);
    event betPriceDown (address, uint256);

    function priceUp (uint256 _betAmount) public {
        require(_betAmount > 100 wei, "You should bet more");
        require(users[msg.sender].amount > 0 && users[msg.sender].amount >= _betAmount,"You dont have enough balance");

        uint256  _Owner_Profits;
        users[msg.sender].amount -= _betAmount;
        _Owner_Profits = (_betAmount*OWNER_FEE)/100;
        _betAmount -= _Owner_Profits;
        Owner_Profits += _Owner_Profits;
        Bet_Up += _betAmount;
        calculateBetFactor();

        users[msg.sender].betUpPrediction = true;
        users[msg.sender].betAmountUpPrediction += _betAmount;

        emit betPriceUp (msg.sender, _betAmount);
    }

    function priceDown (uint256 _betAmount) public {
        require(_betAmount > 100 wei, "You should bet more");
        require(users[msg.sender].amount > 0 && users[msg.sender].amount >= _betAmount,"You dont have enough balance");

        uint256  _Owner_Profits;
        users[msg.sender].amount -= _betAmount;
        _Owner_Profits = (_betAmount*OWNER_FEE)/100;
        _betAmount -= _Owner_Profits;
        Owner_Profits += _Owner_Profits;
        Bet_Down += _betAmount;
        calculateBetFactor();

        users[msg.sender].betDownPrediction = true;
        users[msg.sender].betAmountDownPrediction += _betAmount;

        emit betPriceDown (msg.sender, _betAmount);
    }    

    function calculateBetFactor() private {

        if(Bet_Up != 0){
            Bet_Up_Factor = (betTotalPrediction() * 1 ether )/ Bet_Up ;
        }
        if(Bet_Down != 0){
            Bet_Down_Factor = (betTotalPrediction() * 1 ether)/ Bet_Down;
        }     

    }

    function betTotalPrediction() public view returns(uint256){
        return (Bet_Up + Bet_Down);
    }

    function priceLocked(/*int _price*/) private {// Precio Bloqueado desde chainlink
        timeLocked = block.timestamp;
        //PriceLocked = _price;
        (,PriceLocked,,,) =priceFeed.latestRoundData(); 
    }

    function actualPrice(/*int _price*/) private {// Alimentado por chainlink

        //ActualPrice =_price;        
        (,ActualPrice,,,) =priceFeed.latestRoundData(); 
    }

    function priceLoked() public view returns(int){
        return PriceLocked;
    }

    function timeLoked () public view returns(uint256){
        return timeLocked;
    }
    function pricePair() public view returns (int){
        int price;
        (,price,,,) =priceFeed.latestRoundData();
        return price;
    }

    

    function betUpFactor() public view returns(uint256){
        return Bet_Up_Factor;
    }

    function betDownFactor() public view returns(uint256){
        return Bet_Down_Factor;
    }

    function RewardsCalculated() public OnlyOwner { //Solo puede ser ejecutada en el tiempo correcto - revisar esto     
        require(block.timestamp >= (timeLocked + 5 minutes),"The time isnt now");
        actualPrice();

        if(checkBalance()){
            if(ActualPrice > PriceLocked){ 
                for(uint256 i=0; i <usersAddress.length; i++){
                    if(users[usersAddress[i]].betUpPrediction && users[usersAddress[i]].betAmountUpPrediction > 0 && users[usersAddress[i]].betAmountUpPrediction <= betTotalPrediction()){
                        users[usersAddress[i]].amount += (users[usersAddress[i]].betAmountUpPrediction * Bet_Up_Factor) / 1 ether;
                        users[usersAddress[i]].betAmountUpPrediction = 0;
                        users[usersAddress[i]].betUpPrediction = false;                        
                    }
                    if(users[usersAddress[i]].betDownPrediction){
                        users[usersAddress[i]].betAmountDownPrediction = 0;
                        users[usersAddress[i]].betDownPrediction = false;                        
                    }

                }
            }
            if(ActualPrice < PriceLocked){ 
                for(uint256 i=0; i <usersAddress.length; i++){
                    if(users[usersAddress[i]].betDownPrediction && users[usersAddress[i]].betAmountDownPrediction > 0 && users[usersAddress[i]].betAmountDownPrediction <= betTotalPrediction()){
                        users[usersAddress[i]].amount += (users[usersAddress[i]].betAmountDownPrediction * Bet_Down_Factor) / 1 ether;
                        users[usersAddress[i]].betAmountDownPrediction = 0;
                        users[usersAddress[i]].betDownPrediction = false;                        
                    }
                    if(users[usersAddress[i]].betUpPrediction){
                        users[usersAddress[i]].betAmountUpPrediction = 0;
                        users[usersAddress[i]].betUpPrediction = false;                       
                    }

                }
                
            }
            if(actualPrice == priceLocked){          
                
                for(uint256 i=0; i <usersAddress.length; i++){
                    users[usersAddress[i]].amount += users[usersAddress[i]].betAmountUpPrediction  ;
                    users[usersAddress[i]].betAmountUpPrediction = 0;
                    users[usersAddress[i]].betUpPrediction = false;

                    users[usersAddress[i]].amount += users[usersAddress[i]].betAmountDownPrediction ;
                    users[usersAddress[i]].betAmountDownPrediction = 0;
                    users[usersAddress[i]].betDownPrediction = false;
                }
                
            }    
            Bet_Up=0;
            Bet_Up_Factor=0;
            Bet_Down=0;
            Bet_Down_Factor=0;

            priceLocked();
        }    

    }

    function checkBalance() public view returns(bool){
            uint256 _checkedBalance;
            bool _checkedBalanceFlag = false;

            for(uint256 i=0; i <usersAddress.length; i++){
                _checkedBalance += users[usersAddress[i]].betAmountUpPrediction + users[usersAddress[i]].betAmountDownPrediction;
            }
            
            if(_checkedBalance == betTotalPrediction()){_checkedBalanceFlag = true;}
            else{_checkedBalanceFlag = false;}

            return _checkedBalanceFlag;
        }



}