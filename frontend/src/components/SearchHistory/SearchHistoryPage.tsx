import "./SearchHistoryStyles.css";
import { useState } from "react";

// Dummy Daten für Such-Einträge
let names = [
  "search#001",
  "search#002",
  "search#003",
  "search#004",
  "search#005",
];

let dates = [
  new Date("2023-11-20").toLocaleDateString(),
  new Date("2023-11-21").toLocaleDateString(),
  new Date("2023-11-22").toLocaleDateString(),
  new Date("2023-11-23").toLocaleDateString(),
  new Date("2023-11-24").toLocaleDateString(),
];

let searchEntries = [
  { name: names[0], createdOn: dates[0] },
  { name: names[1], createdOn: dates[1] },
  { name: names[2], createdOn: dates[2] },
  { name: names[3], createdOn: dates[3] },
  { name: names[4], createdOn: dates[4] },
];

// TODO Code auslagern in weitere(n) Komponent(en)
const SearchHistoryPage = () => {

  const [data, setData] = useState(searchEntries);

  return (
    <>
      <h1 className="header-center">Search History</h1>
      <div className="searchHistoryContainer">
        <table>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.name}</td>
              <td>{entry.createdOn}</td>
              <td>
                <button>Search</button>
              </td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};

export default SearchHistoryPage;
