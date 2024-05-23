"use client"
import { userInfo } from '@/utils/types';
import { createContext, useContext, useState, ReactNode } from 'react';

// interface WalletContextType {
//     user : userInfo;
//     setUser: (value: userInfo)=> void;
    
    
// }
// const walletContext = createContext<WalletContextType | undefined> ;

// export default walletContext;

const UserContext = createContext({
    user: {} as userInfo,
    setUser: (value: userInfo) => {},
    login: false,
    setLogin: (value: boolean) => {},
    isLoading: false,
    setIsLoading: (value: boolean) => {}
})

export default UserContext;