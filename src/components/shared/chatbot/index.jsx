import { useState } from "react";
import { Chat } from "./components";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/solid";

export default function Chatbot({ props }) {
  const [openChat, setOpenChat] = useState(false);
  return (
    <div>
      <button
        className="fixed bottom-4 right-4 rounded-full bg-blue-600 z-40 p-4 hover:bg-blue-500 transition-all shadow-blue-600 shadow-2xl"
        onClick={() => setOpenChat(!openChat)}
      >
        <ChatBubbleLeftIcon className="size-6 text-white" />
      </button>
      {openChat && <Chat setOpenChat={setOpenChat} props={props} />}
    </div>
  );
}
