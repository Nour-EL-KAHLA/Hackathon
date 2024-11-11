import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Inputfield from "./Body/prompt/Inputfield";

function Prompt() {
  // Define the type for the form data
  const { register, handleSubmit } = useForm();
  const [submittedText, setSubmittedText] = useState("");

  const [answers, setAnswers] = useState([]); // Array to store all the answers

  // Function to handle form submission
  const onSubmit = (data) => {
    setAnswers((prevAnswers) => [...prevAnswers, data.example]); // Add new answer to the array
  };
  return (
    <div>
      <div className="mb-4">
        {answers.map((answer, index) => (
          <div key={index} className="text-xl font-bold mb-2">
            <p>{answer}</p>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center space-x-2"
      >
        {/* Register the first input */}
        <div className="text-black md:w-[700px] w-full md:mx-auto pt-3 border-b-[1px] flex-1">
          <Inputfield name="Question" />
          <div className="flex md:w-[700px] w-full md:mx-auto pt-3 border-b-[1px] justify-between ">
            <div className="mt-2 ">
              <input
                className="block md:w-[600px] rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0100fe] sm:text-sm sm:leading-6"
                defaultValue="test"
                {...register("example")} // Register the "example" input
              />
            </div>
            <button
              type="submit"
              className="px-1 mb-0 bg-blue-500 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      {/* Display the submitted text with larger font */}
    </div>
  );
}

export default Prompt;
