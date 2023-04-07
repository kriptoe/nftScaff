const contracts = {
  137: [
    {
      name: "polygon",
      chainId: "137",
      contracts: {
        FloorLendingV2: {
          address: "0x0cD08bd0df3EFB1A5B12ae7A73C31E477f899278",
          abi: [
            {
              inputs: [
                {
                  internalType: "contract ERC721Enumerable",
                  name: "addr",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_token",
                  type: "address",
                },
              ],
              stateMutability: "payable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "alreadyListed",
              type: "error",
            },
            {
              inputs: [],
              name: "cantBorrowThatMuch",
              type: "error",
            },
            {
              inputs: [],
              name: "notEnoughDAI",
              type: "error",
            },
            {
              inputs: [],
              name: "notOwner",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "liquidationPrice",
                  type: "uint256",
                },
              ],
              name: "liquidationEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "NFTid",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "collectionID",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "loanAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "dueDate",
                  type: "uint256",
                },
              ],
              name: "loanEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "NFTid",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "loanAmount",
                  type: "uint256",
                },
              ],
              name: "repayLoanEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "vaultDepositEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "vaultWithdrawEvent",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "contract ERC721Enumerable",
                  name: "_nft",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_collectionID",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxLoan",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_loanDecayRate",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxDays",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_interestRate",
                  type: "uint256",
                },
              ],
              name: "addNFTCollection",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenID",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "collectionID",
                  type: "uint256",
                },
              ],
              name: "calculateBorrowFee",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "deposit",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "getBalance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "i",
                  type: "uint256",
                },
              ],
              name: "getCollection",
              outputs: [
                {
                  internalType: "contract ERC721Enumerable",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenID",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "collectionID",
                  type: "uint256",
                },
              ],
              name: "getDueDate",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "addr",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "cid",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "position",
                  type: "uint256",
                },
              ],
              name: "getLoanID",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "addr",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "cid",
                  type: "uint256",
                },
              ],
              name: "getMappingLength",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "i",
                  type: "uint256",
                },
              ],
              name: "getMaxLoan",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_shares",
                  type: "uint256",
                },
              ],
              name: "getShareValue",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "loanLength",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "collectionID",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_loanAmount",
                  type: "uint256",
                },
              ],
              name: "lend",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "collectionID",
                  type: "uint256",
                },
              ],
              name: "liquidate",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "loanData",
              outputs: [
                {
                  internalType: "uint256",
                  name: "collectionID",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "maxLoanAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "loanDecayRate",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "maxDays",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "interestRate",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "loans",
              outputs: [
                {
                  internalType: "uint256",
                  name: "collectionID",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "startDate",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "endDate",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "loanAmount",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "liquidated",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "interestRate",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "bytes",
                  name: "",
                  type: "bytes",
                },
              ],
              name: "onERC721Received",
              outputs: [
                {
                  internalType: "bytes4",
                  name: "",
                  type: "bytes4",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "collectionID",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "repayLoan",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_liquidationFee",
                  type: "uint256",
                },
              ],
              name: "setLiquidationFee",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "collectionID",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_decayRate",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxDays",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_rate",
                  type: "uint256",
                },
              ],
              name: "setLoanData",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "token",
              outputs: [
                {
                  internalType: "contract IERC20",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "userLoans",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_shares",
                  type: "uint256",
                },
              ],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "addr",
                  type: "address",
                },
              ],
              name: "withdraw2",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdrawAll",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
  31337: [
    {
      name: "localhost",
      chainId: "31337",
      contracts: {
        FloorLendingV2: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [
                {
                  internalType: "contract ERC721Enumerable",
                  name: "addr",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_token",
                  type: "address",
                },
              ],
              stateMutability: "payable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "alreadyListed",
              type: "error",
            },
            {
              inputs: [],
              name: "cantBorrowThatMuch",
              type: "error",
            },
            {
              inputs: [],
              name: "notEnoughDAI",
              type: "error",
            },
            {
              inputs: [],
              name: "notOwner",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "liquidationPrice",
                  type: "uint256",
                },
              ],
              name: "liquidationEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "NFTid",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "collectionID",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "loanAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "dueDate",
                  type: "uint256",
                },
              ],
              name: "loanEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "NFTid",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "loanAmount",
                  type: "uint256",
                },
              ],
              name: "repayLoanEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "vaultDepositEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "vaultWithdrawEvent",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "contract ERC721Enumerable",
                  name: "_nft",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_collectionID",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxLoan",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_loanDecayRate",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxDays",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_interestRate",
                  type: "uint256",
                },
              ],
              name: "addNFTCollection",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenID",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "collectionID",
                  type: "uint256",
                },
              ],
              name: "calculateBorrowFee",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "deposit",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "getBalance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "i",
                  type: "uint256",
                },
              ],
              name: "getCollection",
              outputs: [
                {
                  internalType: "contract ERC721Enumerable",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenID",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "collectionID",
                  type: "uint256",
                },
              ],
              name: "getDueDate",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "addr",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "cid",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "position",
                  type: "uint256",
                },
              ],
              name: "getLoanID",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "addr",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "cid",
                  type: "uint256",
                },
              ],
              name: "getMappingLength",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "i",
                  type: "uint256",
                },
              ],
              name: "getMaxLoan",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_shares",
                  type: "uint256",
                },
              ],
              name: "getShareValue",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "loanLength",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "collectionID",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_loanAmount",
                  type: "uint256",
                },
              ],
              name: "lend",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "collectionID",
                  type: "uint256",
                },
              ],
              name: "liquidate",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "loanData",
              outputs: [
                {
                  internalType: "uint256",
                  name: "collectionID",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "maxLoanAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "loanDecayRate",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "maxDays",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "interestRate",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "loans",
              outputs: [
                {
                  internalType: "uint256",
                  name: "collectionID",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "startDate",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "endDate",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "loanAmount",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "liquidated",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "interestRate",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "bytes",
                  name: "",
                  type: "bytes",
                },
              ],
              name: "onERC721Received",
              outputs: [
                {
                  internalType: "bytes4",
                  name: "",
                  type: "bytes4",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "collectionID",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "repayLoan",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_liquidationFee",
                  type: "uint256",
                },
              ],
              name: "setLiquidationFee",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "collectionID",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_decayRate",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxDays",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_rate",
                  type: "uint256",
                },
              ],
              name: "setLoanData",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "token",
              outputs: [
                {
                  internalType: "contract IERC20",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "userLoans",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_shares",
                  type: "uint256",
                },
              ],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "addr",
                  type: "address",
                },
              ],
              name: "withdraw2",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdrawAll",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
