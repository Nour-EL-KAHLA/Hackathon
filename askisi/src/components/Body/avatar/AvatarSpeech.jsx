import React from "react";
import AvatarModel from "./AvatarModel";
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

function Avatarspeech() {
  const handleSpeak = () => {
    speak("nour");
  };

  return (
    <div>
      <Canvas>
        <AvatarModel />
      </Canvas>
      <button onClick={handleSpeak}>nour</button>
    </div>
  );
}

export default Avatarspeech;
