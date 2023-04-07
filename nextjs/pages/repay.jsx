import Head from "next/head";
import { ContractData } from "~~/components/example-ui/ContractData";
import { ContractInteraction } from "~~/components/example-ui/ContractInteraction";
//import {useScaffoldContractWrite} from "~~/hooks/scaffold-eth/useScaffoldContractWrite";
import { useScaffoldContractWrite, useScaffoldContractRead, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import React, { useEffect, useState } from "react";
import { useWaitForTransaction,useContractRead,useAccount, useContractWrite,usePrepareContractWrite } from "wagmi";
import lensContract from "../src/lens.json"; // Raw ABI import (pulled from etherscan)
import { Alchemy, Network } from "alchemy-sdk";
import { InputNumber, Button, List, Select } from "antd";
import daiContract from "../src/dai.json"; // Raw ABI import (pulled from etherscan)

const { ethers } = require("ethers");
const settings = {
  apiKey: "yLWScHSkzCG2R-CTJwDr3ZgHu5ij3Mis",   // apiKey: "lIguUBlNorQF0qVOvhyXc57Tkgk3JynZ", // Replace with your Alchemy API Key.
    network: Network.MATIC_MAINNET,        // network: Network.ARB_MAINNET, // Replace with your network.
  };
  console.log(process.env) // remove this after you've confirmed it is working
  const alchemy = new Alchemy(settings);

  const repay = () => {
    const {address, isConnected} = useAccount();

  const MAX_LOAN_LENS = 210;
  let decayRate = .5;
  let amount = 0;
  const FLOOR_ADDRESS ="0x0cD08bd0df3EFB1A5B12ae7A73C31E477f899278";
  const LENS_ADDRESS = "0xdb46d1dc155634fbc732f92e853b10b288ad5a1d";  
  const DAI_ADDRESS="0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";  // dai polygon


    const [yourCollectibles2, setYourCollectibles2] = useState();
    const [NFTid, setNFTid] = useState(0);
    const [loanAmount, setLoanAmount] = useState(MAX_LOAN_LENS);   
    const [loanDays, setNFTDays] = useState(1);  // length of loan in days 
    const [collectionNumber, setCollectionNumber] = useState(0);  // indenitifies the NFT collection to be used 
    const [loanInfoString, setMaxLoanString] = useState("Maximum loan size for LENS NFT is 210 DAI");
    const [loanAmountStr, setLoanAmountStr] = useState("");    // puts the eth amount of the loan into string format 
    const [loanDetails, setLoanDetails] = useState("");
    const [repayAmount, setRepayAmount] = useState(0);

    const contractConfig = {
      address: LENS_ADDRESS,
      abi: lensContract,
    };

    const contractConfig2 = {
      address: DAI_ADDRESS,
      abi: daiContract,
    };

    // ------------------READ CONTRACT ----------------------------------------

      const { data: getLoan, isLoading: isGetFloor } = useScaffoldContractRead({
        contractName: "FloorLendingV2",
        functionName: "getLoanID",
        args:[address, 0 , 0],
      }); 

              // gets the amount needed to repay loan
      const { data: getRepayment, isLoading: isGetRepayment } = useScaffoldContractRead({
        contractName: "FloorLendingV2",
        functionName: "calculateBorrowFee",
        args:[NFTid , 0],   // nftid, colelctioID
        watch:true,
      }); 
      
    // ------------------ WRITE  CONTRACT ----------------------------------------

  //  function to approve dai to repay to lend contract
  // Write contract call
  const { config: approveDaiRepayment, error: adminErrorDai } = usePrepareContractWrite({
    ...contractConfig2,
    functionName: "approve",
    args: [FLOOR_ADDRESS, getRepayment], //hardcoded address can create a state variable
    onError(error) {
      console.log("Error", error);
    },
  });
  const {
    data: approveDaiData,        // use this to get tx hash
    write: approveDai, 
    isLoading: isDaiLoading,
    isSuccess: isMintStarted,     
  } = useContractWrite(approveDaiRepayment);
  

  const { writeAsync: repayLoan, isLoading: isRepayLoan } = useScaffoldContractWrite({
    contractName: "FloorLendingV2",
    functionName: "repayLoan",
    args:[NFTid, 0, getRepayment],
  });

   // -----------------------------EVENT LISTENERS --------------------

  useScaffoldEventSubscriber({
    contractName: "FloorLendingV2",
    eventName: "repayLoanEvent",
    listener: (sender, amount) => {
      setLoanDetails("Address " + sender +  " amount " + amount.toString() )
      console.log("Address " , sender, " amount " , amount.toString() );
    },
  });


   // calls the approve() function to transfer NFT to lend contract
   const approve2 = async () =>{ 
    
    console.log("APPROVE DAI ", amount )
      approveDai?.()
  }

   // calls the approve() function in the Blueberry or SMol contracts depending on the selection
   const repay = async () =>{ 
    console.log("NFT ID ", loanID, " repayment amount" , getRepayment)
    repayLoan?.()
  }

   // calls the approve() function in the Blueberry or SMol contracts depending on the selection
   const getRepay = async (event, _id) =>{ 
    getRepayment?.()
    setNFTid(_id)
    console.log("NFT ID ", NFTid, " repayment amount" , amount , " getRepayment " ,getRepayment)
    approve2()
  }

  const {isSuccess: txSuccess } = useWaitForTransaction({
    hash:approveDaiData?.hash
  })
const isApproved = txSuccess;

   let loanID = getLoan ? getLoan.toString() : "0"
   amount =   getRepayment ? getRepayment.toString( ) : "0"
  return (
    <>
      <Head>
        <title>NFT Lending</title>
        <meta name="description" content="FLOOR 101 NFT Lending" />
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />

      </Head>
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
        <div className={`mt-10 flex gap-2  max-w-2xl`}>
          <div className="flex gap-5 bg-base-200 bg-opacity-80 z-0 p-7 rounded-2xl shadow-lg">  
      <div suppressHydrationWarning={true}>
 <h1>REPAY LOAN</h1><br />
 NFT ID : <input type="number" value={loanID} onChange={setNFTid} style={{ width: 200 }} />
 {amount}
  <br />
  {isConnected  && !isApproved && (
 <button className="button" onClick={(event) => getRepay(event, loanID)}  style={{ width: 180}}
   data-mint-loading={isDaiLoading}
   data-mint-started={isMintStarted}
 >{isDaiLoading && "Waiting for Approval"}
  {isMintStarted && "-- approving --"}
  {!isDaiLoading && !isMintStarted && 'Approve Repayment'}
 </button>  
 )}

 {isConnected  && isApproved && (
  <button className="button" onClick={(event) => repay(event, loanID)} style={{ width: 200}}>REPAY LOAN
 </button>
 )}
 {loanDetails}
      </div>
      </div>
    </div>
  </div>



    </>
  );
};

export default repay;
