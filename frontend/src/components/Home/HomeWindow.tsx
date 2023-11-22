import { useState, ChangeEvent } from "react";
import "../../styles/Home/Home.css";
import SearchInput from "./SearchInput";
import DocumentList from "./DocumentList";

const HomeWindow = ({ docRows, SetDocRows }: { docRows: any[], SetDocRows: any }) => {

  const [files, setFiles] = useState<FileList | null>(null);

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
          const file = { "file_name": rawFile.name, "file_size": rawFile.size, "file_date": today }
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