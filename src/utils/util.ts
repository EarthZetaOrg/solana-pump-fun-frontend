import axios from 'axios'
import { ChartTable, coinInfo, userInfo } from './types';

const BASE_URL = process.env.BASE_URL;

export const test = async () => {
    const res = await fetch('http://localhost:5000/');
    const data = await res.json();
    console.log(data)
}
export const getUser = async ({ id }: { id: string }): Promise<any> => {
    try {
        const response = await axios.get(`http://localhost:5000/user/${id}`)
        console.log("response:", response.data)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}

export const walletConnect = async ({ data }: { data: userInfo }): Promise<any> => {
    try {
        console.log("============walletConnect=========")
        const response = await axios.post(`http://localhost:5000/user/`, data)
        console.log("==============response=====================", response.data)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}


export const confirmWallet = async ({ data }: { data: userInfo }): Promise<any> => {
    try {
        const response = await axios.post(`http://localhost:5000/user/confirm`, data)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}

export const createNewCoin = async (data: coinInfo) => {
    try {
        const response = await axios.post(`http://localhost:5000/coin/`, data)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}

export const getCoinsInfo = async (): Promise<coinInfo[]> => {
    const res = await axios.get<coinInfo[]>('http://localhost:5000/coin');
    return res.data
}
export const getCoinsInfoBy = async (id: string): Promise<coinInfo[]> => {
    
    const res = await axios.get<coinInfo[]>(`http://localhost:5000/coin/user/${id}`);
    return res.data
}
export const getCoinInfo = async (data: string): Promise<any> => {
    try {
        console.log("coinINfo", data)
        const response = await axios.get(`http://localhost:5000/coin/${data}`,)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}

export const getUserInfo = async (data: string): Promise<any> => {
    try {
        const response = await axios.get(`http://localhost:5000/user/${data}`,)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}

export const getMessageByCoin = async (data: string): Promise<any> => {
    try {
        const response = await axios.get(`http://localhost:5000/feedback/coin/${data}`,)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}


export const getCoinTrade = async (data: string): Promise<any> => {
    try {
        const response = await axios.get(`http://localhost:5000/cointrade/${data}`,)
        console.log("trade response::", response)
        return response.data
    } catch (err) {
        return { error: "error setting up the request" }
    }
}

export async function getChartTable({
    pairIndex,
}: {
    pairIndex: number;
}): Promise<ChartTable> {
    try {
        const res = await axios.get(
            `${("http://localhost:5000/cointrade")}/${pairIndex}`,
        )

        if (!res) {
            throw new Error();
        }

        return res.data 
    } catch (err) {
        return Promise.reject(new Error("Failed at fetching charts"));
    }
}

