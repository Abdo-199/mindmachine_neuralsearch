import React, { useState } from 'react'
import '../../styles/Home/Home.css'
import SearchInput from './SearchInput'
import DocumentList from './DocumentList'

const HomeWindow = () => {

  return (
    <div className='window-container'>
      <SearchInput></SearchInput>
      <h1>Library</h1>

      <label className="custom-file-upload">
        <input type="file" accept='application/pdf' multiple/>
        Add new files
      </label>

      <DocumentList></DocumentList>
    </div>
  )
}

export default HomeWindow