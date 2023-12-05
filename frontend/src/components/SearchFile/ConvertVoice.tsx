import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const ConvertVoice = () => {
  

  const navigate = useNavigate();
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    listening,
  } = useSpeechRecognition();

  const startListening = () => {
    resetTranscript()
    SpeechRecognition.startListening({ continuous: true, language: "en-GB  " });
  };

  const stopListening = async () => {
    await SpeechRecognition.stopListening();
  }

  return (
    <>
      <input id="searchInput" value={transcript} placeholder="Start a search"></input>

      <button id="searchButton" style={{fontSize: "1.3rem"}} onClick={() => navigate("/SearchResult")}>Search</button>

      {listening ? (
        <button id="micButton" style={{ backgroundColor: "red" }}>
          <FontAwesomeIcon
            style={{ fontSize: "1.3rem" }}
            icon={faMicrophone}
            onClick={stopListening}
          ></FontAwesomeIcon>
        </button>
      ) : (
        <button id="micButton">
          <FontAwesomeIcon
            icon={faMicrophone}
            style={{ fontSize: "1.3rem" }}
            onClick={startListening}
          />
        </button>
      )}

      {/*
         <button onClick={stopListening}>Stop Listening</button>
        <button onClick={resetTranscript}>Clear</button>
        */}
    </>
  );
};

export default ConvertVoice;
