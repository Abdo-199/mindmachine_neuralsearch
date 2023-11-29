import { Link } from "react-router-dom";

const DocumentRow = ({file}: {file: any}) => {
  return (
    <tr>
      <td>{file.file_name}</td>
      <td>{file.file_size}</td>
      <td>{file.file_date}</td>
      <td>
        {/* weiterleiten zur File Information Page der jeweiligen Datei*/}
        <Link to={`/FileInformation/${file.file_name}`}>Details</Link>
      </td>
    </tr>
  );
};

export default DocumentRow;
