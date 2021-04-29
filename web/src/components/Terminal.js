import React from 'react';
import BGCard from './Card';
import './Components.css';
import { useCallback, useRef, useEffect, useState } from "react";
import Header from './Layout/Header';
import './Layout/layout.css';

function SearchBox(props) {
    const handleChange = (e) => {
      props.setInprogressQuery(e.target.value.replace(/\n|\r/g, ""));
      props.setRawQuery(e.target.value.replace(/\n|\r/g, ""));
    }

    useEffect(() => {
      props.setInprogressQuery(props.query)
    }, [props.query]);
  
    const submit = () => {
      if (!props.inprogressQuery.includes("*")) {
        window.alert("query must contain *");
        return;
      }
      props.setQuery(props.inprogressQuery.replace("*", "<mask>"));
    }
  
    return (
    <div className="textAreaPrefix">
      <textarea placeholder="e.g. The best search engine is *" value={props.query} onChange={handleChange} onKeyUp={(e) => (e.key === "Enter" ?  submit() : 0)}/>
    </div>
    );
}
  
function SearchResults(props) {
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

const libraryCardStyles = {
  height: 'fit-content',
  width: 'fit-content',
  textAlign: 'left',
  padding: '16px 16px 16px 16px',
  marginBottom: '20px',
  fontSize: '1.13vw',
};

const buttonStyles = {
  height: 'fit-content',
  width: 'fit-content',
  border: 'none',
  textAlign: 'left',
  padding: 'none',
  float: 'left',
  background: 'none',
  fontSize: '1.13vw',
  color: '#727170',
  fontFamily: 'Inconsolata'
}

const libraryItems = [
  {query: "machine learning is *", key: 1},
  {query: "self-supervised learning is *", key: 2},,
  {query: "prompts are hard to think of because *", key: 3},
  {query: "test *", key: 4},
]; 

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.btnTapped = this.btnTapped.bind(this);
  }
  btnTapped(foo){
    this.props.setQuery(foo.query.replace("*","<mask>"));
  }

  render() {
    return (
      <div className="libraryColumn">
        {
          libraryItems.map((libraryItem) => (
            this.props.query == libraryItem.query ? 
                (<button key={libraryItem.key} style={buttonStyles} onClick={() => this.btnTapped(libraryItem)}>
                  <BGCard style={libraryCardStyles} type={"clickedCard"}>{libraryItem.query}</BGCard>
                </button>) : (
                  <button key={libraryItem.key} style={buttonStyles} onClick={() => this.btnTapped(libraryItem)}>
                  <BGCard style={libraryCardStyles} type={"card"}>{libraryItem.query}</BGCard>
                </button>
                )
          ))
        }
      </div>
    )
  }
} 

function Terminal(props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [inprogressQuery, setInprogressQuery] = useState(query);

  const searchAndSetQuery = (q) => {
    if (!q.includes("<mask>")) {
      return;
    }
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
      <div className="terminalLayout">
        <BGCard style={{width: '100%', height: '100%', }} type={"card"}>
          <Header style={{margin: '24px 0px 0px 28px' }} />
          <div className="instructions">
            Give us a prompt with a * in it, we’ll predict which URLs best fill that blank
          </div>
          <SearchBox query={query} setQuery={setQueryParam} setRawQuery={setQuery} setInprogressQuery={setInprogressQuery} inprogressQuery={inprogressQuery}/>
          <div className='divider'></div>
          <SearchResults results={results}/>    
        </BGCard>
        <Library query={query} setQuery={setQueryParam}/>
      </div>
    );
}

export default Terminal;