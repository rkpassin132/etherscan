import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const apiKey = process.env.NEXT_PUBLIC_INFURA_API;
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${apiKey}`
);

export const Etherescan = React.createContext();

export const EtherProvider = ({ children }) => {
  const tenBlockWithDetails = [];
  const [yourBlockTrans, setYourBlockTrans] = useState(tenBlockWithDetails);
  const [currentBlock, setCurrentBlock] = useState([]);
  const [topTenBlock, setTopTenBlock] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [gasPrice, setGasPrice] = useState("");

  const etherData = "Hey checking connection";

  const accountDetails = async () => {
    try {
      const getCurrentBlock = await provider.getBlockNumber();
      setCurrentBlock(getCurrentBlock);
      console.log("getCurrentBlock", getCurrentBlock);

      //SINGLE BLOCAK TRANSACTION
      const blockTransaction = await provider.getBlock(getCurrentBlock);
      setTransaction(blockTransaction.transactions);

      //TOP TEN BLOCK//
      const previousBlock = getCurrentBlock - 10;
      const listTenBlock = [];

      for (let i = getCurrentBlock; i > previousBlock; i--) {
        listTenBlock.push([i]);
      }

      //GET BLOCK DETAILS
      const getBlockDetails = listTenBlock.flat();
      setTopTenBlock(getBlockDetails);
      console.log("getBlockDetails",getBlockDetails);
      getBlockDetails.map(async (el) => {
        const singleBlockData = await provider.getBlock(el);
        tenBlockWithDetails.push(singleBlockData);
      });

      //ETHER PRICE//
      const gasPrice = await provider.getGasPrice();
      const latestGasPrice = ethers.utils.formatUnits(gasPrice);
      setGasPrice(latestGasPrice);
    } catch (error) {
      console.log("Something wrong");
    }
  };

  useEffect(() => {
    accountDetails();
  }, []);

  return (
    <Etherescan.Provider
      value={{
        etherData,
        currentBlock,
        topTenBlock,
        yourBlockTrans,
        transaction,
        gasPrice,
        provider,
      }}
    >
      {children}
    </Etherescan.Provider>
  );
};
