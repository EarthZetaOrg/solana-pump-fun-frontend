import { createContext, useContext, useState, ReactNode } from 'react';
import { coinInfo } from '@/utils/types';
// interface WalletContextType {
//     user : userInfo;
//     setUser: (value: userInfo)=> void;
    
    
// }
// const walletContext = createContext<WalletContextType | undefined> ;

// export default walletContext;

const CoinContext = createContext({
    coin:{} as coinInfo,
    setCoin: (value: coinInfo) => {},
    
})

export default CoinContext;