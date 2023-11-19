import { Link } from "react-router-dom";

const DocumentRow = ({file}: {file: any}) => {
  // nehme heutiges Datum für Upload-Date
  // const date = new Date().toLocaleDateString()
  // konvertiere bytes in megabytes
  const size = (file.size/(1024*1024)).toFixed(2)
  return (
    <tr>
      <td>{file.file_name}</td>
      <td>{file.file_size.toFixed(2)} MB</td>
      <td>{file.file_date}</td>
      <td>
        {/* weiterleiten zur File Information Page der jeweiligen Datei*/}
        <Link to={`/FileInformation/${file.name}`}>Details</Link>
      </td>
    </tr>
  );
};

export default DocumentRow;
