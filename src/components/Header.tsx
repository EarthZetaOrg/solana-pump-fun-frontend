import { FC } from "react";
import { ConnectButton } from "./ConnectButton";

interface HeaderProps {
    staked: number;
}
const Header: FC= () => {
    return (
        <header className="h-24">
            <div className="py-4 lg:py-7 z-50 relative float-right">
                <ConnectButton></ConnectButton>
                <div className="text-center cursor-pointer hover:bg-violet-800 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300">View  Profile</div>
            </div>
            

        </header>
    )
}
export default Header;