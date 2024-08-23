import Dropzone from "react-dropzone";
import classes from "./audioConverter.module.css";
import { useContext, useEffect, useState } from "react";
import AudioConverterContext from "../../context/audioConverter/audioConverterContext";

function AudioConverter(params) {
  //context
  const {
    audioFile,
    index,
    handleDownload,
    setIndex,
    setAudioFile,
    handleConversion,
    selectConvertTo,
    setBlobArray,
    convertTo,
  } = useContext(AudioConverterContext);

  //count of times the download button is clicked
  const [count, setCount] = useState(0);

  useEffect(() => {
    count > 0 && index !== "" && handleDownload();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, index]);

  return (
    <div className={classes.container}>
      <p className={classes.heading}>
        Transform your sound, Elevate your experience!
      </p>

      <div className={classes.sub_container}>
        <div className={classes.files_container}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="15"
            viewBox="0 0 11 15"
            fill="none"
            className={classes.prompt_icon}
          >
            <path
              d="M5.5 9.35938C7.05889 9.35938 8.32227 8.11094 8.32227 6.57031V2.85156C8.32227 1.31094 7.05889 0.0625 5.5 0.0625C3.94111 0.0625 2.67773 1.31094 2.67773 2.85156V6.57031C2.67773 8.11094 3.94111 9.35938 5.5 9.35938ZM10.9785 6.53711C10.9785 6.46406 10.9187 6.4043 10.8457 6.4043H9.84961C9.77656 6.4043 9.7168 6.46406 9.7168 6.53711C9.7168 8.86631 7.8292 10.7539 5.5 10.7539C3.1708 10.7539 1.2832 8.86631 1.2832 6.53711C1.2832 6.46406 1.22344 6.4043 1.15039 6.4043H0.154297C0.08125 6.4043 0.0214844 6.46406 0.0214844 6.53711C0.0214844 9.33779 2.12324 11.6487 4.83594 11.9758V13.6758H2.42373C2.19629 13.6758 2.01367 13.9132 2.01367 14.207V14.8047C2.01367 14.8777 2.06016 14.9375 2.1166 14.9375H8.8834C8.93984 14.9375 8.98633 14.8777 8.98633 14.8047V14.207C8.98633 13.9132 8.80371 13.6758 8.57627 13.6758H6.09766V11.9841C8.84189 11.6853 10.9785 9.36104 10.9785 6.53711Z"
              fill="black"
            />
          </svg>

          <Dropzone
            onDrop={(acceptedFiles) => {
              setAudioFile(acceptedFiles);
              setBlobArray([]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className={classes.instruction}>
                    Drag 'n' drop audio file here, or click to select files
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <p className={classes.convert_to}>Convert to</p>
        <div className={classes.select_container}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            className={classes.prompt_icon}
          >
            <path
              d="M6.02067 10.271C7.43734 10.271 8.854 9.53924 9.9165 8.2901C12.7498 4.95845 14.6708 5.95614 15.5832 6.37512C13.6353 7.43762 14.3436 10.4916 11.6873 12.7501C10.0518 14.1406 8.32063 14.5259 6.729 14.521C4.43507 14.5139 2.43013 13.3749 1.4165 12.5397V6.02095"
              stroke="black"
              strokeWidth="1.41667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.00015 5.61959C1.94789 5.54191 1.88075 5.47536 1.80262 5.42379C1.72448 5.37222 1.63689 5.33665 1.54493 5.31914C1.45296 5.30163 1.35843 5.30252 1.26681 5.32177C1.17519 5.34102 1.08829 5.37824 1.01114 5.43128C0.933996 5.48432 0.868128 5.55212 0.817348 5.63078C0.766569 5.70943 0.731885 5.79737 0.715302 5.88951C0.698719 5.98165 0.700566 6.07616 0.720737 6.16759C0.740908 6.25901 0.779002 6.34552 0.832816 6.42213L2.00015 5.61959ZM12.7505 12.6544C12.9131 12.5603 13.0317 12.4054 13.0801 12.2239C13.1285 12.0424 13.1028 11.8491 13.0087 11.6865C12.9146 11.5239 12.7597 11.4053 12.5782 11.3569C12.3967 11.3085 12.2034 11.3342 12.0408 11.4283L12.7505 12.6544ZM0.832816 6.42213C1.85707 7.91176 3.82446 9.96769 5.98063 11.4123C7.05977 12.1363 8.2225 12.7309 9.36717 13.0096C10.5168 13.2891 11.7033 13.2607 12.7505 12.6544L12.0408 11.4283C11.4058 11.7959 10.6223 11.8568 9.70221 11.633C8.77713 11.4077 7.77059 10.9069 6.769 10.2358C4.76371 8.89174 2.92417 6.9633 2.00015 5.61959L0.832816 6.42213Z"
              fill="black"
            />
            <path
              d="M11.8981 6.02091C11.6307 5.20739 10.9277 3.5205 9.77311 2.47925H4.10645C5.38924 3.78116 8.14572 5.66675 9.56238 8.50008"
              stroke="black"
              strokeWidth="1.41667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <select onChange={selectConvertTo} className={classes.select}>
            <option className={classes.instruction}>...</option>
            <option className={classes.instruction}>.aac</option>
            <option className={classes.instruction}>.aiff</option>
            <option className={classes.instruction}>.flac</option>
            <option className={classes.instruction} value={".mpeg"}>
              .mp3
            </option>
            <option className={classes.instruction}>.ogg</option>
            <option className={classes.instruction}>.wav</option>
            <option className={classes.instruction} value={".x-ms-wma"}>
              .wma
            </option>
          </select>
        </div>
        <p
          className={classes.convert_button}
          onClick={() => handleConversion(audioFile, convertTo, "converter")}
        >
          Convert
        </p>
      </div>

      {/* ready file section */}
      {audioFile.length > 0 &&
        audioFile.map((item, index) => (
          <div key={index} className={classes.ready_file_container}>
            <p className={classes.file_name}>{item.name}</p>
            <p
              style={
                item.status === "ready to download"
                  ? { color: "#228699" }
                  : item.status === "error"
                  ? { color: "#FF0000" }
                  : { color: "black" }
              }
              className={classes.status}
            >
              {item.status}...
            </p>

            {
              // here let's give a condition to show the download button
              item.status === "ready to download" && (
                <p
                  className={classes.download_button}
                  onClick={() => {
                    setIndex(index);
                    setCount(count + 1);
                  }}
                >
                  Download
                </p>
              )
            }
          </div>
        ))}
    </div>
  );
}

export default AudioConverter;
