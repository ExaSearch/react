import { useCallback, useRef, useEffect, useState } from "react";
import './App.css';
import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Search from "./components/searchPage/search";

function App() {
  return (
    <div className="App">
      <Router>
       <Route path="/" exact component={Layout} />
        <Route path="/search"  component={Search} />
      </Router>
    </div>
  );
}

export default App;
