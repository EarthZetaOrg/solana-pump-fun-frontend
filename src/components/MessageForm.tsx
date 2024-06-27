import { msgInfo, userInfo } from "@/utils/types";

interface MessageFormProps {
  msg: msgInfo;
}

export const MessageForm: React.FC<MessageFormProps> = ({ msg }) => {
  return (
    <div className="my-2 py-1 bg-gray-900">
      <div className="m-2">
        <div className="flex my-2 ">
          <img
            src={(msg.sender as userInfo)?.avatar}
            alt="Token IMG"
            className="rounded"
            width={40}
            height={40}
          />
          <h3 className="bg-slate-600 mx-5 px-3 leading-10 rounded text-white text-lg ">
            {(msg.sender as userInfo).name}
          </h3>
          {msg.time && <h3 className="text-white leading-10">{msg.time.toString()}</h3>}
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
            <p className="text-xl pl-4">{msg.msg}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
