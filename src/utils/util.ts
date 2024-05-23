import axios from 'axios'
import { userInfo } from './types';
import { error } from 'console';

const BASE_URL = process.env.BASE_URL;

export const test = async () => {
    const res = await fetch('http://localhost:5000/');
    const data = await res.json();
    console.log(data)
}
export const walletConnect = async({ data }: { data: userInfo }): Promise<any> => {
    try {
        // console.log("walletconnect request!!", data)
        // console.log(BASE_URL)
        const response = await axios.post(`http://localhost:5000/user/`, data)
        console.log("response:", response.data)
        return response.data
    } catch(err) {
        return {error:"error setting up the request"}
    }
}


export const confirmWallet = async({ data }: { data: userInfo }): Promise<any> => {
    try {
        console.log("confirm wallet request!!", data)
        // console.log(BASE_URL)
        const response = await axios.post(`http://localhost:5000/user/confirm`, data)
        console.log("response:", response.data)
        return response.data
    } catch(err) {
        return {error:"error setting up the request"}
    }
}

export const getCoinsInfo = async () => {
    const res = await fetch('http://localhost:5000/');
    const data = await res.json();

    return {
        props: { data }, // will be passed to the page component as props
    };
}