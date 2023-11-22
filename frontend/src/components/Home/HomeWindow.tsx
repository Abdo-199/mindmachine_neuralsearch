import { useState, ChangeEvent, useEffect } from "react";
import "../../styles/Home/Home.css";
import SearchInput from "./SearchInput";
import DocumentList from "./DocumentList";
import { MethodSignature } from "typescript";
import { HookCallbacks } from "async_hooks";

const HomeWindow = ({ docRows, SetDocRows, GetFileStructure }: { docRows: any[], SetDocRows: any, GetFileStructure: () => void }) => {

  const [files, setFiles] = useState<FileList | null>(null);

  useEffect(() => {
    GetFileStructure();
  }, [])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFiles(selectedFiles);
      const formData = new FormData();

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('files', selectedFiles[i]);
      }
      
      API_UploadDocument(formData, selectedFiles);
    }
  };

  const API_UploadDocument = async (formData: FormData, selectedFiles: FileList) => {

    return await fetch(`http://141.45.224.114:8000/upload/${localStorage.getItem("userID")}`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(response => {

        const newDocRows = [...docRows]; // Kopiere das bestehende Array
        for (let i = 0; i < selectedFiles.length; i++) {
          const rawFile: File = selectedFiles[i];
          const today = new Date().toLocaleDateString();
          // konvertiere bytes in megabytes 
          const convertedSize = (rawFile.size/(1024*1024)).toFixed(2)
          const file = { "file_name": rawFile.name, "file_size": `${convertedSize} MB`, "file_date": today }
          newDocRows.push(file);
        }
        console.log(newDocRows)
        SetDocRows(newDocRows)
      })
  };

  return (
    <div className="window-container">
      <SearchInput></SearchInput>
      <h1>Library</h1>
      <label className="custom-file-upload">
        <input
          onChange={handleFileChange}
          type="file"
          accept="application/pdf"
          multiple
        />
        Add new files
      </label>
      <DocumentList docRows={docRows}></DocumentList>
    </div>
  );
};

export default HomeWindow;