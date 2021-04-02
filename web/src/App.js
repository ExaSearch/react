import { useCallback, useRef, useEffect, useState } from "react";
import './App.css';


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

  return (<div>
    <textarea placeholder="e.g. The best search engine is *" value={inprogressQuery} onChange={handleChange} onKeyUp={(e) => (e.key === "Enter" ? submit() : 0)}/>
  </div>);
}

function SearchResults(props) {
  console.log(props);
  return (<div className="results">
    {props.results.map(element => {
      return <p key={element.url} className="searchResult">
        <a href={element.url}>{element.url}</a> <span class="score">({element.score})</span></p>
    })}
  </div>);
}

function App() {

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

  return (
    <div className="App">
      <h1 className="title">exa search</h1>
      <SearchBox query={query} setQuery={setQueryParam}/>
      <SearchResults results={results}/>
    </div>
  );
}

export default App;
