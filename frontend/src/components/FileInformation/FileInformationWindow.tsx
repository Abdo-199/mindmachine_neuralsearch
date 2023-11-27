import "../../styles/FileInformation/FileInformation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import FileOptions from "./FileOptions";
import FileInfosCard from "./FileInfosCard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../Others/Modal";

const FileInformationWindow = ({
  docRows,
  SetDocRows,
}: {
  docRows: any[];
  SetDocRows: any;
}) => {
  const { filenameParams } = useParams() as { filenameParams: string };

  type FileObject = {
    file_name: string;
    file_size: string;
    file_date: string;
  };

  const [thisFile, SetThisFile] = useState<FileObject | null>();

  useEffect(() => {
    SearchAndSetObject();
  }, []);

  const [showModalHandlerDataDelete, setShowModalHandlerDataDelete] =
    useState(false);

  const ShowModalHandlerDataDelete = () => {
    // Modalhandler zum Löschen der Datei
    setShowModalHandlerDataDelete((current) => !current);
  };

  const navigate = useNavigate();

  // Funktion zum Suchen und Setzen des gefundenen Objekts
  const SearchAndSetObject = () => {
    const foundItem = docRows.find((item) => item.file_name === filenameParams);
    console.log(showModalHandlerDataDelete);

    if (foundItem) {
      SetThisFile(foundItem);
    }
  };

  return (
    <>
      <div id="file-information-wrapper">
        <div id="iconCard">
          <FontAwesomeIcon icon={faFile} style={{ fontSize: "9rem" }} />
        </div>
        <div id="fileInfosCard-wrapper">
          <FileInfosCard
            file_name={thisFile?.file_name}
            file_size={thisFile?.file_size}
            file_date={thisFile?.file_date}
          ></FileInfosCard>
          {thisFile && (
            <FileOptions
              showModalHandlerDataDelete={showModalHandlerDataDelete}
              ShowModalHandlerDataDelete={ShowModalHandlerDataDelete}
              filename={thisFile.file_name}
              SetThisFile={SetThisFile}
              docRows={docRows}
              SetDocRows={SetDocRows}
            ></FileOptions>
          )}
          {showModalHandlerDataDelete ? (
            <Modal
              header={"Deleting a File"}
              content={
                <div>
                  <hr className="hr-style"></hr>
                  <div>
                    <span>File has been deleted successfully.</span>
                  </div>
                  <br></br>
                  <hr className="hr-style"></hr>
                  <button
                    className="fileOption-button"
                    onClick={() => {
                      console.log(showModalHandlerDataDelete);
                      ShowModalHandlerDataDelete();
                      navigate("/MainWindow");
                    }}
                  >
                    OK
                  </button>
                </div>
              }
              closeModal={() => {
                ShowModalHandlerDataDelete();
                console.log(showModalHandlerDataDelete);
              }}
            ></Modal>
          ) : // <DeleteFileModal
          //   DeleteFile={() => {}}
          //   isConfirmed={isConfirmed}
          //   SetIsConfirmed={SetIsConfirmed}
          //   filename={thisFile?.file_name}
          //   closeModal={ShowModalHandlerDataDelete}
          // ></DeleteFileModal>
          null}
        </div>
      </div>
    </>
  );
};

export default FileInformationWindow;
