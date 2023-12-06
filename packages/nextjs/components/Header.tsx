import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Bars3Icon, BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  newTab?: boolean; // new prop to decide whether to open the link in a new tab or not
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, newTab = false }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      passHref
      target={newTab ? "_blank" : "_self"}
      rel={newTab ? "noopener noreferrer" : ""}
      className={`${
        isActive ? "bg-secondary shadow-md" : ""
      } flex items-center hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-xl rounded-full gap-2 grid grid-flow-col`}
    >
      {children}
    </Link>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);

  const network = getTargetNetwork();

  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  const navLinks = (
    <>
      <li>
        <NavLink href="/price-feeds">📈 Price Feeds</NavLink>
      </li>
      <li>
        <NavLink href="/vrf">🎲 VRF</NavLink>
      </li>
      <li>
        <NavLink href="/automation">🤖 Automation</NavLink>
      </li>
      <li>
        <NavLink href="/functions">💻 Functions</NavLink>
      </li>
      <li>
        <NavLink href="/debug">
          <BugAntIcon className="h-4 w-4" />
          Contracts
        </NavLink>
      </li>
      {network.id === 31337 && (
        <li>
          <NavLink href="/blockexplorer">
            <MagnifyingGlassIcon className="h-4 w-4" />
            Block Explorer
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky xl:static top-0 navbar border-b-2 border-base-200 min-h-0 flex-shrink-0 justify-between z-20 px-0 sm:px-2">
      <div className="navbar-start w-auto">
        <div className="xl:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              {navLinks}
            </ul>
          )}
        </div>
        <Link href="/" passHref className="hidden xl:flex items-center gap-2 ml-4 mr-6 shrink-0 font-cubano text-3xl">
          Speedrun Chainlink
        </Link>
        <div>
          <ul className="hidden xl:flex xl:flex-nowrap menu menu-horizontal px-1 gap-2">{navLinks}</ul>
        </div>
      </div>

      <div className=" mr-4">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </div>
  );
};
