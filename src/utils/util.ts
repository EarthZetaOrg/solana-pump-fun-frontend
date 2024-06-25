import axios from 'axios'
import { ChartTable, coinInfo, userInfo } from './types';

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const test = async () => {
    const res = await fetch(`${BACKEND_URL}`);
    const data = await res.json();
    console.log(data)
}
export const getUser = async ({ id }: { id: string }): Promise<any> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/user/${id}`)
        console.log("response:", response.data)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}

export const walletConnect = async ({ data }: { data: userInfo }): Promise<any> => {
    try {
        console.log("============walletConnect=========")
        const response = await axios.post(`${BACKEND_URL}/user/`, data)
        console.log("==============response=====================", response.data)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}


export const confirmWallet = async ({ data }: { data: userInfo }): Promise<any> => {
    try {
        const response = await axios.post(`${BACKEND_URL}/user/confirm`, data)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}

export const createNewCoin = async (data: coinInfo) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/coin/`, data)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}

export const getCoinsInfo = async (): Promise<coinInfo[]> => {
    const res = await axios.get(`${BACKEND_URL}/coin`);
    console.log("coin", `${BACKEND_URL}/coin`)
    return res.data
}
export const getCoinsInfoBy = async (id: string): Promise<coinInfo[]> => {
    
    const res = await axios.get<coinInfo[]>(`${BACKEND_URL}/coin/user/${id}`);
    return res.data
}
export const getCoinInfo = async (data: string): Promise<any> => {
    try {
        console.log("coinINfo", data)
        const response = await axios.get(`${BACKEND_URL}/coin/${data}`,)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}

export const getUserInfo = async (data: string): Promise<any> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/user/${data}`,)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}

export const getMessageByCoin = async (data: string): Promise<any> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/feedback/coin/${data}`,)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}


export const getCoinTrade = async (data: string): Promise<any> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/cointrade/${data}`,)
        console.log("trade response::", response)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}


