import TypewriterComponent from "typewriter-effect";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { TbBold } from "react-icons/tb";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  });
  return (
    <div className="px-4 space-y-6  md:w-[700px] w-full md:mx-auto">
      <div className="mt-20 text-4xl font-bold">
        <div className="load  ">
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
        <div className=" text-white relative ">
          Hello, welcome to
          <span className="my-2 bg-gradient-75 rounded-md bg-gradient-to-r from-purple-500  to-pink-500 bg-bottom bg-[length:100%_30%] bg-no-repeat">
            ISI Info
          </span>
        </div>
        <div className="bg-gradient-to-r py-1 from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text">
          <TypewriterComponent
            options={{
              strings: ["Engineering", "Master's degree", "License"],
              autoStart: true,
              loop: true,
              delay: 50,
            }}
          />
        </div>
        {/* <div>
          <div className="flex gap-x-4 items-center mt-4 font-medium">
            {socials.map((social) => (
              <Contact
                key={social.name}
                icon={social.icon}
                name={social.name}
                href={social.href}
              ></Contact>
            ))}
          </div>
        </div> */}
      </div>
      <div className="text-lg  border-b-[1px] pb-9 border-gray-700 text-gray-200 w-full md:w-[700px] ">
        Have a question? Just ask! Our app is designed to connect you with the
        information of ISI you’re looking for, helping you navigate your
        academic journey with ease.
      </div>

      {/* <Timeline></Timeline>
      <Skills></Skills>
      <Experience></Experience>
      <Project></Project>
      <Certification></Certification> */}

      <footer className=" w-full text-center text-gray-600 mb-2 bg-base-300 text-base-content">
        <aside>
          <p className="pb-4">
            Copyright © 2024 - All right reserved by EASYIA
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Home;
