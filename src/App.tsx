import { useState } from 'react';
import { ethers } from "ethers";
import lppABI from "./abis/lppABI";
import './App.css';

function App() {
    const [handles, setHandles] = useState('');

    const handleChange = (event: any) => {
        setHandles(event.target.value);
    };

    const handleFollow = async () => {
        if ((window as any).ethereum) {
            const lensHandles = handles.split(',');
            const provider = new ethers.providers.Web3Provider((window as any).ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const lppContractAddress = "0xdb46d1dc155634fbc732f92e853b10b288ad5a1d";
            const lppContract = new ethers.Contract(lppContractAddress, lppABI, signer);
            let profileIds = [];
            for (const lensHandle of lensHandles) {
                const profileId = await lppContract.getProfileIdByHandle(lensHandle);
                profileIds.push(profileId);
            }
            console.log(profileIds);
            // Ahora se podría usar el objeto profileIds, poniendo los valores correctos
            // No sé que es data tampoco
            // const tx = lppContract.follow(profileIds, data)
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Handles on CSV format (with , as separator)
                </p>
                <input type="text"
                    id="handles"
                    name="handles"
                    onChange={handleChange}
                    value={handles} />
                <button onClick={handleFollow}>Follow</button>
            </header>
        </div >
    );
}

export default App;
