import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import HomeWindow from '../Home/HomeWindow'

import '../../styles/Misc/MainWindow.css'
import LegalNotice from './LegalNotice';
import SearchHistory from '../SearchHistory/SearchHistory';
import SearchResult from '../SearchResult/SearchResult';
import AdminPanel from '../AdminPanel/AdminPanel';
import FileInformationWindow from '../FileInformation/FileInformationWindow'
import { useNavigate } from "react-router-dom";

interface MainWindowProps {
  content: string;
}

const MainWindow: React.FC<MainWindowProps> = ({ content }) => {

  const navigate = useNavigate();

  // Liste aller Dateien (noch nicht user-spezifisch)
  const [docRows, SetDocRows] = useState<any[]>([]);

  useEffect(() => {
    if (localStorage.getItem("userID") == null || localStorage.getItem("isAdmin") == null) {
      navigate("/")
    }
    else {
      GetFileStructure();
    }
  }, [])

const GetFileStructure = async () => {
  return await fetch(`http://141.45.224.114:8000/filestructure/${localStorage.getItem("userID")}`, {
    method: 'GET',
    mode: "cors",
    cache: "no-cache",
  })
    .then(res => res.json())
    .then(response => {
      SetDocRows(response)
    })
}

//Prüfe, was angezeigt werden soll
const componentMap: { [key: string]: React.ReactElement } = {
  "HomeWindow": <HomeWindow docRows={docRows} SetDocRows={SetDocRows} />,
  "LegalNotice": <LegalNotice />,
  "SearchHistory": <SearchHistory />,
  "SearchResult": <SearchResult />,
  "AdminPanel": <AdminPanel />,
  "FileInformation": <FileInformationWindow docRows={docRows} SetDocRows={SetDocRows} />,
};

const toRenderContent = componentMap[content] || <div>Component not found</div>;

return (
  <div id="windowWrapper">
    <div id="mainWindow-container">
      <Header></Header>
      <div id="mainContent">
        {toRenderContent}
      </div>
      <Footer></Footer>
    </div>
  </div>
)
    }

export default MainWindow