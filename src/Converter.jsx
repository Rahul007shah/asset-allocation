import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Input,
  Heading,
  Box,
  Flex,
  Label,
  Container,
} from "pcln-design-system";
import { Knob } from "primereact/knob";

const Converter = () => {
  const [usdAmount, setUsdAmount] = useState("");
  const [btcValue, setBtcValue] = useState("");
  const [ethValue, setEthValue] = useState("");
  const [knobValue, setValue] = useState(70);

  const handleConversion = (event) => {
    setUsdAmount(event.target.value);
  };

  useEffect(() => {
    getExchangeRates(usdAmount, knobValue);
  }, [usdAmount, knobValue]);

  const getExchangeRates = async (usdAmount, btcAlloc, ethAlloc) => {
    try {
      const response = await axios.get(
        `https://api.coinbase.com/v2/exchange-rates?currency=USD`
      );
      const data = response.data.data.rates;
      const btcRate = data.BTC;
      const ethRate = data.ETH;

      const btcValue =
        usdAmount > 0 ? (parseFloat(usdAmount) * btcRate * knobValue) / 100 : 0;
      const ethValue =
        usdAmount > 0
          ? (parseFloat(usdAmount) * ethRate * (100 - knobValue)) / 100
          : 0;

      setBtcValue(btcValue);
      setEthValue(ethValue);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div>
        <Heading.h1 textAlign="center" fontSize={7}>
          Asset Allocation
        </Heading.h1>
        <Container size="sm" textAlign="center">
          <Label fontSize={5} htmlFor="sample-input">
            Enter amount in USD:
          </Label>
          <Input
            id="usd"
            type="number"
            value={usdAmount}
            onChange={handleConversion}
            size="md"
            placeholder="Enter Amount"
            fontSize={4}
          />
        </Container>
        <Container textAlign="center" py={5} fill="white">
          <Label fontSize={4} htmlFor="sample-input">
            BTC and ETH Allocation Dial
          </Label>
          <Knob
            value={knobValue}
            valueColor={"#1E98FE"}
            rangeColor={"#B5E5FF"}
            textColor="white"
            strokeWidth={10}
            size={200}
            onChange={(e) => setValue(e.value)}
            valueTemplate={"{value}%"}
          />
        </Container>

        <Container textAlign="center" py={2}>
          <Flex justifyContent="space-around">
            <Box width={1 / 3}>
              <Label fontSize={4} htmlFor="sample-input">
                {knobValue}% Allocation of Bitcoin
              </Label>
              <Input readOnly value={btcValue} fontSize={4} />
            </Box>
            <Box width={1 / 3}>
              <Label fontSize={4} htmlFor="sample-input">
                {100 - knobValue}% Allocation of Etherium
              </Label>
              <Input readOnly value={ethValue} fontSize={4} />
            </Box>
          </Flex>
        </Container>
      </div>
    </>
  );
};

export default Converter;
