import Head from "next/head";
import type { NextPage } from "next";
import { ContractData } from "~~/components/example-ui/ContractData";
import { ContractInteraction } from "~~/components/example-ui/ContractInteraction";
//import {useScaffoldContractWrite} from "~~/hooks/scaffold-eth/useScaffoldContractWrite";
import { useScaffoldContractWrite, useScaffoldContractRead, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import React, { useEffect, useState } from "react";
import { useAccount, useContractWrite,usePrepareContractWrite,useContractRead, useWaitForTransaction,
  useContractEvent  } from "wagmi";
import daiContract from "../src/dai.json"; // Raw ABI import (pulled from etherscan)
import floorContract from "../src/floorLend.json"; // Raw ABI import (pulled from etherscan)

const { ethers } = require("ethers");

const vault: NextPage = () => {

    const {address, isConnected} = useAccount();

    const DAI_ADDRESS = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";
    const FLOOR_ADDRESS="0x0cD08bd0df3EFB1A5B12ae7A73C31E477f899278";
    const [depositAmount, setDepositAmount] = useState(0);  
    const [depositString, setDepositString] = useState(""); 
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    
    const contractConfig = {
      address: DAI_ADDRESS,
      abi: daiContract,
    };

    const contractConfig2 = {
      address: FLOOR_ADDRESS,
      abi: floorContract,
    };

    // ------------------READ CONTRACT ----------------------------------------
    const { data: vaultBalance, isLoading: isVaultBalance } = useScaffoldContractRead({
        contractName: "FloorLendingV2",
        functionName: "balanceOf",
        args:[address],
      }); 

      const { data: daiBalance, error: getNFTError } = useContractRead({
        ...contractConfig,
        functionName: "balanceOf",
        args: [FLOOR_ADDRESS], //hardcoded address can create a state variable
      });
    // ------------------ WRITE  CONTRACT ----------------------------------------
   //  function to call contract approve lendingcontract to use Blueberry NFT  
   const { config: approveLending, error: adminError } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "approve",
    args: [FLOOR_ADDRESS, ethers.utils.parseEther(depositAmount + "")], //hardcoded address can create a state variable
    onError(error: any) {
      console.log("Error", error);
    },
  });
  const {
    data: approveData,              // use this to get tx hash
    write: approveDai, 
    isLoading: isDaiLoading,
    isSuccess: isMintStarted,    
  } = useContractWrite(approveLending);


  const { config: deposit_Dai, error: adminErrordepositDai } = usePrepareContractWrite({
    ...contractConfig2,
    functionName: "deposit",
    args: [ethers.utils.parseEther(depositAmount + "")], //hardcoded address can create a state variable
    onError(error: any) {
      console.log("Error", error);
    },
  });
  const {
    data: depositData,              // use this to get tx hash
    write: depositDai, 
    isLoading: isDepositLoading,
    isSuccess: isDepositStarted,  
  } = useContractWrite(deposit_Dai);

  /* Write contract call
  const { writeAsync: depositDai, isLoading: isloadingDeposit } = useScaffoldContractWrite({
    contractName: "FloorLendingV2",
    functionName: "deposit",
    args:[ethers.utils.parseEther(depositAmount + "")],  
  });  */

  // Write contract call
  const { writeAsync: withdraw, isLoading: isloadingWithdraw } = useScaffoldContractWrite({
    contractName: "FloorLendingV2",
    functionName: "withdraw",
    args:[vaultBalance]
  });

   // Event contract call  ------------------------------EVENT LISTENERS --------------------

  useContractEvent({
    address: FLOOR_ADDRESS,
    abi: floorContract,
    eventName: 'vaultDepositEvent',
    listener(sender, amountDeposited) {
        setDepositString("Successfully deposited ".concat(ethers.utils.formatEther(amountDeposited.toString() )));
        console.log("DEPOSIT event listener " , sender, amountDeposited);
    },
  })

  useScaffoldEventSubscriber({
    contractName: "FloorLendingV2",
    eventName: "vaultWithdrawEvent",
    listener: (sender, amountDeposited) => {
      setDepositString("Successfully withdrew ".concat(amountDeposited.toString()));
      console.log("WITHDRAW event listener " , sender, amountDeposited);
    },
  });

  const approveVault = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, nftNumber: number) =>{ 
    console.log("approval amount " , ethers.utils.parseEther(depositAmount + ""))
    try{   
      approveDai?.()
    }catch(e) {alert (e); console.log(e);}
  }

  const depositVault = async () =>{ 
    try{  
      console.log("deposit dai" )     
      depositDai?.()
    }catch(e) {alert (e); console.log(e);}
  }
  const withdrawVault = async () =>{ 
    setWithdrawAmount(vaultBalance)
    console.log("withdrawal amount " , vaultBalance)   
    try{   
      withdraw()
    }catch(e) {alert (e); console.log(e);}
  }

  const {isSuccess: txSuccess } = useWaitForTransaction({
    hash:approveData?.hash
  })
const isApproved = txSuccess;

const {isSuccess: txDepositSuccess } = useWaitForTransaction({
  hash:depositData?.hash
})
const isApproved2 = txDepositSuccess;

  return (
    <>
      <Head>
        <title>NFT DAI VAULT</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />

      </Head>
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
        <div className={`mt-10 flex gap-2  max-w-2xl`}>
          <div className="flex gap-5 bg-base-200 bg-opacity-80 z-0 p-7 rounded-2xl shadow-lg">    
      <div  suppressHydrationWarning={true}>
 <h1>DAI Vault</h1> <h2>Deposit DAI into the vault to earn interest on NFT loans and liquidations.</h2>
  <input type="number" 
              placeholder="Enter deposit amount"          
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={e => setDepositAmount(e.target.value)}
            />

{isConnected  && !isApproved && (
 <button className="button" onClick={(event) => approveVault(event, depositAmount)} disabled={!approveDai || isDaiLoading || isMintStarted}
   data-mint-loading={isDaiLoading}
   data-mint-started={isMintStarted}
 >{isDaiLoading && "Waiting for Approval"}
  {isMintStarted && "-- approving --"}
  {!isDaiLoading && !isMintStarted && 'Approve Vault'}
 </button>  
 )}

{isConnected && isApproved && !isApproved2 &&(
  <button  className="button" onClick={() => depositVault()}
  data-deposit-loading={isDepositLoading}  
  data-deposit-started={isDepositStarted}
  >
  {isDepositLoading && "Confirm Deposit"}    
  {isDepositStarted && "-- Depositing --"} 
  {!isDepositLoading && !isDepositStarted && 'Deposit'} 
  </button>
)}

{isApproved2 && ( 
<div>{depositString} DAI <a href={`https://polygonscan.com/tx/${depositData?.hash}`}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
>View TX on polyscan</a></div>
)}
<br />
Your vault shares balance is {vaultBalance ? ethers.utils.formatEther(vaultBalance) : "0"}
<br />
Dai available for lending {daiBalance ? ethers.utils.formatEther(daiBalance) : "0"}
<br />
<button className="button" onClick={() => withdrawVault()}>Withdraw</button> 
      </div>
      </div>
    </div>
  </div>

  
    </>
  );
};

export default vault;
