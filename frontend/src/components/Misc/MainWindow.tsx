import React from 'react'
import Header from './Header'
import Footer from './Footer'
import HomeWindow from '../Home/HomeWindow'
import '../../styles/Misc/MainWindow.css'
import FileInformationWindow from '../FileInformation/FileInformationWindow'
import LegalNotice from './LegalNotice'

const MainWindow = () => {
  return (
    <div id="windowWrapper">
      <div id="mainWindow-container">
        <Header></Header>
        <div id="mainContent">
          <HomeWindow></HomeWindow>
        </div>
        <Footer></Footer>
      </div>
    </div>
  )
}

export default MainWindow