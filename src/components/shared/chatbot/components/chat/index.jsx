import React, { useState, useRef, useEffect } from "react";
import { ChatInput, ChatMessage, TypingIndicator } from "../";
import { XMarkIcon, HomeIcon } from "@heroicons/react/16/solid";
import { initialMessages } from "../../data";
import axios from "axios";

const getBotResponse = async (userMessage) => {
  try {
    const response = await axios.post(
      "https://arxatec-service-production.up.railway.app/api/v1/chatbot/send-message",
      {
        message: userMessage,
      }
    );

    return response.data.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
};

export const Chat = ({ setOpenChat, props }) => {
  const [chatState, setChatState] = useState({
    messages: initialMessages,
    isTyping: false,
  });

  const [isHome, setIsHome] = useState(true);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, chatState.isTyping]);

  const handleSendMessage = async (content) => {
    setIsHome(false);
    const userMessage = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true,
    }));

    const botResponseText = await getBotResponse(content);

    const botMessage = {
      id: (Date.now() + 1).toString(),
      content: botResponseText,
      sender: "bot",
      timestamp: new Date(),
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
      isTyping: false,
    }));
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-md mx-auto rounded-lg shadow-lg overflow-hidden bg-white fixed bottom-0 right-0 md:bottom-4 md:right-4 z-50">
      <div className="p-2 border-b border-gray-100 bg-white flex items-center justify-between">
        <div className="flex items-center ">
          {!isHome && (
            <button
              className="p-1 rounded-full hover:bg-gray-100 transition-all"
              onClick={() => setIsHome(true)}
            >
              <HomeIcon className="size-5 text-gray-600" />
            </button>
          )}
          <p className="text-sm font-semibold text-gray-600 ml-2">
            {props.name}
          </p>
        </div>

        <button
          className="p-1 rounded-full hover:bg-gray-100 transition-all"
          onClick={() => setOpenChat(false)}
        >
          <XMarkIcon className="size-5 text-gray-600" />
        </button>
      </div>

      {isHome ? (
        <div className="flex-1 p-4 overflow-y-auto bg-white flex items-center justify-center relative">
          <div className="absolute bottom-0 w-full h-full z-0 bg-gradient-to-b via-blue-100 from-transparent to-blue-200 from-20% "></div>
          <div className="relative z-10">
            <h1 className="text-xl font-bold text-gray-700 whitespace-pre-line">
              {props.title}
            </h1>
            <div className="flex items-center gap-2 justify-start mt-6 flex-wrap">
              <button
                className="text-sm border border-gray-500 text-gray-500 px-2 rounded-md py-1 transition-all hover:bg-gray-700 hover:text-white hover:border-gray-700"
                onClick={() => handleSendMessage(props.questions.question1)}
              >
                {props.questions.question1}
              </button>
              <button
                className="text-sm border border-gray-500 text-gray-500 px-2 rounded-md py-1 transition-all hover:bg-gray-700 hover:text-white hover:border-gray-700"
                onClick={() => handleSendMessage(props.questions.question2)}
              >
                {props.questions.question2}
              </button>
              <button
                className="text-sm border border-gray-500 text-gray-500 px-2 rounded-md py-1 transition-all hover:bg-gray-700 hover:text-white hover:border-gray-700"
                onClick={() => handleSendMessage(props.questions.question3)}
              >
                {props.questions.question3}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 p-4 overflow-y-auto bg-white">
          {chatState.messages.slice(1).map((message) => (
            <ChatMessage key={message.id} message={message} props={props} />
          ))}
          {chatState.isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      )}

      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={chatState.isTyping}
      />
    </div>
  );
};
