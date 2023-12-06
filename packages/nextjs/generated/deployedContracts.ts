const contracts = {
  11155111: [
    {
      chainId: "11155111",
      name: "sepolia",
      contracts: {
        AggregatorV3Consumer: {
          address: "0xD91dFa60eA260A91F3E48b441515C23fCFDdd1f2",
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
          address: "0x68169EC2cAfE3f98A6bF5a4ED5c523A463454824",
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
                  name: "",
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
            {
              inputs: [
                {
                  internalType: "contract AutomationRegistrarInterface",
                  name: "_registrar",
                  type: "address",
                },
              ],
              name: "updateRegistrarAddress",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "contract AutomationRegistryBaseInterface",
                  name: "_registry",
                  type: "address",
                },
              ],
              name: "updateRegistryAddress",
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
        FunctionsConsumer: {
          address: "0x7855b9755E8A1704cd59288214fd50387e05c50C",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_router",
                  type: "address",
                },
                {
                  internalType: "uint64",
                  name: "_subscriptionId",
                  type: "uint64",
                },
                {
                  internalType: "uint32",
                  name: "_gasLimit",
                  type: "uint32",
                },
                {
                  internalType: "bytes32",
                  name: "_donID",
                  type: "bytes32",
                },
                {
                  internalType: "string",
                  name: "_weatherSource",
                  type: "string",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "EmptyArgs",
              type: "error",
            },
            {
              inputs: [],
              name: "EmptySource",
              type: "error",
            },
            {
              inputs: [],
              name: "NoInlineSecrets",
              type: "error",
            },
            {
              inputs: [],
              name: "OnlyRouterCanFulfill",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "requestId",
                  type: "bytes32",
                },
              ],
              name: "UnexpectedRequestID",
              type: "error",
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
                  internalType: "bytes32",
                  name: "id",
                  type: "bytes32",
                },
              ],
              name: "RequestFulfilled",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "id",
                  type: "bytes32",
                },
              ],
              name: "RequestSent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "requestId",
                  type: "bytes32",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "weatherResult",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "bytes",
                  name: "response",
                  type: "bytes",
                },
                {
                  indexed: false,
                  internalType: "bytes",
                  name: "err",
                  type: "bytes",
                },
              ],
              name: "Response",
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
              inputs: [
                {
                  internalType: "bytes32",
                  name: "requestId",
                  type: "bytes32",
                },
                {
                  internalType: "bytes",
                  name: "response",
                  type: "bytes",
                },
                {
                  internalType: "bytes",
                  name: "err",
                  type: "bytes",
                },
              ],
              name: "handleOracleFulfillment",
              outputs: [],
              stateMutability: "nonpayable",
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
              name: "s_lastError",
              outputs: [
                {
                  internalType: "bytes",
                  name: "",
                  type: "bytes",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "s_lastRequestId",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "s_lastResponse",
              outputs: [
                {
                  internalType: "bytes",
                  name: "",
                  type: "bytes",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string[]",
                  name: "args",
                  type: "string[]",
                },
              ],
              name: "sendRequest",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "requestId",
                  type: "bytes32",
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
              name: "weatherResult",
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
              name: "weatherSource",
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
          ],
        },
        VRFConsumer: {
          address: "0x421225a8cE7f2c561D3A857d82FD2d144DA82779",
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
