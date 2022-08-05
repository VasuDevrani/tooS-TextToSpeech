import "./index.css";
import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
// import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";

function App() {
  // const [message, setMessage] = useState("");
  const [audio, setAudio] = useState(false);

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleAudio = () => {
    if (!audio) {
      SpeechRecognition.startListening();
      setAudio(true);
    } else {
      SpeechRecognition.stopListening();
      setAudio(false);
    }
  };

  return (
    <div className="App">
      <h1 onClick={handleAudio}>
        tooS <ion-icon name={listening ? "mic" : "mic-off"}></ion-icon>
      </h1>
      <div className="text-container">
        <p>{transcript}</p>
      </div>
    </div>
  );
}

export default App;
