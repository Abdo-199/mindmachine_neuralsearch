import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/FileInformation/FileInformation.css";
import Modal from "../Others/Modal";

const FileOptions = ({
  filename,
  SetFilename,
  docRows,
  SetDocRows,
}: {
  filename: string;
  SetFilename: any;
  docRows: any[];
  SetDocRows: any;
}) => {
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

  const [newFilename, SetNewFilename] = useState("");

  const navigate = useNavigate();

  const RenameFile = () => {
    if (newFilename != "") {
      SetFilename(newFilename);
      // clear input value
      SetNewFilename("");

      const nextList = docRows.map((item) => {
        if (item.name === filename) {
          item.name = newFilename;
          return item;
        } else {
          return item;
        }
      });

      SetDocRows(nextList);
      console.log(`File "${filename}" is renamed to "${newFilename}".`);
      // close Modal Window
      ModalHandlerDataChange();
    }
  };

  const DeleteFile = () => {
    // finde file
    const fileFound = docRows.find((file) => file.name == filename);

    if (fileFound) {
      console.log("file was found");
      // delete the file
      SetDocRows(docRows.filter((file) => file.name !== filename));
      console.log(`File "${filename}" is deleted.`);
    } else {
      alert("Error. There was a problem.");
    }
    // close Modal Window
    ModalHandlerDataDelete();
    // navigate back to Home Page
    navigate("/MainWindow");
  };

  return (
    <>
      {modalHandlerDataChange ? (
        // TODO refactor content into new component: RenameFileModalComponent
        <Modal
          header={"Renaming a File"}
          content={
            <div>
              <hr className="hr-style"></hr>
              <div>
                <span>Old Filename: {filename}</span>
              </div>
              <br></br>
              <div>
                <span>
                  New Filename:{" "}
                  <input
                    onChange={(e) => SetNewFilename(e.target.value + ".pdf")}
                  ></input>{" "}
                  .pdf
                </span>
              </div>
              <br></br>
              <hr className="hr-style"></hr>
              <div className="renameFileOptions-buttons">
                <button
                  className="fileOption-button"
                  onClick={ModalHandlerDataChange}
                >
                  Cancel
                </button>
                <button
                  className="fileOption-button"
                  onClick={() => RenameFile()}
                >
                  Save
                </button>
              </div>
            </div>
          }
          closeModal={ModalHandlerDataChange}
        ></Modal>
      ) : null}
      {modalHandlerDataDelete ? (
        // TODO refactor content into new component: DeleteFileModalComponent
        <Modal
          header={"Deleting a File"}
          content={
            <div>
              <hr className="hr-style"></hr>
              <div>
                <span>Do you want to delete the file: {filename}?</span>
              </div>
              <br></br>
              <hr className="hr-style"></hr>
              <div className="renameFileOptions-buttons">
                <button
                  className="fileOption-button"
                  onClick={ModalHandlerDataDelete}
                >
                  Cancel
                </button>
                <button
                  className="fileOption-button"
                  onClick={() => DeleteFile()}
                >
                  OK
                </button>
              </div>
            </div>
          }
          closeModal={ModalHandlerDataDelete}
        ></Modal>
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
