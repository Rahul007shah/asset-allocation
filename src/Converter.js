import React, { useState } from 'react';
import axios from 'axios';

const Converter = () => {
  const [usdAmount, setUsdAmount] = useState('');
  const [btcValue, setBtcValue] = useState('');
  const [ethValue, setEthValue] = useState('');

  const handleInputChange = (event) => {
    setUsdAmount(event.target.value);
  };

  const handleConversion = async () => {
    try {
      const response = await axios.get(
        `https://api.coinbase.com/v2/exchange-rates?currency=USD`
      );
      const data = response.data.data.rates;
      const btcRate = data.BTC;
      const ethRate = data.ETH;

      const btcValue = (parseFloat(usdAmount) * btcRate*0.7);
      const ethValue = (parseFloat(usdAmount) * ethRate*0.3);

      setBtcValue(btcValue);
      setEthValue(ethValue);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2>Crypto Converter</h2>
      <label>
        Enter amount in USD:
        <input type="number" value={usdAmount} onChange={handleInputChange} />
      </label>
      <button onClick={handleConversion}>Convert</button>
      {btcValue && <p>Value for BTC: {btcValue}</p>}
      {ethValue && <p>Value for ETH: {ethValue}</p>}
    </div>
  );
};

export default Converter;
