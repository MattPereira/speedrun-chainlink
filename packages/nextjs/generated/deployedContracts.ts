const contracts = {
  11155111: [
    {
      chainId: "11155111",
      name: "sepolia",
      contracts: {
        AggregatorV3Consumer: {
          address: "0x144379F31185749Ab6b8A77ece55FD3A614C66d4",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "priceFeedAddress",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "getDecimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getDescription",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getLatestPrice",
              outputs: [
                {
                  internalType: "int256",
                  name: "",
                  type: "int256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getVersion",
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
          ],
        },
        AutomationConsumer: {
          address: "0x878758869763463082c27E996386A9b80Dc85323",
          abi: [
            {
              inputs: [
                {
                  internalType: "contract LinkTokenInterface",
                  name: "link",
                  type: "address",
                },
                {
                  internalType: "contract AutomationRegistrarInterface",
                  name: "registrar",
                  type: "address",
                },
                {
                  internalType: "contract AutomationRegistryBaseInterface",
                  name: "registry",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "AutomationConsumer__UpkeepNotNeeded",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "counter",
                  type: "uint256",
                },
              ],
              name: "CounterStarted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "counter",
                  type: "uint256",
                },
              ],
              name: "CounterStopped",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "interval",
                  type: "uint256",
                },
              ],
              name: "IntervalUpdated",
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
                  internalType: "uint256",
                  name: "timestamp",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "counter",
                  type: "uint256",
                },
              ],
              name: "UpkeepPerformed",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "checkData",
                  type: "bytes",
                },
              ],
              name: "checkUpkeep",
              outputs: [
                {
                  internalType: "bool",
                  name: "upkeepNeeded",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "performData",
                  type: "bytes",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint96",
                  name: "amount",
                  type: "uint96",
                },
              ],
              name: "fundUpkeep",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "getUpkeepInfo",
              outputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "target",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "executeGas",
                      type: "uint32",
                    },
                    {
                      internalType: "bytes",
                      name: "checkData",
                      type: "bytes",
                    },
                    {
                      internalType: "uint96",
                      name: "balance",
                      type: "uint96",
                    },
                    {
                      internalType: "address",
                      name: "admin",
                      type: "address",
                    },
                    {
                      internalType: "uint64",
                      name: "maxValidBlocknumber",
                      type: "uint64",
                    },
                    {
                      internalType: "uint32",
                      name: "lastPerformBlockNumber",
                      type: "uint32",
                    },
                    {
                      internalType: "uint96",
                      name: "amountSpent",
                      type: "uint96",
                    },
                    {
                      internalType: "bool",
                      name: "paused",
                      type: "bool",
                    },
                    {
                      internalType: "bytes",
                      name: "offchainConfig",
                      type: "bytes",
                    },
                  ],
                  internalType: "struct UpkeepInfo",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "i_link",
              outputs: [
                {
                  internalType: "contract LinkTokenInterface",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "i_registrar",
              outputs: [
                {
                  internalType: "contract AutomationRegistrarInterface",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "i_registry",
              outputs: [
                {
                  internalType: "contract AutomationRegistryBaseInterface",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
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
              inputs: [
                {
                  internalType: "bytes",
                  name: "performData",
                  type: "bytes",
                },
              ],
              name: "performUpkeep",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  components: [
                    {
                      internalType: "string",
                      name: "name",
                      type: "string",
                    },
                    {
                      internalType: "bytes",
                      name: "encryptedEmail",
                      type: "bytes",
                    },
                    {
                      internalType: "address",
                      name: "upkeepContract",
                      type: "address",
                    },
                    {
                      internalType: "uint32",
                      name: "gasLimit",
                      type: "uint32",
                    },
                    {
                      internalType: "address",
                      name: "adminAddress",
                      type: "address",
                    },
                    {
                      internalType: "uint8",
                      name: "triggerType",
                      type: "uint8",
                    },
                    {
                      internalType: "bytes",
                      name: "checkData",
                      type: "bytes",
                    },
                    {
                      internalType: "bytes",
                      name: "triggerConfig",
                      type: "bytes",
                    },
                    {
                      internalType: "bytes",
                      name: "offchainConfig",
                      type: "bytes",
                    },
                    {
                      internalType: "uint96",
                      name: "amount",
                      type: "uint96",
                    },
                  ],
                  internalType: "struct RegistrationParams",
                  name: "params",
                  type: "tuple",
                },
              ],
              name: "registerNewUpkeep",
              outputs: [],
              stateMutability: "nonpayable",
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
              inputs: [],
              name: "resetCounter",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "s_counter",
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
              inputs: [],
              name: "s_interval",
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
              inputs: [],
              name: "s_isCounting",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "s_lastTimestamp",
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
              inputs: [],
              name: "s_maxCounterValue",
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
              inputs: [],
              name: "s_upkeepID",
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
                  name: "_upkeepID",
                  type: "uint256",
                },
              ],
              name: "setUpkeepID",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "startCounting",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "stopCounting",
              outputs: [],
              stateMutability: "nonpayable",
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
                  internalType: "uint256",
                  name: "_interval",
                  type: "uint256",
                },
              ],
              name: "updateInterval",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        VRFConsumer: {
          address: "0x0994A8aF29771ffc388e575FD7914321d36e2b69",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_linkAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_wrapperAddress",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
              ],
              name: "OwnershipTransferRequested",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
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
                  internalType: "uint256",
                  name: "requestId",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "spinner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "randomValue",
                  type: "uint256",
                },
              ],
              name: "WheelResult",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "requestId",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "spinner",
                  type: "address",
                },
              ],
              name: "WheelSpun",
              type: "event",
            },
            {
              inputs: [],
              name: "acceptOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "getLinkBalance",
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
              inputs: [],
              name: "linkAddress",
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
              inputs: [
                {
                  internalType: "uint256",
                  name: "_requestId",
                  type: "uint256",
                },
                {
                  internalType: "uint256[]",
                  name: "_randomWords",
                  type: "uint256[]",
                },
              ],
              name: "rawFulfillRandomWords",
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
              name: "s_results",
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
                  name: "",
                  type: "uint256",
                },
              ],
              name: "s_spinners",
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
              name: "spinWheel",
              outputs: [
                {
                  internalType: "uint256",
                  name: "requestId",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdrawLink",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
