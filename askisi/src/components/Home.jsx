// import TypewriterComponent from "typewriter-effect";

// import AOS from "aos";
// import "aos/dist/aos.css";
// import { useEffect,useState } from "react";
// import { TbBold } from "react-icons/tb";
// import Prompt from "./Prompt";
// import ReCAPTCHA from "react-google-recaptcha";

// const Home = () => {
//   useEffect(() => {
//     AOS.init({ duration: 2000 });
//     if (!captchaValue) {
//       alert("Please complete the reCAPTCHA");
//       return;
//     }

//   });

// const [captchaValue, setCaptchaValue] = useState(null);


//   return (
//     <div className="px-4 space-y-6  md:w-[700px] w-full md:mx-auto">
//       <div className="mt-20 text-4xl font-bold">
//         <div className="load  ">
//           <hr />
//           <hr />
//           <hr />
//           <hr />
//         </div>
//         <div className=" text-black relative ">
//           Hello, welcome to
//           <span className="my-2 bg-gradient-75 rounded-md bg-gradient-to-r from-[#0100fe] to-[#078000] bg-bottom bg-[length:100%_30%] bg-no-repeat">
//             ISI Info
//           </span>
//         </div>
//         <div className="bg-gradient-to-r py-1 from-[#0100fe] to-[#078000] inline-block text-transparent bg-clip-text">
//           <TypewriterComponent
//             options={{
//               strings: ["Engineering", "Master's degree", "License"],
//               autoStart: true,
//               loop: true,
//               delay: 50,
//             }}
//           />
//         </div>
//       </div>
//       <div className="text-lg  border-b-[1px] pb-9 border-gray-700 text-gray-500 w-full md:w-[700px] ">
//         Have a question? Just ask! Our app is designed to connect you with the
//         information of ISI you’re looking for, helping you navigate your
//         academic journey with ease.
//       </div>
//       <Prompt></Prompt>

//       {/* <Timeline></Timeline>
//       <Skills></Skills>
//       <Experience></Experience>
//       <Project></Project>
//       <Certification></Certification> */}
// <div class="g-recaptcha" data-sitekey="6LfRjXsqAAAAAJhBhCPX8q_zk9TH5gtk5PF86aJ2"></div>
//   <ReCAPTCHA
//         sitekey="6LfRjXsqAAAAAJhBhCPX8q_zk9TH5gtk5PF86aJ2"
//         onChange={(value) => setCaptchaValue(value)}
//       />

//       {/* <footer className=" w-full text-center text-gray-600 mb-2 bg-base-300 text-base-content">
//         <aside>
//           <p className="pb-4">
//             Copyright © 2024 - All right reserved by EASYIA
//           </p>
//         </aside>
//       </footer> */}
//     </div>
//   );
// };

// export default Home;

import TypewriterComponent from "typewriter-effect";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Prompt from "./Prompt";
import ReCAPTCHA from "react-google-recaptcha";
const Home = () => {
  const [captchaValue, setCaptchaValue] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
 
  return (
    <div className="px-4 space-y-6  md:w-[700px] w-full md:mx-auto">
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
      <div className="text-lg border-b-[1px] pb-9 border-gray-700 text-gray-500 w-full md:w-[700px]">
        Have a question? Just ask! Our app is designed to connect you with the
        information of ISI you’re looking for, helping you navigate your
        academic journey with ease.
      </div>

      {/* Show the ReCAPTCHA component if not completed; otherwise, show the Prompt component */}
      {!captchaValue ? (
                
         <ReCAPTCHA
            sitekey="6LcewHsqAAAAADmMO_wQwGCKqe6ubTWMmRk8Ypkv"
            onChange={(value) => setCaptchaValue(value)} /> 
            
      ) : (
        <><Prompt /><div className="fixed bottom-20 left-4 z-10">
          
          </div></>

      )}
    </div>
  );
};

export default Home;
