import Head from "next/head";
import { ContractData } from "~~/components/example-ui/ContractData";
import { ContractInteraction } from "~~/components/example-ui/ContractInteraction";
//import {useScaffoldContractWrite} from "~~/hooks/scaffold-eth/useScaffoldContractWrite";
import { useScaffoldContractWrite, useScaffoldContractRead, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import React, { useEffect, useState } from "react";
import { useWaitForTransaction,useContractRead,useAccount, useContractWrite,usePrepareContractWrite } from "wagmi";
import lensContract from "../src/lens.json"; // Raw ABI import (pulled from etherscan)
import { Alchemy, Network } from "alchemy-sdk";
import { InputNumber, List } from "antd";
import daiContract from "../src/dai.json"; // Raw ABI import (pulled from etherscan)

const { ethers } = require("ethers");
const settings = {
  apiKey: "yLWScHSkzCG2R-CTJwDr3ZgHu5ij3Mis",   // apiKey: "lIguUBlNorQF0qVOvhyXc57Tkgk3JynZ", // Replace with your Alchemy API Key.
    network: Network.MATIC_MAINNET,        // network: Network.ARB_MAINNET, // Replace with your network.
  };
  
  const alchemy = new Alchemy(settings);

  const lend = () => {
    const {address, isConnected} = useAccount();

  const maxLoanBerries = 500;
  let maxLoanSmols = 500 ;
  const MAX_LOAN_LENS = 210;
  let decayRate = .5;

  const FLOOR_ADDRESS ="0x0cD08bd0df3EFB1A5B12ae7A73C31E477f899278";
  const LENS_ADDRESS = "0xdb46d1dc155634fbc732f92e853b10b288ad5a1d";  
  const DAI_ADDRESS="0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";  // dai polygon

    const [depositAmount, setDepositAmount] = useState(0);  
    const [depositString, setDepositString] = useState(""); 
    const [yourCollectibles2, setYourCollectibles2] = useState();
    const [collection, setCollection] = useState();
    const [NFTid, setNFTid] = useState(0);
    const [loanAmount, setLoanAmount] = useState(MAX_LOAN_LENS);   
    const [loanDays, setNFTDays] = useState(1);  // length of loan in days 
    const [collectionNumber, setCollectionNumber] = useState(0);  // indenitifies the NFT collection to be used 
    const [loanInfoString, setMaxLoanString] = useState("Maximum loan size for LENS NFT is 210 DAI");
    const [isBerry, setIsBerry] = useState(true);  
    const [loanAmountStr, setLoanAmountStr] = useState("");    // puts the eth amount of the loan into string format 
    const [loanDetails, setLoanDetails] = useState("");
    const [displayBalance, setDisplayBalance] = useState(false); 

    const contractConfig = {
      address: LENS_ADDRESS,
      abi: lensContract,
    };

    const contractConfig2 = {
      address: DAI_ADDRESS,
      abi: daiContract,
    };

    // ------------------READ CONTRACT ----------------------------------------

    const { data: vaultBalance, error: getNFTError } = useContractRead({
      ...contractConfig2,
      functionName: "balanceOf",
      args: [FLOOR_ADDRESS], //hardcoded address can create a state variable
    });

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
      }); 
      
    // ------------------ WRITE  CONTRACT ----------------------------------------
   //  function to call contract approve lendingcontract to use Blueberry NFT  
   const { config: approveLending, error: adminError } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "approve",
    args: [FLOOR_ADDRESS, NFTid], //hardcoded address can create a state variable
    onError(error) {
      console.log("Error", error);
    },
  });
  const {
    data: approveData,              // use this to get tx hash
    write: approveLend, 
    isLoading: isDaiLoading,
    isSuccess: isMintStarted,
  } = useContractWrite(approveLending);

  //  function to call contract lend write function to Lend using Blueberry NFT collectionNumber 0
  // Write contract call
  const { config: approveDaiRepayment, error: adminErrorDai } = usePrepareContractWrite({
    ...contractConfig2,
    functionName: "approve",
    args: [FLOOR_ADDRESS, ethers.utils.parseEther("250")], //hardcoded address can create a state variable
    onError(error) {
      console.log("Error", error);
    },
  });
  const {
    data: approveDaiData,        // use this to get tx hash
    write: approveDai, 
  } = useContractWrite(approveDaiRepayment);
  
  const { writeAsync: callLoan, isLoading: isloadingLoan } = useScaffoldContractWrite({
    contractName: "FloorLendingV2",
    functionName: "lend",
    args:[NFTid, loanDays, collectionNumber, ethers.utils.parseEther(loanAmount + "")]
  });

  const { writeAsync: repayLoan, isLoading: isRepayLoan } = useScaffoldContractWrite({
    contractName: "FloorLendingV2",
    functionName: "repayLoan",
    args:[NFTid, 0, ethers.utils.parseEther(loanAmount + "")]
  });

  const {isSuccess: txSuccess } = useWaitForTransaction({
    hash:approveData?.hash
  })
const isApproved = txSuccess;

   // -----------------------------EVENT LISTENERS --------------------
   useScaffoldEventSubscriber({
    contractName: "FloorLendingV2",
    eventName: "vaultDepositEvent",
    listener: (sender, amountDeposited) => {
      setDepositString("Successfully deposited ".concat(ethers.utils.formatEther(amountDeposited.toString() )));
      console.log("DEPOSIT event listener " , sender, amountDeposited);
    },
  });
  useScaffoldEventSubscriber({
    contractName: "FloorLendingV2",
    eventName: "vaultWithdrawEvent",
    listener: (sender, amountDeposited) => {
      setDepositString("Successfully withdrew ".concat(amountDeposited.toString()));
      console.log("WITHDRAW event listener " , sender, amountDeposited);
    },
  });
  useScaffoldEventSubscriber({
    contractName: "FloorLendingV2",
    eventName: "loanEvent",
    listener: (sender, id, cid, loanSize, dueDate) => {
      setLoanDetails("loanEvent " + sender +  " amount " + loanSize.toString() + " due date " +  getDate(dueDate))
      console.log("Address " , sender, " amount " , loanSize, " due date ", getDate(dueDate) );
    },
  });

     // input number handler for NFT ID
     const changeDuration = (value) =>{
      let maxLoan=0
      maxLoan =MAX_LOAN_LENS
      try{
       let a =0
       setNFTDays(value);
       a = (maxLoan -(value * decayRate)).toFixed(2)  
       setLoanAmount(a)
      } catch (e) {console.log(e);} 
   };

    // input number handler for NFT ID
    const changeLoan = value => {
      try{
      setLoanAmount(value);
         } catch (e) {console.log(e);} 
    };


    
  // uses alchemy API to display NFTs owned by user for LENS collection
  const getLens = async () => {
    setDisplayBalance(true)
    if(isConnected==true)  // check wallet is connected
    {
      const nftsForOwner = await alchemy.nft.getNftsForOwner(address);
      const nftList = nftsForOwner["ownedNfts"]; 
      const collectibleUpdate = [];
      for (let nft of nftList) {
        try{
          if (nft.contract.address == "0xdb46d1dc155634fbc732f92e853b10b288ad5a1d")
          {console.log(` ${nft.tokenId} .${nft.rawMetadata.image}` );
          let addr = nft.rawMetadata.image;
          collectibleUpdate.push({ id: nft.tokenId, image: addr, owner: address});
         }
        }
        catch(e) {alert (e, "NFT Error")}
      } 
      setYourCollectibles2(collectibleUpdate);
    }else
    alert("Please connect a wallet")
  };


  const handleChange = (value) => {
    setCollectionNumber(value)
    if(value==0)
     {setMaxLoanString("Maximum loan size for GMX Blueberries is " + maxLoanBerries + " DAI")
      setIsBerry(true)}
    else{
      setMaxLoanString("Maximum loan size for Smol Brains is " + maxLoanSmols + " DAI") 
      setIsBerry(false)
    }  
  };

   // calls the approve() function to transfer NFT to lend contract
   const approve = async (event, id) =>{ 
    setNFTid(id)
    console.log("APPROVE LEND NFT ID ",id , "Collection ID " , collectionNumber)
      approveLend?.()
  }

   // calls the approve() function to transfer NFT to lend contract
   const approve2 = async () =>{ 
    console.log("APPROVE DAI " )
      approveDai?.()
  }

   // calls the approve() function in the Blueberry or SMol contracts depending on the selection
   const repay = async (event, id) =>{ 
    setNFTid(repayment)
    console.log("NFT ID ", NFTid, " repayment amount" , getRepayment)
    repayLoan?.()
  }

  // Calls the WRITE lend function in the Floorlend contract
  const callLend = async (event, nftNumber) =>{ 
    var d = new Date();
    setNFTid(nftNumber)
    setLoanAmountStr(ethers.utils.parseEther(loanAmount + "")) ;
    console.log( ethers.utils.parseEther(loanAmount + ""),  " NFTID ", NFTid, "amount ", loanAmount, " collection " , collectionNumber, " due date" ,d.setDate(d.getDate() + loanDays)  )
   // setLoanDetails("Loan Details : NFTid " + NFTid + " Loan amount : $" + loanAmount  + " dai due in " + getDate(d.setDate(d.getDate() + loanDays)) )
    callLoan?.()
   }

   function getDate(dt) {
    const milliseconds = dt * 1000 // 1575909015000
    const dateObject = new Date(milliseconds)
    let humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15
    return humanDateFormat;
  }

   let repayment = getLoan ? getLoan.toString() : "0"

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
 <h1>LENS Lending (beta)</h1>
 Interest rate on loans is 5% per annum, approx 6 cents a day on $500 loan.
 If you pay back a 28 day loan in 1 day, you only pay 1 days interest.<br />
 { displayBalance && ( <div>Dai available for lending ${Number(ethers.utils.formatUnits(vaultBalance, 18)).toFixed(0)} </div>)}
<br />
<button className="button" onClick={() => getLens()}>Display My LENS NFT</button>  
  <h3>{loanInfoString}</h3>

 
<div> 
<List id="centerWrapper !important" dataSource={yourCollectibles2} renderItem={item => {
                    return (
<List.Item>
<table padding = {25} style={{marginLeft: "auto", marginRight: "auto"}} ><thead>
<tr><th colspan="2" >{<img src= {item.image} style={{borderRadius:10}}  />}</th></tr> 
<tr><th>Nft ID : </th><th><InputNumber min={1} max={13000} defaultValue={item.id} onChange={setNFTid} style={{ width: 200 }} /></th></tr>
<tr><th>Loan Duration : </th><th>
 <InputNumber min={1} max={28} placeholder={"Loan Duration"} defaultValue={1} onChange={changeDuration} style={{ width: 200 }} />
 </th></tr>
 <tr><th>Loan Amount : </th><th>
 <InputNumber min={100} max={MAX_LOAN_LENS} step={1} value={loanAmount} onChange={changeLoan} style={{ width: 200 }} />
 </th></tr>
 <tr><th colspan="2" >

 {isConnected && isApproved && (
 <button shape="round" onClick={(event) => callLend(event, NFTid)} style={{ width: 140}}>
  Lend
 </button>  
 )}
  {isConnected  && !isApproved && (
 <button className="button" onClick={(event) => approve(event, item.id)} disabled={!approve || isDaiLoading || isMintStarted}
   data-mint-loading={isDaiLoading}
   data-mint-started={isMintStarted}
 >{isDaiLoading && "Waiting for Approval"}
  {isMintStarted && "-- approving --"}
  {!isDaiLoading && !isMintStarted && 'Approve Lending'}
 </button>  
 )}
  </th></tr> 
 </thead></table>

 </List.Item>
);}}/>


 <div>Loan Details {loanDetails}</div>
</div>

      </div>
      </div>
    </div>
  </div>

    </>
  );
};

export default lend;
