import React from 'react'
import { Link } from "react-router-dom";
import "../../styles/SearchResult/SearchResult.css"

interface RelevantDocProps {
    docName: string; // Oder einen anderen passenden Typen
  }

const OpenFile: React.FC<RelevantDocProps> = ({ docName }) => {
    
  return (
    <button className='button-openfile'>
        <Link to={`/FileInformation/${docName}/true`} style={{textDecoration: "none", color:"black"}}>Open File</Link>
    </button>
  )
}

export default OpenFile