import { useContext, useState } from "react";
import AudioConverterContext from "./audioConverterContext";
import encode from "audiobuffer-to-wav";
import AlertContext from "../alertAndPopUp/alertAndPopUpContext";
import UserContext from "../user/userContext";

const AudioConverterState = ({ children }) => {
  const { alert } = useContext(AlertContext);

  const { setUploadValues, setTracksUploadValues } = useContext(UserContext);

  // this tells what conversion format the user has selected
  const [convertTo, setConvertTo] = useState("...");

  //download index
  const [index, setIndex] = useState("");

  // now lets define an onChange function to store the value on the convertTo state
  const selectConvertTo = (e) => {
    setConvertTo(e.target.value);
  };

  const [audioFile, setAudioFile] = useState([]); // this holds an array of the selected files

  // Create an empty array to store the Blob objects
  const [blobArray, setBlobArray] = useState([]);

  // Here I am converting the selected files to selected format
  const handleConversion = async (audioFile, convertTo, action) => {
    //so let's make some conditional statement to
    if (audioFile.length === 0) {
      alert("please upload a valid audio file ");
    } else if (convertTo === "...") {
      alert("please select a file to convert to ");
    } else {
      // Process each audio file in the array
      for (const file of audioFile) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
          // Here we are converting the audio file
          const url = reader.result;

          try {
            // Here I am changing fixing a status of the object to "processing"
            file["status"] = "processing";
            setAudioFile((prev) => [...prev]);
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();

            const audioContext = new AudioContext();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

            const options =
              convertTo === ".aac" ||
              convertTo === ".aiff" ||
              convertTo === ".flac" ||
              convertTo === ".mp3" ||
              convertTo === ".ogg" ||
              convertTo === ".wma"
                ? {
                    sampleRate: audioBuffer.sampleRate,
                    channels: audioBuffer.numberOfChannels,
                    bitRate: 128,
                  }
                : {
                    sampleRate: audioBuffer.sampleRate,
                    channels: audioBuffer.numberOfChannels,
                    bitDepth: 16,
                  };

            const newArrayBuffer = await encode(audioBuffer, options);

            const blob = new Blob([newArrayBuffer], {
              type: `audio/${convertTo}`,
            });

            //
            // Add the Blob to the array
            blobArray.push(blob);

            // Here I am changing the status of the object from "processing" to "ready to download"
            file["status"] = "ready to download";
            setAudioFile((prev) => [...prev]);

            // for upload of songs and tracks
            const uploadFile = new File([blob], audioFile[0].name, {
              type: "audio/wave",
            });

            if (action === "songs") {
              setUploadValues((prev) => ({
                ...prev,
                audio: uploadFile,
              }));
            }

            if (action === "tracks") {
              setTracksUploadValues((prev) => ({
                ...prev,
                audio: uploadFile,
              }));
            }
          } catch (error) {
            // Handle errors for the specific audio file

            // Here I am changing the status of the object from "processing" to "error"
            file["status"] = "error";
            setAudioFile((prev) => [...prev]);
          }
        };
      }
    }
  };

  //   download converted files
  const handleDownload = async () => {
    if (blobArray && index !== "") {
      const url = window.URL.createObjectURL(blobArray[index]);
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute(
        "download",
        audioFile.length > 0
          ? `${audioFile[index].name.slice(0, -3)}.${convertTo}`
          : ""
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <AudioConverterContext.Provider
      value={{
        audioFile,
        index,
        setIndex,
        setAudioFile,
        handleDownload,
        handleConversion,
        selectConvertTo,
        setBlobArray,
        convertTo,
      }}
    >
      {children}
    </AudioConverterContext.Provider>
  );
};
export default AudioConverterState;
