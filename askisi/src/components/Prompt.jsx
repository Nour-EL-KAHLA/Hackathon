// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import Inputfield from "./Body/prompt/Inputfield";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMicrophone, faStop, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

// function Prompt() {
//   const { register, handleSubmit, reset } = useForm();
//   const [answers, setAnswers] = useState([]);
//   const [recording, setRecording] = useState(false);
//   const [transcription, setTranscription] = useState("");
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [audioUrl, setAudioUrl] = useState(null);
//   const [isAudioReady, setIsAudioReady] = useState(false);

//   const onSubmit = (data) => {
//     setAnswers((prevAnswers) => [
//       ...prevAnswers,
//       { type: "text", content: data.example },
//     ]);
//     reset(); // Reset the form after submission
//   };

//   const simulateTranscription = () => {
//     setTimeout(() => {
//       const simulatedText = "This is a simulated transcription of your voice.";
//       setTranscription(simulatedText);
//       setIsAudioReady(true);
//     }, 2000);
//   };

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
//         simulateTranscription();
//       };
//     });
//   };

//   const handleStopRecording = () => {
//     setRecording(false);
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//     }
//   };

//   useEffect(() => {
//     if (isAudioReady && audioUrl) {
//       setAnswers((prevAnswers) => [
//         ...prevAnswers,
//         { type: "voice", content: audioUrl, transcription },
//       ]);
//       setIsAudioReady(false);
//     }
//   }, [isAudioReady, audioUrl, transcription]);

//   return (
//     <div>
//       {/* Display previously submitted text and voice answers */}
//       <div className="mb-4">
//         {answers.map((answer, index) => (
//           <div key={index} className="mb-4">
//             {answer.type === "text" ? (
//               <div className="text-xl font-bold mb-2">
//                 <p>{answer.content}</p>
//               </div>
//             ) : (
//               <div>
//                 <audio controls>
//                   <source src={answer.content} type="audio/wav" />
//                   Your browser does not support the audio element.
//                 </audio>
//                 {answer.transcription && (
//                   <p className="text-gray-500 italic">{answer.transcription}</p>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="flex items-center space-x-2">
//         <div className="text-black md:w-[700px] w-full md:mx-auto pt-3 border-b-[1px] flex-1">
//           <Inputfield name="Question" />
//           <div className="flex md:w-[700px] w-full md:mx-auto pt-3 border-b-[1px] justify-between">
//             <div className="mt-2 flex-1">
//               <input
//                 className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0100fe] sm:text-sm sm:leading-6"
//                 placeholder="Type your question"
//                 {...register("example")}
//               />
//             </div>
//             <div className="flex space-x-2">
//               <button
//                 type="submit"
//                 className="flex-1 px-3 py-1 bg-blue-500 text-white rounded-md flex items-center justify-center"
//               >
//                 <FontAwesomeIcon icon={faPaperPlane} />
//               </button>
//               <button
//                 onClick={!recording ? handleStartRecording : handleStopRecording}
//                 className={`flex-1 px-3 py-1 rounded-md flex items-center justify-center 
//                   ${recording ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
//               >
//                 <FontAwesomeIcon icon={recording ? faStop : faMicrophone} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>

//       {/* Indicate recording state */}
//       {recording && (
//         <div className="text-center mt-4 text-red-500 font-bold">
//           Enregistrement en cours...
//         </div>
//       )}
//     </div>
//   );
// }

// export default Prompt;




import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStop, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function Prompt() {
  const { register, handleSubmit, reset } = useForm();
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isAudioReady, setIsAudioReady] = useState(false);
  
  // Ref to keep the chat container for auto-scrolling
  const chatContainerRef = useRef(null);

  // Handle form submission for text-based input
  const onSubmit = (data) => {
    const userMessage = data.message.trim();
    if (userMessage) {
      const newUserMessage = { type: "user", text: userMessage };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      reset();

      setTimeout(() => {
        const systemResponse = {
          type: "system",
          text: "This is a system response to your message!",
        };
        setMessages((prevMessages) => [...prevMessages, systemResponse]);
      }, 1000);
    }
  };

  // Auto-scroll to the bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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

  // Add the transcription and audio to messages once available
  useEffect(() => {
    if (isAudioReady && audioUrl) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "voice", content: audioUrl, transcription },
      ]);

      setTimeout(() => {
        const systemResponse = {
          type: "system",
          text: transcription || "Voice message received!",
        };
        setMessages((prevMessages) => [...prevMessages, systemResponse]);
      }, 1000);

      setIsAudioReady(false);
    }
  }, [isAudioReady, audioUrl, transcription]);

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
              message.type === "user" || message.type === "voice" ? "justify-end" : "justify-start"
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
              style={{
                wordBreak: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
                maxWidth: "80%",
                borderRadius: "12px",  // Bulle de message arrondie
              }}
            >
              {message.type === "voice" ? (
                <>
                  <audio controls>
                    <source src={message.content} type="audio/wav" />
                    Your browser does not support the audio element.
                  </audio>
                  {message.transcription && (
                    <p className="text-gray-500 italic">{message.transcription}</p>
                  )}
                </>
              ) : (
                message.text
              )}
              {/* Triangle de la bulle */}
              {message.type === "user" && (
                <div className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-green-400"></div>
              )}
              {message.type === "system" && (
                <div className="absolute left-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-gray-200"></div>
              )}
              {message.type === "voice" && (
                <div className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-green-400"></div>
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
          {/* Auto-resizing Textarea */}
          <textarea
            {...register("message")}
            className="resize-none block w-full max-h-[200px] rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0100fe]"
            placeholder="Type your message..."
            rows={1}
            autoFocus
          />

          {/* Add a small margin-left to the send button */}
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

      {/* Indicate recording state */}
      {recording && (
        <div className="text-center mt-4 text-green-500 font-bold">
          Enregistrement en cours...
        </div>
      )}
    </div>
  );
}

export default Prompt;
