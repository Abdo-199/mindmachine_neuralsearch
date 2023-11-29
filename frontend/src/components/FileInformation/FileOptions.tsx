import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import Modal from "../Others/Modal";
import RenameFileModal from "../Others/RenameFileModal";
import DeleteFileModal from "../Others/DeleteFileModal";
import "../../styles/FileInformation/FileInformation.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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
  
  const [newFilename, SetNewFilename] = useState("");
  const [isFileOpened, setIsFileOpened] = useState<boolean>(false);
  const [numPages, setNumPages] = useState<number[]>([1]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [modalHandlerDataChange, setModalHandlerDataChange] = useState(false);
  const [modalHandlerDataDelete, setModalHandlerDataDelete] = useState(false);
  
  const [isConfirmed, SetIsConfirmed] = useState(false);
  
  const navigate = useNavigate();
  
  // Dokument erfolgreich geöffnet
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    const numpages = Array.from({ length: numPages + 1 }, (_, index) => (index += 1)
    );
    setNumPages(numpages);
  }
  // Modalhandler zum Ändern des Dateinamens
  const ModalHandlerDataChange = () => {
    setModalHandlerDataChange((current) => !current);
  };

  // Modalhandler zum Löschen der Datei
  const ModalHandlerDataDelete = () => {
    setModalHandlerDataDelete((current) => !current);
  };

  // Modalhandler zum Öffnen der PDF
  const IsFileOpened = () => {
    setIsFileOpened((current) => !current);
  };


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
