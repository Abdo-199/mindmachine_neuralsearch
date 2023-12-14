import "../../styles/SearchHistory/SearchHistory.css";

interface SearchRowProps {
  name: string;
  createdOn: string;
  Search: any;
  Delete: any;
}

const SearchRow = ({ name, createdOn, Search, Delete }: SearchRowProps) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{createdOn}</td>
      <td>
        <button onClick={() => Search(name)}>Search</button>
      </td>
      <td>
        <button onClick={() => Delete(name)}>Delete</button>
      </td>
    </tr>
  );
};

export default SearchRow;
