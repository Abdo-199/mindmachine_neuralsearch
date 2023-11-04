import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'

const SearchInput = () => {
  return (
    <div id="searchInput-container">
        <input id="searchInput" placeholder='Start a search'></input>
        <button id="searchButton" style={{fontSize: "1.3rem"}}>Search</button>
        <button id="micButton"><FontAwesomeIcon icon={faMicrophone} style={{fontSize: "1.3rem"}} /></button>
    </div>
  )
}

export default SearchInput