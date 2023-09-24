import { ethers } from "ethers";
import Lock from "./artifacts/contracts/Lock.sol/Lock.json";

function App() {
  const connect = async () => {
    let signer = null;
    let provider;

    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
    }
    // 当前访问人address
    const addr = await signer.getAddress();
    console.log("addr", addr);
  };

  const readMessage = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const lock = new ethers.Contract(
      "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      Lock.abi,
      provider
    );
    const message = await lock.message();
    alert(message);
  };

  const setMessage = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    let lock = new ethers.Contract(
      "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      Lock.abi,
      signer
    );
    let transaction = await lock
      .connect(signer)
      .setMessage("world hello!");
    let result = await transaction.wait();
    alert(result.logs[0].args);
    console.log("result.logs[0].args", result.logs[0].args);
  };

  return (
    <div className="App">
      <p>
        <button onClick={connect}>connect wallet</button>
      </p>
      <p>
        <button onClick={readMessage}>readMessage</button>
      </p>
      <p>
        <button onClick={setMessage}>setMessage</button>
      </p>
    </div>
  );
}

export default App;
