import "./index.css";
import React, { useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
// import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";

function App() {
  // const [message, setMessage] = useState("");
  const [audio, setAudio] = useState(false);
  const [lang, setLang] = useState("en-GB");
  const [display, setDisplay] = useState(false);
  const [message, setMessage] = useState("");

  const dropDown = useRef();
  const menu = useRef();

  const handleDropDown = () => {
    dropDown.current.classList.toggle("rotate");
    showMenu();
  };

  const showMenu = () => {
    if (!display) {
      menu.current.style.display = "block";
      setDisplay(true);
    } else {
      menu.current.style.display = "none";
      setDisplay(false);
    }
  };

  // for random commands
  const commands = [
    {
      command: "I would like to order *",
      callback: (food) => setMessage(`Your order is for: ${food}`),
    },
    {
      command: "The weather is :condition today",
      callback: (condition) => setMessage(`Today, the weather is ${condition}`),
    },
    {
      command: "hey how are you",
      callback: () => setMessage("I am fine. Wbu?"),
    },
    {
      command: "Feeling lonely",
      callback: () => setMessage("Cheer up!! I'm with you"),
    },
    {
      command: "clear",
      callback: ({ resetTranscript }) => resetTranscript(),
    },
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleAudio = () => {
    if (!audio) {
      SpeechRecognition.startListening({ continuous: true, language: lang });
      setAudio(true);
    } else {
      SpeechRecognition.stopListening();
      setAudio(false);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1 onClick={handleAudio}>
          tooS <ion-icon name={listening ? "mic" : "mic-off"}></ion-icon>
        </h1>
        <div className="dropdown">
          <a
            className="git"
            href="https://github.com/VasuDevrani/tooS-TextToSpeech"
            target='_black'
            
          >
            <ion-icon name="logo-github"></ion-icon>
          </a>
          <div
            className="clear"
            onClick={() => {
              setMessage("");
              resetTranscript();
            }}
          >
            <ion-icon name="remove-circle-outline"></ion-icon>
          </div>
          <div className="earth" ref={dropDown} onClick={handleDropDown}>
            <ion-icon name="earth-outline"></ion-icon>
          </div>
          {/* dropdown-menu */}
          <div className="menu" ref={menu}>
            <p onClick={() => {setLang("en-GB"); handleDropDown()}}>ENGLISH</p>
            <p onClick={() => {setLang("fr-FR"); handleDropDown()}}>FRENCH</p>
            <p onClick={() => {setLang("es-CO"); handleDropDown()}}>SPANISH</p>
            <p onClick={() => {setLang("ja"); handleDropDown()}}>JAPANESE</p>
          </div>
        </div>
      </div>
      <div className="text-msg">
        {lang === "en-GB" && (
          <div className="choices">
            <p>Try Saying:</p>
            <p>clear</p>
            <p>I would like to order...</p>
            <p>The weather is ... today</p>
            <p>Hey! How are you</p>
            <p>Feeling lonely</p>
          </div>
        )}
        <p>{message}</p>
      </div>
      <div className="text-container">
        <p>{transcript}</p>
      </div>
    </div>
  );
}

export default App;
