import React from 'react'
import { useSearchResult } from './SearchResultContext';
import OpenFile from './OpenFile';

const MostRelevantDoc = () => {

    const { searchResult, setSearchResult } = useSearchResult();

    return (
        <div className="relevant-doc">
            <p className="docName-header">{searchResult.relevant_docs[0]}</p>
            <hr className="seperator"></hr>

            <p className="doc-relevant-paragraphs">Relevant paragraphs:</p>

            {searchResult.relevant_paragraphs.map((item: string, index: number) => {
                return <p>{item}</p>
            })}

            {searchResult.relevant_paragraphs[0] == " " ? <p>No paragraphs found!</p> : null}

            <OpenFile docName={searchResult.relevant_docs[0]}></OpenFile>
        </div>
    )
}

export default MostRelevantDoc