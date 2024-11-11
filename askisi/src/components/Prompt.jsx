import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Prompt() {
  const { register, handleSubmit, reset } = useForm();
  const [messages, setMessages] = useState([]);

  // Function to handle form submission
  const onSubmit = (data) => {
    const userMessage = data.message.trim();
    if (userMessage) {
      // Add user's message to the chat
      const newUserMessage = { type: "user", text: userMessage };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);

      // Clear the input field after submission
      reset();

      // Simulate a system response after a delay
      setTimeout(() => {
        const systemResponse = {
          type: "system",
          text: "This is a system response to your message!",
        };
        setMessages((prevMessages) => [...prevMessages, systemResponse]);
      }, 1000); // Adjust the delay as needed
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Chat Messages Display */}
      <div className="w-full md:mx-auto flex flex-col space-y-4 overflow-y-auto px-4 pt-4 mb-24">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-md shadow-sm break-words max-w-[75%] ${
                message.type === "user"
                  ? "bg-[#078000] text-white self-end"
                  : "bg-gray-200 text-gray-900 self-start"
              }`}
              style={{
                wordBreak: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Input Area at the Bottom */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fixed bottom-0 left-0 w-full bg-white py-3 px-4 shadow-lg border-t border-gray-200"
      >
        <div className="flex items-center justify-between md:w-[700px] w-full md:mx-auto">
          {/* Auto-resizing Textarea */}
          <textarea
            {...register("message")}
            className="resize-none block w-full max-h-[200px] rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0100fe]"
            placeholder="Type your message..."
            rows={1}
            autoFocus
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="ml-4 bg-[#0100fe] hover:bg-blue-600 text-white rounded-md px-4 py-2"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Prompt;
