// import { useEffect } from "react";

// import { useDarkMode, useIsMounted } from "usehooks-ts";
// import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export const SwitchTheme = ({ className }: { className?: string }) => {
  // const { isDarkMode, toggle } = useDarkMode();
  // const isMounted = useIsMounted();

  // useEffect(() => {
  //   const body = document.body;
  //   body.setAttribute("data-theme", isDarkMode ? "scaffoldEthDark" : "scaffoldEth");
  // }, [isDarkMode]);

  return (
    <div className={`flex space-x-2 text-sm ${className}`}>
      <a
        href="https://faucets.chain.link/sepolia"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline hover:text-black btn-sm"
      >
        Link Faucet
      </a>
      <a
        href="https://sepoliafaucet.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline hover:text-black btn-sm"
      >
        Sepolia Faucet
      </a>

      {/* <input
        id="theme-toggle"
        type="checkbox"
        className="toggle toggle-primary bg-primary"
        onChange={toggle}
        checked={isDarkMode}
      />
      {isMounted() && (
        <label htmlFor="theme-toggle" className={`swap swap-rotate ${!isDarkMode ? "swap-active" : ""}`}>
          <SunIcon className="swap-on h-5 w-5" />
          <MoonIcon className="swap-off h-5 w-5" />
        </label>
      )} */}
    </div>
  );
};
