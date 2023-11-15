import "../../styles/FileInformation/FileInformation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import FileOptions from "./FileOptions";
import FileInfosCard from "./FileInfosCard";
import { useState } from "react";

const FileInformationWindow = () => {
  const [filename, SetFilename] = useState("MeinDokument");
  const [modalHandlerDataChange, setModalHandlerDataChange] = useState(false);
  const [modalHandlerDataDelete, setModalHandlerDataDelete] = useState(false);

  const ModalHandlerDataChange = () => {
    // Modalhandler zum Ändern des Dateinamens
    setModalHandlerDataChange((current) => !current);
  };

  const ModalHandlerDataDelete = () => {
    // Modalhandler zum Löschen der Datei
    setModalHandlerDataDelete((current) => !current);
  };

  return (
    <>
      <div id="file-information-wrapper">
        <div id="iconCard">
          <FontAwesomeIcon icon={faFile} style={{ fontSize: "9rem" }} />
        </div>
        <div id="fileInfosCard-wrapper">
          <FileInfosCard filename={filename}></FileInfosCard>
          <FileOptions
            modalHandlerDataChange={modalHandlerDataChange}
            ModalHandlerDataChange={ModalHandlerDataChange}
            modalHandlerDataDelete={modalHandlerDataDelete}
            ModalHandlerDataDelete={ModalHandlerDataDelete}
            filename={filename}
            SetFilename={SetFilename}
          ></FileOptions>
        </div>
      </div>
    </>
  );
};

export default FileInformationWindow;