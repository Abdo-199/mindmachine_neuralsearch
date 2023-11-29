import { useState } from "react";
import "../../styles/FileInformation/FileInformation.css";
import RenameFileModal from "../Others/RenameFileModal";
import DeleteFileModal from "../Others/DeleteFileModal";

const FileOptions = ({
  filename,
  SetThisFile,
  docRows,
  SetDocRows,
  modalHandlerDeleteConfirm,
  ModalHandlerDeleteConfirm,
}: {
  modalHandlerDeleteConfirm: boolean;
  ModalHandlerDeleteConfirm: any;
  filename: string;
  SetThisFile: any;
  docRows: any[];
  SetDocRows: any;
}) => {
  function checkFilename(
    inputString: string,
    forbiddenCharacters: RegExp
  ): boolean {
    return forbiddenCharacters.test(inputString);
  }
  
  const [newFilename, SetNewFilename] = useState("");

  const [modalHandlerDataChange, setModalHandlerDataChange] = useState(false);
  const [modalHandlerDataDelete, setModalHandlerDataDelete] = useState(false);

  const [isConfirmed, SetIsConfirmed] = useState(false);

  const ModalHandlerDataChange = () => {
    // Modalhandler zum Ändern des Dateinamens
    setModalHandlerDataChange((current) => !current);
  };

  const ModalHandlerDataDelete = () => {
    // Modalhandler zum Löschen der Datei
    setModalHandlerDataDelete((current) => !current);
  };

  const RenameFile = () => {
    // Dateiname darf nicht leer sein
    if (newFilename == "") {
      alert("Input Error. The new filename is empty.");
      return;
    }

    // Dateiname darf keine speziellen Zeichen enthalten
    const forbiddenCharsRegex = /[!§@#$%^&*()_+{}\[\]:;<>,?~\\/-]/;
    if (checkFilename(newFilename, forbiddenCharsRegex)) {
      alert("Input Error. The new filename contains forbidden characters.");
      return;
    }

    // Dateiname kann geändert werden
    SetThisFile((prevFileInfo: any) => ({
      ...prevFileInfo,
      file_name: newFilename,
    }));
    API_EditDocumentName();
    
    // Bestätigung über Umbenennung an Nutzer senden
    SetIsConfirmed(true);
  };

  const DeleteFile = () => {
    const fileFound = docRows.find((file) => file.file_name == filename);

    if (fileFound) {
      SetThisFile(null);
      API_DeleteDocument();
      // Bestätigung über Löschung an Nutzer senden
      SetIsConfirmed(true);
      ModalHandlerDeleteConfirm();
      console.log(modalHandlerDeleteConfirm);
    } else {
      alert("Error. There was a problem.");
    }
  };

  const API_DeleteDocument = async () => {
    return await fetch(
      `http://141.45.224.114:8000/deleteDocument/${localStorage.getItem(
        "userID"
      )}/${filename}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        SetDocRows(docRows.filter((file) => file.file_name !== filename));
      });
  };

  const API_EditDocumentName = async () => {
    return await fetch(
      `http://141.45.224.114:8000/editDocumentName/${localStorage.getItem(
        "userID"
      )}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ old_name: filename, new_name: newFilename }),
      }
    )
      .then((res) => res.json())
      .then((response) => {
        const nextList = docRows.map((item) => {
          SetNewFilename("");

          if (item.file_name === filename) {
            item.file_name = newFilename;
            return item;
          } else {
            return item;
          }
        });
        SetDocRows(nextList);
      });
  };

  return (
    <>
      {modalHandlerDataChange ? (
        <RenameFileModal
          RenameFile={RenameFile}
          isConfirmed={isConfirmed}
          SetIsConfirmed={SetIsConfirmed}
          filename={filename}
          SetNewFilename={SetNewFilename}
          closeModal={ModalHandlerDataChange}
        ></RenameFileModal>
      ) : null}
      {modalHandlerDataDelete ? (
        <DeleteFileModal
          DeleteFile={DeleteFile}
          isConfirmed={isConfirmed}
          SetIsConfirmed={SetIsConfirmed}
          filename={filename}
          closeModal={ModalHandlerDataDelete}
        ></DeleteFileModal>
      ) : null}
      <div id="fileOptions-buttons">
        <button
          className="fileOption-button"
          onClick={() => console.log("Open")}
        >
          Open file
        </button>
        <button className="fileOption-button" onClick={ModalHandlerDataChange}>
          Rename
        </button>
        <button className="fileOption-button" onClick={ModalHandlerDataDelete}>
          Delete
        </button>
      </div>
    </>
  );
};

export default FileOptions;
