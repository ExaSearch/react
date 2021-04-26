import React from 'react';
import BGCard from './Card';
import './Components.css';
import { useCallback, useRef, useEffect, useState } from "react";
import Header from './Layout/Header';

function SearchBox(props) {

    const [inprogressQuery, setInprogressQuery] = useState(props.query);
  
    const handleChange = (e) => {
      setInprogressQuery(e.target.value.replace(/\n|\r/g, ""));
    }
  
    useEffect(() => {
      setInprogressQuery(props.query)
    }, [props.query]);
  
    const submit = () => {
      if (!inprogressQuery.includes("*")) {
        window.alert("query must contain *");
        return;
      }
      props.setQuery(inprogressQuery.replace("*", "<mask>"));
    }
  
    return (
    <div className="textAreaPrefix">
      <textarea placeholder="e.g. The best search engine is *" value={inprogressQuery} onChange={handleChange} onKeyUp={(e) => (e.key === "Enter" ? submit() : 0)}/>
    </div>
    );
  }
  
  function SearchResults(props) {
    console.log(props);
    return (
    <div className="resultsContainer">
      <div className="outputText">output:</div>
      <div className="resultsList">
      {props.results.map(element => {
        return <p key={element.url} className="searchResult">
          <a href={element.url}>{element.url}</a> <span class="score">({element.score})</span></p>
      })}
      </div>
    </div>);
  }

function Terminal(props) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

  const searchAndSetQuery = (q) => {
    if (!q.includes("<mask>")) {
      return;
    }
    console.log("do search");
    setQuery(q.replace("<mask>","*"));
    let params = new URLSearchParams();
    params.set('q', q);
    const url = "https://exa.sh/api/search?" + params.toString();
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setResults(result);
        },
        (error) => {
          console.log("ERROR");
        }
      )
  }

  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let foo = params.get('q');
    if (!foo) return;
    searchAndSetQuery(foo);
  }, [])

  const setQueryParam = (q) => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set('q', q);
    // window.history.push(window.location.pathname + "?" + currentUrlParams.toString());
    window.history.replaceState(null, null, "?"+currentUrlParams.toString());
    searchAndSetQuery(q);
  }
    return(
        <BGCard style={{width: '1200px', height: '850px',  margin: '30px 20px 0px 30px'}}>
          <Header style={{margin: '24px 0px 0px 28px' }} />
          <div className="instructions">
            Give us a prompt with a * in it, we’ll predict which URLs best fill that blank
          </div>
          {/* <div className='divider2'></div> */}
          <SearchBox query={query} setQuery={setQueryParam}/>
          <div className='divider'></div>
          <SearchResults results={results}/>    
        </BGCard>
    );
}

export default Terminal;