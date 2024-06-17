import { FC, useContext, useMemo } from "react";
import { ConnectButton } from "./ConnectButton";
import Link from "next/link";
import UserContext from "@/context/UserContext";

interface HeaderProps {
  staked: number;
}
const Header: FC = () => {
  return (
    <header className="h-[100px]">
      <div className="pt-4 flex justify-between">
        <div>
          <Link href="/">
            <svg
              className="ml-10 w-10 h-10 text-gray-300 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 14 20"
            >
              <path d="M13 20a1 1 0 0 1-.64-.231L7 15.3l-5.36 4.469A1 1 0 0 1 0 19V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17a1 1 0 0 1-1 1Z" />
            </svg>
          </Link>
        </div>
        <ConnectButton></ConnectButton>
      </div>
    </header>
  );
};
export default Header;
