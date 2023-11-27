import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/FileInformation/FileInformation.css";
import RenameFileModal from "../Others/RenameFileModal";
import DeleteFileModal from "../Others/DeleteFileModal";

const FileOptions = ({
  filename,
  SetThisFile,
  docRows,
  SetDocRows,
  showModalHandlerDataDelete,
  ShowModalHandlerDataDelete,
}: {
  showModalHandlerDataDelete: boolean;
  ShowModalHandlerDataDelete: any;
  filename: string;
  SetThisFile: any;
  docRows: any[];
  SetDocRows: any;
}) => {
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

  const [newFilename, SetNewFilename] = useState("");

  const RenameFile = () => {
    if (newFilename != "") {
      SetThisFile((prevFileInfo: any) => ({
        ...prevFileInfo,
        file_name: newFilename,
      }));

      API_EditDocumentName();
      // Bestätigung über Umbenennung an Nutzer senden
      SetIsConfirmed(true);
    }
  };

  const DeleteFile = () => {
    const fileFound = docRows.find((file) => file.file_name == filename);

    if (fileFound) {
      SetThisFile(null);
      API_DeleteDocument();
      // Bestätigung über Löschung an Nutzer senden
      // alert("File is successfully deleted.");
      SetIsConfirmed(true);
      ShowModalHandlerDataDelete();
      console.log(showModalHandlerDataDelete);
      
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
        //navigate("/MainWindow");
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
      ) : // <Modal
      //   header={"Deleting a File"}
      //   content={
      //     <div>
      //       <hr className="hr-style"></hr>
      //       <div>
      //         <span>Do you want to delete the file: {filename}?</span>
      //       </div>
      //       <br></br>
      //       <hr className="hr-style"></hr>
      //       <div className="renameFileOptions-buttons">
      //         <button
      //           className="fileOption-button"
      //           onClick={ModalHandlerDataDelete}
      //         >
      //           Cancel
      //         </button>
      //         <button
      //           className="fileOption-button"
      //           onClick={() => DeleteFile()}
      //         >
      //           OK
      //         </button>
      //       </div>
      //     </div>
      //   }
      //   closeModal={ModalHandlerDataDelete}
      // ></Modal>
      null}
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
