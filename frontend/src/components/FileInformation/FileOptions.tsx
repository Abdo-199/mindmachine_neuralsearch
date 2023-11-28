import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/FileInformation/FileInformation.css";
import Modal from "../Others/Modal";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FileOptions = ({
  filename,
  SetThisFile,
  docRows,
  SetDocRows,
}: {
  filename: string;
  SetThisFile: any;
  docRows: any[];
  SetDocRows: any;
}) => {
  const [isFileOpened, setIsFileOpened] = useState<boolean>(false);
  const [numPages, setNumPages] = useState<number[]>([1]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    const numpages = Array.from({ length: numPages + 1 }, (_, index) => (index += 1)
    );
    console.log("This1");
    
    console.log(numpages);
    console.log(numPages);
    console.log("This2");
    
    setNumPages(numpages);
  }

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

  const IsFileOpened = () => {
    setIsFileOpened((current) => !current);
  };

  const [newFilename, SetNewFilename] = useState("");

  const navigate = useNavigate();

  const OpenFile = () => {
    IsFileOpened();
  };

  const RenameFile = () => {
    if (newFilename != "") {
      SetThisFile((prevFileInfo: any) => ({
        ...prevFileInfo,
        file_name: newFilename,
      }));

      API_EditDocumentName();
    }
  };

  const DeleteFile = () => {
    const fileFound = docRows.find((file) => file.file_name == filename);

    if (fileFound) {
      SetThisFile(null);
      API_DeleteDocument();
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
      .then((_response) => {
        SetDocRows(docRows.filter((file) => file.file_name !== filename));

        ModalHandlerDataDelete();
        navigate("/MainWindow");
      });
  };

  const API_EditDocumentName = async () => {
    ModalHandlerDataChange();

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
      .then((_response) => {
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
      {isFileOpened && (
        <>
          <Modal
            header={""}
            content={
              <div>
                <br></br>
                <Document
                  file={"/sample.pdf"}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  {numPages.map((page) => (
                    <Page
                      renderMode="svg"
                      pageNumber={page}
                      renderTextLayer={true}
                      renderAnnotationLayer={false}
                    />
                  ))}
                </Document>
              </div>
            }
            closeModal={IsFileOpened}
          ></Modal>
        </>
      )}
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
        <button className="fileOption-button" onClick={() => OpenFile()}>
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
