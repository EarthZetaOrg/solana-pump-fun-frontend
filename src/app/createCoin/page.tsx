"user client"
import UserContext from "@/context/UserContext";
import Link from "next/link"
import { useContext, useMemo } from "react";


export default function CreateCoin() {
    const selectFile = () => {
        console.log("upload button clicked.")
    }
    
    return (
        <div className="pt-[50px] w-[500px]  ">
            <Link href="/">
                <h1 className=" text-center font-normal hover:font-bold m-auto  cursor-pointer ">[go back]</h1>
            </Link>
            <div className=" pt-[20px] m-auto">
                <label htmlFor="name  py-[20px]"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">name</label>
                <input type="text" id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required />
            </div>
            <div className="pt-[20px] m-auto">
                <label htmlFor="ticker py-[20px]"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ticker</label>
                <input type="text" id="ticker"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ticker" required />
            </div>
            <div className=" pt-[20px] m-auto">
                <label htmlFor="ticker  py-[20px]"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">description</label>
                <textarea id="ticker"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="description" required />
            </div>
            <div className="mt-[20px] m-auto bg-white pt-2 rounded-lg">
                <input type="file" className="ml-2 mb-2" />
            </div>
            <div className="font-xl m-auto mt-5 w-24 ">
                <h1>
                    more option

                </h1>
            </div>
            <div className=" mt-[20px] m-auto rounded-lg bg-white text-center py-2  ">
                <button>create coin</button>
            </div>


        </div>
    )
}