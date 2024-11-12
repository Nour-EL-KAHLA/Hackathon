// // import React, { useState, useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faMicrophone,
//   faStop,
//   faPaperPlane,
// } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import { useEffect, useRef, useState } from "react";

// function Prompt() {
//   const { register, handleSubmit, reset } = useForm();
//   const [messages, setMessages] = useState([]);
//   const [recording, setRecording] = useState(false);
//   const [transcription, setTranscription] = useState("");
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [audioUrl, setAudioUrl] = useState(null);
//   const [isAudioReady, setIsAudioReady] = useState(false);
//   const chatContainerRef = useRef(null);

//   // Auto-scroll to the bottom whenever messages change
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Function to send a message to the backend and receive a response
//   const sendMessageToServer = async (message) => {
//     try {
//       const response = await axios.post("http://127.0.0.1:8090/chat/respond", {
//         message,
//       });
//       return response.data.answer; // Assuming the response contains an 'answer' field
//     } catch (error) {
//       console.error("Error sending message to server:", error);
//       return "There was an error getting a response from the server.";
//     }
//   };

//   // Handle form submission for text-based input
//   const onSubmit = async (data) => {
//     const userMessage = data.message.trim();
//     if (userMessage) {
//       const newUserMessage = { type: "user", text: userMessage };
//       setMessages((prevMessages) => [...prevMessages, newUserMessage]);
//       reset();

//       // Send message to server and get response
//       const serverResponse = await sendMessageToServer(userMessage);

//       // Display server response
//       const systemResponse = { type: "system", text: serverResponse };
//       setMessages((prevMessages) => [...prevMessages, systemResponse]);
//     }
//   };

//   // Handle starting the recording process
//   const handleStartRecording = () => {
//     setRecording(true);
//     navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//       const recorder = new MediaRecorder(stream);
//       setMediaRecorder(recorder);
//       recorder.start();

//       const audioChunks = [];
//       recorder.ondataavailable = (event) => {
//         audioChunks.push(event.data);
//       };

//       recorder.onstop = () => {
//         const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
//         const url = URL.createObjectURL(audioBlob);
//         setAudioUrl(url);
//         setIsAudioReady(true);
//       };
//     });
//   };

//   // Handle stopping the recording process
//   const handleStopRecording = () => {
//     setRecording(false);
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//     }
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen">
//       <div
//         ref={chatContainerRef}
//         className="w-full md:mx-auto flex flex-col space-y-4 overflow-y-auto px-4 pt-4 mb-24"
//         style={{ maxHeight: "80vh" }}
//       >
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`flex ${
//               message.type === "user" ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`relative p-4 rounded-lg max-w-[75%] ${
//                 message.type === "user"
//                   ? "bg-green-400 text-white"
//                   : "bg-gray-200 text-gray-900"
//               }`}
//               style={{ wordBreak: "break-word" }}
//             >
//               {message.text}
//             </div>
//           </div>
//         ))}
//       </div>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="fixed bottom-0 left-0 w-full bg-white py-3 px-4 shadow-lg border-t border-gray-200"
//       >
//         <div className="flex items-center justify-between md:w-[700px] w-full md:mx-auto">
//           <textarea
//             {...register("message")}
//             className="resize-none block w-full max-h-[200px] rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0100fe]"
//             placeholder="Type your message..."
//             rows={1}
//             autoFocus
//           />

//           <div className="flex space-x-2 ml-2">
//             <button
//               type="submit"
//               className="px-4 py-2 bg-[#0100fe] hover:bg-blue-600 text-white rounded-md"
//             >
//               <FontAwesomeIcon icon={faPaperPlane} />
//             </button>
//             <button
//               type="button"
//               onClick={!recording ? handleStartRecording : handleStopRecording}
//               className={`flex items-center justify-center px-4 py-2 rounded-md ${
//                 recording ? "bg-red-500" : "bg-green-500"
//               } text-white`}
//             >
//               <FontAwesomeIcon icon={recording ? faStop : faMicrophone} />
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Prompt;

// import React, { useState, useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faMicrophone,
//   faStop,
//   faPaperPlane,
// } from "@fortawesome/free-solid-svg-icons";

// function Prompt() {
//   const { register, handleSubmit, reset } = useForm();
//   const [messages, setMessages] = useState([]);
//   const [recording, setRecording] = useState(false);
//   const [transcription, setTranscription] = useState("");
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [audioUrl, setAudioUrl] = useState(null);
//   const [isAudioReady, setIsAudioReady] = useState(false);

//   // Ref to keep the chat container for auto-scrolling
//   const chatContainerRef = useRef(null);

//   // Handle form submission for text-based input
//   const onSubmit = (data) => {
//     const userMessage = data.message.trim();
//     if (userMessage) {
//       const newUserMessage = { type: "user", text: userMessage };
//       setMessages((prevMessages) => [...prevMessages, newUserMessage]);
//       reset();

//       setTimeout(() => {
//         const systemResponse = {
//           type: "system",
//           text: "This is a system response to your message!",
//         };
//         setMessages((prevMessages) => [...prevMessages, systemResponse]);
//       }, 1000);
//     }
//   };

//   // Auto-scroll to the bottom whenever messages change
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Handle starting the recording process
//   const handleStartRecording = () => {
//     setRecording(true);
//     navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//       const recorder = new MediaRecorder(stream);
//       setMediaRecorder(recorder);
//       recorder.start();

//       const audioChunks = [];
//       recorder.ondataavailable = (event) => {
//         audioChunks.push(event.data);
//       };

//       recorder.onstop = () => {
//         const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
//         const url = URL.createObjectURL(audioBlob);
//         setAudioUrl(url);
//         setIsAudioReady(true);
//       };
//     });
//   };

//   // Handle stopping the recording process
//   const handleStopRecording = () => {
//     setRecording(false);
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//     }
//   };

//   // Add the transcription and audio to messages once available
//   useEffect(() => {
//     if (isAudioReady && audioUrl) {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { type: "voice", content: audioUrl, transcription },
//       ]);

//       setTimeout(() => {
//         const systemResponse = {
//           type: "system",
//           text: transcription || "Voice message received!",
//         };
//         setMessages((prevMessages) => [...prevMessages, systemResponse]);
//       }, 1000);

//       setIsAudioReady(false);
//     }
//   }, [isAudioReady, audioUrl, transcription]);

//   return (
//     <div className="flex flex-col items-center min-h-screen">
//       {/* Display chat messages */}
//       <div
//         ref={chatContainerRef}
//         className="w-full md:mx-auto flex flex-col space-y-4 overflow-y-auto px-4 pt-4 mb-24"
//         style={{ maxHeight: "80vh" }}
//       >
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`flex ${
//               message.type === "user" || message.type === "voice"
//                 ? "justify-end"
//                 : "justify-start"
//             }`}
//           >
//             <div
//               className={`relative p-4 rounded-lg max-w-[75%] ${
//                 message.type === "user"
//                   ? "bg-green-400 text-white self-end rounded-bl-none"
//                   : message.type === "system"
//                   ? "bg-gray-200 text-gray-900 self-start rounded-br-none"
//                   : "bg-green-400 text-white self-end rounded-bl-none"
//               }`}
//               style={{
//                 wordBreak: "break-word",
//                 overflowWrap: "break-word",
//                 whiteSpace: "pre-wrap",
//                 maxWidth: "80%",
//                 borderRadius: "12px", // Bulle de message arrondie
//               }}
//             >
//               {message.type === "voice" ? (
//                 <>
//                   <audio controls>
//                     <source src={message.content} type="audio/wav" />
//                     Your browser does not support the audio element.
//                   </audio>
//                   {message.transcription && (
//                     <p className="text-gray-500 italic">
//                       {message.transcription}
//                     </p>
//                   )}
//                 </>
//               ) : (
//                 message.text
//               )}
//               {/* Triangle de la bulle */}
//               {message.type === "user" && (
//                 <div className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-green-400"></div>
//               )}
//               {message.type === "system" && (
//                 <div className="absolute left-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-gray-200"></div>
//               )}
//               {message.type === "voice" && (
//                 <div className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-green-400"></div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Fixed Input Area at the Bottom */}
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="fixed bottom-0 left-0 w-full bg-white py-3 px-4 shadow-lg border-t border-gray-200"
//       >
//         <div className="flex items-center justify-between md:w-[700px] w-full md:mx-auto">
//           {/* Auto-resizing Textarea */}
//           <textarea
//             {...register("message")}
//             className="resize-none block w-full max-h-[200px] rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0100fe]"
//             placeholder="Type your message..."
//             rows={1}
//             autoFocus
//           />

//           {/* Add a small margin-left to the send button */}
//           <div className="flex space-x-2 ml-2">
//             <button
//               type="submit"
//               className="px-4 py-2 bg-[#0100fe] hover:bg-blue-600 text-white rounded-md"
//             >
//               <FontAwesomeIcon icon={faPaperPlane} />
//             </button>
//             <button
//               type="button"
//               onClick={!recording ? handleStartRecording : handleStopRecording}
//               className={`flex items-center justify-center px-4 py-2 rounded-md ${
//                 recording ? "bg-red-500 text-white" : "bg-green-500 text-white"
//               }`}
//             >
//               <FontAwesomeIcon icon={recording ? faStop : faMicrophone} />
//             </button>
//           </div>
//         </div>
//       </form>

//       {/* Indicate recording state */}
//       {recording && (
//         <div className="text-center mt-4 text-green-500 font-bold">
//           Enregistrement en cours...
//         </div>
//       )}
//     </div>
//   );
// }

// export default Prompt;
//
// import React, { useState, useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faMicrophone,
//   faStop,
//   faPaperPlane,
// } from "@fortawesome/free-solid-svg-icons";

// function Prompt() {
//   const { register, handleSubmit, reset } = useForm();
//   const [messages, setMessages] = useState([]);
//   const [recording, setRecording] = useState(false);
//   const [transcription, setTranscription] = useState("");
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [audioUrl, setAudioUrl] = useState(null);
//   const [isAudioReady, setIsAudioReady] = useState(false);
//   const chatContainerRef = useRef(null);

//   // Function to send prompt to the server and get the response
//   const fetchResponseFromServer = async (userMessage) => {
//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ prompt: userMessage }),
//       });

//       if (!response.ok) {
//         throw new Error("Server error");
//       }

//       const data = await response.json();
//       return data.response; // Assuming the server response is structured as { response: "text" }
//     } catch (error) {
//       console.error("Error fetching response:", error);
//       return "Sorry, there was an error processing your request.";
//     }
//   };

//   // Handle form submission for text-based input
//   const onSubmit = async (data) => {
//     const userMessage = data.message.trim();
//     if (userMessage) {
//       // Add user's message to the chat
//       const newUserMessage = { type: "user", text: userMessage };
//       setMessages((prevMessages) => [...prevMessages, newUserMessage]);
//       reset();

//       // Get response from the server
//       const serverResponse = await fetchResponseFromServer(userMessage);

//       // Add server's response to the chat
//       const newSystemMessage = { type: "system", text: serverResponse };
//       setMessages((prevMessages) => [...prevMessages, newSystemMessage]);
//     }
//   };

//   // Auto-scroll to the bottom whenever messages change
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <div className="flex flex-col items-center min-h-screen">
//       {/* Display chat messages */}
//       <div
//         ref={chatContainerRef}
//         className="w-full md:mx-auto flex flex-col space-y-4 overflow-y-auto px-4 pt-4 mb-24"
//         style={{ maxHeight: "80vh" }}
//       >
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`flex ${
//               message.type === "user" ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`relative p-4 rounded-lg max-w-[75%] ${
//                 message.type === "user"
//                   ? "bg-green-400 text-white self-end rounded-bl-none"
//                   : "bg-gray-200 text-gray-900 self-start rounded-br-none"
//               }`}
//             >
//               {message.text}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input Form */}
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="fixed bottom-0 left-0 w-full bg-white py-3 px-4 shadow-lg border-t border-gray-200"
//       >
//         <div className="flex items-center justify-between md:w-[700px] w-full md:mx-auto">
//           <textarea
//             {...register("message")}
//             className="resize-none block w-full max-h-[200px] rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:outline-none"
//             placeholder="Type your message..."
//             rows={1}
//             autoFocus
//           />
//           <button
//             type="submit"
//             className="px-4 py-2 bg-[#0100fe] hover:bg-blue-600 text-white rounded-md ml-2"
//           >
//             <FontAwesomeIcon icon={faPaperPlane} />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Prompt;
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faStop,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

function Prompt() {
  const { register, handleSubmit, reset } = useForm();
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const chatContainerRef = useRef(null);

  // Function to send prompt to the server and get the response
  const fetchResponseFromServer = async (userMessage) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      return data.response; // Assuming the server response is structured as { response: "text" }
    } catch (error) {
      console.error("Error fetching response:", error);
      return "Sorry, there was an error processing your request.";
    }
  };

  // Handle form submission for text-based input
  const onSubmit = async (data) => {
    const userMessage = data.message.trim();
    if (userMessage) {
      // Add user's message to the chat
      const newUserMessage = { type: "user", text: userMessage };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      reset();

      // Get response from the server
      const serverResponse = await fetchResponseFromServer(userMessage);

      // Add server's response to the chat
      const newSystemMessage = { type: "system", text: serverResponse };
      setMessages((prevMessages) => [...prevMessages, newSystemMessage]);
    }
  };

  // Handle starting the recording process
  const handleStartRecording = () => {
    setRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      recorder.start();

      const audioChunks = [];
      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setIsAudioReady(true);
      };
    });
  };

  // Handle stopping the recording process
  const handleStopRecording = () => {
    setRecording(false);
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  // Add the transcription and audio to messages once available (no server response needed)
  useEffect(() => {
    if (isAudioReady && audioUrl) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "voice", content: audioUrl, transcription },
      ]);
      setIsAudioReady(false);
    }
  }, [isAudioReady, audioUrl, transcription]);

  // Auto-scroll to the bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Display chat messages */}
      <div
        ref={chatContainerRef}
        className="w-full md:mx-auto flex flex-col space-y-4 overflow-y-auto px-4 pt-4 mb-24"
        style={{ maxHeight: "80vh" }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === "user" || message.type === "voice"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`relative p-4 rounded-lg max-w-[75%] ${
                message.type === "user"
                  ? "bg-green-400 text-white self-end rounded-bl-none"
                  : message.type === "system"
                  ? "bg-gray-200 text-gray-900 self-start rounded-br-none"
                  : "bg-green-400 text-white self-end rounded-bl-none"
              }`}
            >
              {message.type === "voice" ? (
                <>
                  <audio controls>
                    <source src={message.content} type="audio/wav" />
                    Your browser does not support the audio element.
                  </audio>
                  {message.transcription && (
                    <p className="text-gray-500 italic">
                      {message.transcription}
                    </p>
                  )}
                </>
              ) : (
                message.text
              )}
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
          <textarea
            {...register("message")}
            className="resize-none block w-full max-h-[200px] rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:outline-none"
            placeholder="Type your message..."
            rows={1}
            autoFocus
          />
          <div className="flex space-x-2 ml-2">
            <button
              type="submit"
              className="px-4 py-2 bg-[#0100fe] hover:bg-blue-600 text-white rounded-md"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
            <button
              type="button"
              onClick={!recording ? handleStartRecording : handleStopRecording}
              className={`flex items-center justify-center px-4 py-2 rounded-md ${
                recording ? "bg-red-500 text-white" : "bg-green-500 text-white"
              }`}
            >
              <FontAwesomeIcon icon={recording ? faStop : faMicrophone} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Prompt;
