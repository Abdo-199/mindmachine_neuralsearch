import React from 'react'
import { useSearchResult } from './SearchResultContext';
import OpenFile from './OpenFile';

interface RelevantDocProps {
    docName: string; // Oder einen anderen passenden Typen
  }
  
  const RelevantDoc: React.FC<RelevantDocProps> = ({ docName }) => {
    const { searchResult, setSearchResult } = useSearchResult();

    return (
        <div className="relevant-doc">
            <p className="docName-header">{docName}</p>

            <OpenFile docName={docName}></OpenFile>
        </div>
    )
}

export default RelevantDoc