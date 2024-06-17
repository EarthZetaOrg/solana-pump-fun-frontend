"use client";

import UserContext from "@/context/UserContext";
import { coinInfo } from "@/utils/types";
import { createNewCoin } from "@/utils/util";
import Link from "next/link";
import {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export default function CreateCoin() {
  const { user, imageUrl, setImageUrl, isCreated, setIsCreated } = useContext(UserContext);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [newCoin, setNewCoin] = useState<coinInfo>({} as coinInfo);
  const [isCreate, setIsCreate] = useState(false);
  const [visible, setVisible] = useState<Boolean>(false);
  const JWT = process.env.NEXT_PUBLIC_PINATA_PRIVATE_KEY;
  useEffect(() => {
    if (
      newCoin.name !== undefined &&
      newCoin.creator !== undefined &&
      typeof newCoin.marketcap === "number" &&
      typeof newCoin.replies === "number" &&
      newCoin.ticker !== undefined
    )
      setIsCreate(true);
  }, [newCoin]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewCoin({ ...newCoin, [e.target.id]: e.target.value });
  };

  const createCoin = async () => {
    if (imageUrl) {
      const url = await uploadImage(imageUrl);
      console.log("create Coin =========",user)
      if(url && user._id){
        const coin: coinInfo = {...newCoin, creator:user._id.toString(), url:url}
        console.log(coin)
        const created = await createNewCoin(coin);
        setIsCreated(created);
      }
    } else {
      console.error("Image URL is not defined");
    }
  };

  const pinFileToIPFS = async (blob: File) => {
    try {
      const data = new FormData();
      data.append("file", blob);
      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
          body: data,
        }
      );
      const resData = await res.json();
      return resData;
    } catch (error) {
      console.log(error);
    }
  };
  const uploadImage = async (url: string) => {
    const res = await fetch(url);
    console.log(res.blob);
    const blob = await res.blob();

    const imageFile = new File([blob], "image.png", { type: "image/png" });
    console.log(imageFile);
    const resData = await pinFileToIPFS(imageFile);
    console.log(resData, "RESDATA>>>>");
    if (resData) {
      return `https://gateway.pinata.cloud/ipfs/${resData.IpfsHash}`;
    } else {
      return false;
    }
    // const file = await createGenericFileFromBrowserFile(imageFile);

    // const [uri] = await umi.uploader.upload([file]);
    // console.log(uri, 'uriHash');
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    console.log("========", file);
    if (file) {
      const url = URL.createObjectURL(file);
      console.log("url++++++", url);
      setImageUrl(url);

      // Resetting the value of the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  return (
    <div className=" w-[500px] m-auto ">
      <Link href="/">
        <h1 className=" text-center font-normal hover:font-bold m-auto  cursor-pointer ">
          [go back]
        </h1>
      </Link>
      <div className=" pt-[20px] m-auto">
        <label
          htmlFor="name  py-[20px]"
          className="block mb-2 text-sm font-medium text-white"
        >
          name*
        </label>
        <input
          type="text"
          id="name"
          value={newCoin.name}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name"
          required
        />
      </div>
      <div className="pt-[20px] m-auto">
        <label
          htmlFor="ticker py-[20px]"
          className="block mb-2 text-sm font-medium text-white"
        >
          ticker*
        </label>
        <input
          type="text"
          id="ticker"
          value={newCoin.ticker}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="ticker"
          required
        />
      </div>
      <div className=" pt-[20px] m-auto">
        <label
          htmlFor="description  py-[20px]"
          className="block mb-2 text-sm font-medium text-white"
        >
          description
        </label>
        <textarea
          id="description"
          value={newCoin.description}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="description"
          required
        />
      </div>
      <div className="mt-[20px] m-auto bg-white pt-2 rounded-lg">
        <input
          type="file"
          className="ml-2 mb-2"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </div>
      <div className="font-xl m-auto mt-5 w-24 ">
        <h1
          className="hover:text-gray-400 cursor-pointer text-white"
          onClick={() => setVisible(!visible)}
        >
          more option
        </h1>
      </div>
      {visible && (
        <>
          <div className=" m-auto">
            <label
              htmlFor="twitter py-[20px]"
              className="block mb-2 text-sm font-medium text-white"
            >
              Twitter
            </label>
            <input
              type="text"
              id="twitter"
              value={newCoin.twitter}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Optional"
              required
            />
          </div>
          {/* <div className="pt-[20px] m-auto">
            <label
              htmlFor="ticker py-[20px]"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ticker*
            </label>
            <input
              type="text"
              id="ticker"
              value={newCoin.ticker}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ticker"
              required
            />
          </div>
          <div className="pt-[20px] m-auto">
            <label
              htmlFor="ticker py-[20px]"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ticker*
            </label>
            <input
              type="text"
              id="ticker"
              value={newCoin.ticker}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ticker"
              required
            />
          </div> */}
        </>
      )}
      <div>
        <Link href={`/`}>
          <button
            className=" mt-[20px] active:bg-slate-900 m-auto rounded-lg bg-white hover: text-center py-2 w-full"
            onClick={createCoin}
            disabled={isCreate}
          >
            create coin
          </button>
        </Link>
      </div>
    </div>
  );
}
