import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/FileInformation/FileInformation.css";
import Modal from "../Others/Modal";

const FileOptions = ({
  modalHandlerDataChange,
  ModalHandlerDataChange,
  modalHandlerDataDelete,
  ModalHandlerDataDelete,
  filename,
  SetFilename,
}: {
  modalHandlerDataChange: boolean;
  ModalHandlerDataChange: any;
  modalHandlerDataDelete: boolean;
  ModalHandlerDataDelete: any;
  filename: string;
  SetFilename: any;
}) => {
  const [newFilename, SetNewFilename] = useState("");
  const navigate = useNavigate();

  const RenameFile = () => {
    if (newFilename != "") {
      SetFilename(newFilename);
      SetNewFilename("");
      console.log(`File "${filename}" is renamed to "${newFilename}".`);
      ModalHandlerDataChange();
    }
  };

  const DeleteFile = () => {
    // delete the file
    // ...
    console.log(`File "${filename}" is deleted.`);
    // navigate back to Home Page
    navigate("/MainWindow")
    ModalHandlerDataDelete();
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
                    onChange={(e) => SetNewFilename(e.target.value)}
                  ></input>
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