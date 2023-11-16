import { useState } from "react";
import "../../styles/Home/Home.css";
import SearchInput from "./SearchInput";
import DocumentList from "./DocumentList";

const HomeWindow = ({docRows, SetDocRows}: {docRows: any[], SetDocRows: any}) => {

  // gegenwärtige datei zum Hinzufügen
  const [file, setFile] = useState<any>();

  const selectFiles = (event: any) => {
    for (let i = 0; i < event.target.files.length; i++) {
      const rawFile: File = event.target.files[i];
      // nehme heutiges Datum für Upload-Date
      const today = new Date().toLocaleDateString();
      const file = {name: rawFile.name, size: rawFile.size, date: today}

      // keine Dateien mit doppeltem Namen hochladen 
      if (!docRows.find((x) => x.name == file.name)) {
        setFile(file);
        docRows.push(file);
      }
    }
    SetDocRows(docRows)
  };
  
  return (
    <div className="window-container">
      <SearchInput></SearchInput>
      <h1>Library</h1>
      <label className="custom-file-upload">
        <input
          onChange={selectFiles}
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