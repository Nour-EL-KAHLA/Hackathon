import TypewriterComponent from "typewriter-effect";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ReCAPTCHA from "react-google-recaptcha";
import Prompt from "./Prompt";

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

const Home = () => {
  const [captchaValue, setCaptchaValue] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const handleSpeak = () => {
    speak("TEST TEST");
  };

  return (
    <div className="px-4 space-y-6 md:w-[700px] w-full md:mx-auto">
      {/* Greeting Section */}
      <div className="mt-20 text-4xl font-bold">
        <div className="load">
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
        <div className="text-black relative">
          Hello, welcome to
          <span className="my-2 bg-gradient-75 rounded-md bg-gradient-to-r from-[#0100fe] to-[#078000] bg-bottom bg-[length:100%_30%] bg-no-repeat">
            ISI Info
          </span>
        </div>
        <div className="bg-gradient-to-r py-1 from-[#0100fe] to-[#078000] inline-block text-transparent bg-clip-text">
          <TypewriterComponent
            options={{
              strings: ["Engineering", "Master's degree", "License"],
              autoStart: true,
              loop: true,
              delay: 50,
            }}
          />
        </div>
      </div>

      {/* Information Section */}
      <div className="text-lg border-b-[1px] pb-9 border-gray-700 text-gray-500 w-full">
        Have a question? Just ask! Our app is designed to connect you with the
        information of ISI you’re looking for, helping you navigate your
        academic journey with ease.
      </div>

      {/* ReCAPTCHA and Prompt Section */}
      {!captchaValue ? (
        <ReCAPTCHA
          sitekey="6LcewHsqAAAAADmMO_wQwGCKqe6ubTWMmRk8Ypkv"
          onChange={(value) => setCaptchaValue(value)}
        />
      ) : (
        <>
          {/* ChatGPT-style Prompt */}
          <Prompt />

          {/* Button to trigger speech */}
          <div className="fixed bottom-20 left-4 z-10">
            <button
              onClick={handleSpeak}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Talk
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
