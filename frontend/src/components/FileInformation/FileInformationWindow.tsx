import "../../styles/FileInformation/FileInformation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import FileOptions from "./FileOptions";
import FileInfosCard from "./FileInfosCard";
import { useState } from "react";

const FileInformationWindow = () => {
  const [filename, SetFilename] = useState("MeinDokument");

  return (
    <>
      <div id="file-information-wrapper">
        <div id="iconCard">
          <FontAwesomeIcon icon={faFile} style={{ fontSize: "9rem" }} />
        </div>
        <div id="fileInfosCard-wrapper">
          <FileInfosCard filename={filename}></FileInfosCard>
          <FileOptions
            filename={filename}
            SetFilename={SetFilename}
          ></FileOptions>
        </div>
      </div>
    </>
  );
};

export default FileInformationWindow;