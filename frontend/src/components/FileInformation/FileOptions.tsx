import { useState } from "react";
import "../../styles/FileInformation/FileInformation.css";
import Modal from "../Others/Modal";

const FileOptions = ({
  modalHandlerDataChange,
  ModalHandlerDataChange,
  filename,
  SetFilename,
}: {
  modalHandlerDataChange: boolean;
  ModalHandlerDataChange: any;
  filename: string;
  SetFilename: any;
}) => {
  const [newFilename, SetNewFilename] = useState("");

  const RenameFile = () => {
    if (newFilename != "") {
      SetFilename(newFilename);
      SetNewFilename("");
      console.log(`File "${filename}" is renamed to "${newFilename}".`);
      ModalHandlerDataChange();
    }
  };

  const DeleteFile = () => {};

  return (
    <>
      {modalHandlerDataChange ? (
        // TODO refactor content into new component: RenameFileModalComponent
        <Modal
          header={"Renaming File"}
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
        <button className="fileOption-button">
          Delete
        </button>
      </div>
    </>
  );
};

export default FileOptions;
