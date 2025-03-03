import React, { useState } from "react";
import { PaperClipIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";

export const ChatInput = ({ onSendMessage, disabled = false }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-gray-200 p-4 bg-white"
    >
      <div className="flex items-center rounded-md border border-gray-300 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribir mensaje..."
          className="flex-1 py-1 px-2 outline-none text-sm"
          disabled={disabled}
        />
        <button
          type="submit"
          className={`p-2 rounded-r-md ${input.trim() && !disabled ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-400"}`}
          disabled={!input.trim() || disabled}
          aria-label="Send message"
        >
          <PaperAirplaneIcon className="size-4 " />
        </button>
      </div>
    </form>
  );
};
