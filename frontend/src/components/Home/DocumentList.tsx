import React, { useState } from 'react'
import DocumentRow from './DocumentRow'

const DocumentList = () => {
  
  const [documentRows, setDocumentRows] = useState([]);

  return (
    <table id="documentList-table">
      <tr id="document-headerRow">
        <th>Name</th>
        <th>Size</th>
        <th>Date</th>
        <th>More</th>
      </tr>
      
      <DocumentRow></DocumentRow>
      <DocumentRow></DocumentRow>
      <DocumentRow></DocumentRow>
      <DocumentRow></DocumentRow>
      <DocumentRow></DocumentRow>
      <DocumentRow></DocumentRow>
      <DocumentRow></DocumentRow>
      <DocumentRow></DocumentRow>
      <DocumentRow></DocumentRow>
      <DocumentRow></DocumentRow>
      <DocumentRow></DocumentRow>
      <DocumentRow></DocumentRow>
      <DocumentRow></DocumentRow>

      {documentRows.map((item, index) => {
        return <DocumentRow></DocumentRow>
      })}
    </table>
  )
}

export default DocumentList