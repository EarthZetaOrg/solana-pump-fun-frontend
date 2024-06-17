import { msgInfo } from "@/utils/types";

interface MessageFormProps {
  msg: msgInfo;
}

export const MessageForm: React.FC<MessageFormProps> = ({ msg }) => {
  return (
    <div className="my-2 py-1 bg-gray-900">
      <div className="m-2">
        <div className="flex my-2 ">
          <img
            src="/bonkz10157.png"
            alt="Token IMG"
            className="rounded"
            width={40}
            height={40}
          />
          <h3 className="bg-slate-600 mx-5 px-3 leading-10 rounded text-white text-lg ">
            {msg.name}
          </h3>
          {msg.date && <h3 className="text-white leading-10">{msg.date.toString()}</h3>}
          {!msg.ticker && <p className="leading-10 mx-4 hover:cursor-pointer hover:text-white ">#834758929 [Reply]</p>}
        </div>
        <div className="flex">
          {msg.img !== undefined && (
            <img
              src={msg.img}
              className="mr-5"
              alt="Token IMG"
              width={200}
              height={300}
            />
          )}
          <div className=" text-white">
            {msg.ticker && <p className="text-2xl">{msg.ticker}</p>}
            <p className="text-xl tex">{msg.msg}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
