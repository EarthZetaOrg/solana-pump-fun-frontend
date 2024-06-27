"use client";
import { CoinBlog } from "@/components/CoinBlog";
import Modal from "@/components/Modal";
import UserContext from "@/context/UserContext";
import { coinInfo, userInfo } from "@/utils/types";
import { getCoinsInfo, getCoinsInfoBy, getUser } from "@/utils/util";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";

export default function Page() {
  const { user, imageUrl, setImageUrl } = useContext(UserContext);
  const pathname = usePathname();
  const [param, setParam] = useState<string | null>(null);
  const [index, setIndex] = useState<userInfo>({} as userInfo);
  const [option, setOption] = useState<number>(1);
  const [data, setData] = useState<coinInfo[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Extract the last segment of the pathname
    const segments = pathname.split("/");
    const id = segments[segments.length - 1];
    if (id && id !== param) {
      setParam(id);

      // Async function to fetch user data
      const handleClick = async () => {
        try {
          const response = await getUser({ id });
          setIndex(response);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };

      handleClick(); // Call only once when id changes
    }
  }, [pathname]);
  useEffect(() => {
    const fetchData = async () => {
      if (option == 4 && param) {
        const coinsBy = await getCoinsInfoBy(param);
        setData(coinsBy);
      }
    }
    fetchData();
  }, [option])

  const handleModalClose = () => {
    setIsModal(false);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);

      // Resetting the value of the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  
  return (
    <div>
      <div className="grid gap-4 justify-center ml-24">
        <div className="flex m-auto justify-center">
          {index.avatar !== undefined && (
            <img
              src={`${index.avatar}`}
              alt="Token IMG"
              className="rounded object-cover w-24 h-24"
            />
          )}
          <div className="ml-4 text-white">
            <p className="text-xl mb-3">@{index.name}</p>
            <p className="text-xl my-3">0 followers</p>
            <p className="text-xl my-3">dev</p>
            <button className="text-2xl border-solid border-2 p-2 rounded-md border-white" onClick={() => setIsModal(true)}>
              Edit profile
            </button>
            <div className="flex m-3 text-xl justify-between">
              <div className=" text-red-800 mr-3">Likes received: {0} </div>
              <div>Mentions received: {0}</div>
            </div>
          </div>
        </div>
        <div className=" text-center flex justify-center ">
          <p className="text-xl border-solid w-[560px] border-2 p-2 rounded-md border-gray-500 text-white">
            {index.wallet}
          </p>
        </div>
        <div className=" text-right w-[130px]">
          <Link href={`https://solscan.io/account/${index.wallet}`}>
            <p className="text-white text-md hover:border-1 hover:border-white hover:border-b-2  text-center">
              View on Solscan
            </p>
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
        <p
          className={
            option === 1
              ? `hover:bg-green-600 text-md text-center p-2 bg-green-400 rounded-md m-2`
              : "hover:bg-stone-700  p-2 rounded m-2 text-gray-400"
          }
          onClick={() => setOption(1)}
        >
          Coins held
        </p>
        {user.wallet === index.wallet && (
          <p
            className={
              option === 2
                ? `hover:bg-green-600 text-md text-center p-2 bg-green-400 rounded-md m-2`
                : "hover:bg-stone-700 p-2 rounded m-2 text-gray-400"
            }
            onClick={() => setOption(2)}
          >
            Replies
          </p>
        )}
        <p
          className={
            option === 3
              ? `hover:bg-green-600 text-md text-center p-2 bg-green-400 rounded-md m-2`
              : "hover:bg-stone-700  p-2 rounded m-2 text-gray-400"
          }
          onClick={() => setOption(3)}
        >
          Notifications
        </p>
        <p
          className={
            option === 4
              ? `hover:bg-green-600 text-md text-center p-2 bg-green-400 rounded-md m-2`
              : "hover:bg-stone-700  p-2 rounded m-2 text-gray-400"
          }
          onClick={() => setOption(4)}
        >
          Coins Created
        </p>
        <p
          className={
            option === 5
              ? `hover:bg-green-600 text-md text-center p-2 bg-green-400 rounded-md m-2`
              : "hover:bg-stone-700  p-2 rounded m-2 text-gray-400"
          }
          onClick={() => setOption(5)}
        >
          Followers
        </p>
        <p
          className={
            option === 6
              ? `hover:bg-green-600 text-md text-center p-2 bg-green-400 rounded-md m-2`
              : "hover:bg-stone-700 p-2 rounded m-2 text-gray-400"
          }
          onClick={() => setOption(6)}
        >
          Following
        </p>
      </div>
      <Modal isOpen={isModal} onClose={handleModalClose}>
        <h2 className="text-2xl mb-4">Edit Profile</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="username">
              Username
            </label>
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              id="username"
              name="username"
              value={index.name}
              // onChange={}
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
          <div className="flex justify-around">
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
              Save
            </button >
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={()=>setIsModal(false)}>
            cancel
          </button>
          </div>
        </form>
      </Modal>
      <div>
        {(option == 4) &&
          <div className="flex justify-center">
            {
              data.map((coin, index) => (
                <Link key={index} href={`/trading/${coin?.token}`}>
                  <CoinBlog coin={coin} componentKey="coin" />
                </Link>
              ))
            }
          </div>
        }
      </div>
    </div>
  );
}
