import { coinInfo, msgInfo, replyInfo, tradeInfo, userInfo } from "@/utils/types";
import { MessageForm } from "./MessageForm";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Trade } from "./Trade";
import { getCoinTrade, getMessageByCoin, postReply, uploadImage } from "@/utils/util";
import UserContext from "@/context/UserContext";
import ReplyModal from "./ReplyModal";

interface ChattingProps {
  param: string | null;
  coin: coinInfo
}

export const Chatting: React.FC<ChattingProps> = ({ param, coin }) => {
  const [trades, setTrades] = useState<tradeInfo>({} as tradeInfo);
  const [isTrades, setIsTrades] = useState<Boolean>(true);
  const [isModal, setIsModal] = useState<Boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const { user, messages, setMessages } = useContext(UserContext);
  const [selectedFileName, setSelectedFileName] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      if (param) {
        console.log("param::: chatting", param, isTrades)
        if (isTrades) {
          const data = await getMessageByCoin(param);
          console.log("trade: chatting====", data)
          setMessages(data);
        } else {
          const data = await getCoinTrade(param);
          console.log("trade: trade status", data);
          setTrades(data)
        }
      }
    }
    fetchData();
  }, [isTrades, param])
  console.log("messages::", messages)
  const handleModalToggle = () => {
    setIsModal(!isModal);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    console.log("========", file);
    if (file) {
      setSelectedFileName(file.name);
      const url = URL.createObjectURL(file);
      console.log("url++++++", url);
      setImageUrl(url);
    }
  };

  const replyPost = async () => {
    let reply: replyInfo;
    if (imageUrl) {
      const url = await uploadImage(imageUrl);
      console.log("create Coin =========", user);
      if (url && user._id) {
        reply = {
          coinId: coin._id,
          sender: user._id,
          msg: msg,
          img: url
        }
      }
    } else {
      if (user._id) {
        reply = {
          coinId: coin._id,
          sender: user._id,
          msg: msg,
        }
      }
    }
    console.log("reply", reply)
    await postReply(reply);
    handleModalToggle;
  }
  return (
    <div className="pt-8">
      <div className="flex">
        <button
          className={
            isTrades
              ? "bg-green-500 rounded-lg p-3 mx-4"
              : "rounded-lg p-3 mx-4"
          }
          onClick={() => setIsTrades(true)}
        >
          Thread
        </button>
        <button
          className={
            isTrades
              ? "rounded-lg p-3 mx-4"
              : "bg-green-500 rounded-lg p-3 mx-4"
          }
          onClick={() => setIsTrades(false)}
        >
          Trades
        </button>
      </div>
      <div>
        {isTrades ? (coin &&
          <div>
            <div className="my-2 py-1 bg-gray-900">
              <div className="m-2">
                <div className="flex my-2 ">
                  <img
                    src={(coin?.creator as userInfo)?.avatar}
                    alt="Token IMG"
                    className="rounded"
                    width={40}
                    height={40}
                  />
                  <h3 className="bg-slate-600 mx-5 px-3 leading-10 rounded text-white text-lg ">
                    {(coin?.creator as userInfo)?.name}
                  </h3>
                  {coin.date! && <h3 className="text-white leading-10">{coin.date.toString()}</h3>}
                </div>
                <div className="flex">
                  {coin.url !== undefined && (
                    <img
                      src={coin.url}
                      className="mr-5"
                      alt="Token IMG"
                      width={200}
                      height={300}
                    />
                  )}
                </div>
              </div>
            </div>
            {messages && messages.map((message, index) => (
              <MessageForm key={index} msg={message}></MessageForm>
            ))}
            <p onClick={() => setIsModal(true)} className="p-3 font-bold text-2xl text-center cursor-pointer hover:text-white">Post Reply</p>
            <ReplyModal show={isModal} onClose={handleModalToggle}>
              <h2 className="text-2xl mb-4">Post Reply</h2>
              {/* You can replace it with your form */}
              <div className=" pt-[20px] m-auto">
                <label
                  htmlFor="COMMIT  py-[20px]"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  COMMIT
                </label>
                <textarea
                  id="msg"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Commit"
                  required
                />
              </div>
              <div className="mt-[20px] m-auto bg-white pt-2 rounded-lg">
                <input
                  type="file"
                  className="ml-2 mb-2"
                  onChange={handleFileChange}
                  multiple
                />
              </div>
              <div className="flex justify-around p-3">
                <button onClick={replyPost} className="bg-green-400 w-20 p-2 rounded-md">POST</button>
                <button onClick={handleModalToggle} className="bg-green-400 w-20 p-2 rounded-md">Cancel</button>
              </div>
            </ReplyModal>
          </div>

        ) : (
          <div>
            <div className="my-2 bg-slate-500 grid grid-cols-5 leading-10 justify-between items-center rounded-md p-2">
              <p className="text-xl leading-10">Account</p>
              <p className="text-xl leading-10">Type</p>
              <p className="text-xl leading-10">SOL</p>
              <p className="text-xl leading-10">Date</p>
              <p className="text-xl leading-10  ">Transaction</p>
            </div>
            {trades.record && trades.record.map((trade, index) => (
              <Trade key={index} trade={trade}></Trade>
            ))}
          </div>
        )}
      </div>


    </div>
  );
};
