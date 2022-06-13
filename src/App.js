import "./App.css";
import { useEffect, useState } from "react";
import Web3 from "./Web3";

import Lottery from "../src/artifacts/contracts/Lottery.sol/Lottery.json";
const contractAddress = "0xe028f66bf6Af1303FC4D8D4fF8d7435295249402";

function App() {
  const [manager, setManager] = useState("");
  const [player, setPlayer] = useState("");
  const [balance, setBalance] = useState("");
  const [value, setValue] = useState("");

  const [message, setMessage] = useState("");
  const [winner, setWinner] = useState("");

  //Get contract data
  let contract = new Web3.eth.Contract(Lottery.abi, contractAddress);

  useEffect(() => {
    (async () => {
      Web3.eth.getAccounts().then(console.log);
      const mymanager = await contract.methods.manager().call();
      const myplayers = await contract.methods.getPlayers().call();
      const totalbalance = await Web3.eth.getBalance(contract.options.address);
      setManager(mymanager);
      setPlayer(myplayers);
      setBalance(totalbalance);
    })();
  }, []); //eslint-disable-next-line

  // contract.methods.SetMessage(message).send({ from: getAccount[0] });

  const submitHandler = async (e) => {
    e.preventDefault();

    const accounts = await Web3.eth.getAccounts();

    setMessage("We are in the process of entering you");

    await contract.methods.Enter().send({
      from: accounts[0],
      value: Web3.utils.toWei(value, "ether"),
    });

    //takes 15 to 30 seconds to process

    setMessage("You have been entered");
  };

  const selectWinner = async () => {
    console.log("picking a winner");

    const accounts = await Web3.eth.getAccounts();
    
    await contract.methods.PickWinner().send({
      from: accounts[0],
      //This being the manager account
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Enter the Lottery</h1>
        <h3>The contract is managed by {manager}</h3>
        <h3>
          <hr />
          The number of plyaers entered: {player.length} , competing to win{" "}
          {Web3.utils.fromWei(balance, "ether")}
        </h3>
        <form onSubmit={submitHandler}>
          <h3>Try your luck</h3>
          <div>
            <label>Amount to enter the lottery</label>
            <input
              placeholder="Enter the lottery"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr />
        <h1>{message}</h1>

        <hr />

        <button onClick={selectWinner}>Pick Winner</button>
      </header>
    </div>
  );
}

export default App;
