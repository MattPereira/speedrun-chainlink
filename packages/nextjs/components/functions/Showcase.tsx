import { ExternalLinkButton } from "~~/components/common";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContract, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

// https://gist.githubusercontent.com/MattPereira/110db22c9d24cc1b30298f2818e2d6ef/raw
// below is above URL encrypted with secretsManager.encryptSecretsUrls()
const encryptedSecretsReference =
  "0x822432d0a83c5c2308b6fd1a06964bbf027b1aae2beb4997b2d766011d4da126a0e6a5e32d5977862178c975eb35d5473758e4d84f19fc08a88ef8f1166bfda8704c5e35bea4f6ca31078b14eca867accb7418ba049a3c1d6c08819da13a87ead4a860cb0fad5d77658263c791d73641fb76554f370c03286ae1fe11bf6089e2483a25bb30fc7c93db01a5080206042ae5dc64a022f167a455720ac1e2992ec6c7";

export const Showcase = () => {
  const { data: functionsConsumerContract } = useScaffoldContract({ contractName: "FunctionsConsumer" });

  const { writeAsync: sendRequest } = useScaffoldContractWrite({
    contractName: "FunctionsConsumer",
    functionName: "sendRequest",
    args: [["94521", "US", "metric"], encryptedSecretsReference],
  });

  // const { data: weatherResult } = useScaffoldContractRead({
  //   contractName: "FunctionsConsumer",
  //   functionName: "weatherResult",
  // });

  const { data: s_lastError } = useScaffoldContractRead({
    contractName: "FunctionsConsumer",
    functionName: "s_lastError",
  });

  const { data: s_lastResponse } = useScaffoldContractRead({
    contractName: "FunctionsConsumer",
    functionName: "s_lastResponse",
  });

  return (
    <section>
      <div className="flex flex-wrap justify-center sm:justify-between gap-4 items-center mb-10">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl md:text-4xl mb-0 font-bold">FunctionsConsumer</h3>
          <ExternalLinkButton href="https://github.com/MattPereira/speedrun-chainlink/blob/main/packages/hardhat/contracts/FunctionsConsumer.sol" />
        </div>
        <div>
          <Address size="xl" address={functionsConsumerContract?.address} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-xl">
            Chainlink functions are used to send a request from a smart contract to a decentralized oracle network (DON)
            which executes the provided source code in off chain environment and returns the result on chain through the
            `fulfillRequest` function
          </p>
          <button className="btn btn-primary" onClick={() => sendRequest()}>
            Send Request
          </button>

          <div className="mt-5">
            <h5 className="font-bold text-3xl">TODO</h5>
            <ul>
              <li>Debug to get successful response</li>
              <li>Store latest city/country on chain</li>
              <li>Display city/country for latest request on chain</li>
              <li>Fancy user interface that shows image of sun if hot, clouds if cold, etc...</li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-3xl text-center mb-5 font-bold">On Chain Weather</h3>
          <div>
            <label className="text-xl font-semibold">s_lastResponse ( bytes )</label>
            <div className="w-full overflow-x-auto hide-scrollbar">{s_lastResponse?.toString()}</div>

            <label className="text-xl font-semibold">s_lastError ( bytes )</label>
            <div className="w-full overflow-x-auto hide-scrollbar">{s_lastError?.toString()}</div>
            <div className="text-xl">{s_lastError && decodeHexError(s_lastError)}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

function decodeHexError(hexString: string) {
  // Remove the '0x' prefix if it exists
  if (hexString.startsWith("0x")) {
    hexString = hexString.substring(2);
  }

  // Convert the hex string to a Buffer
  const buffer = Buffer.from(hexString, "hex");

  // Convert the Buffer to a string
  return buffer.toString("utf8");
}
