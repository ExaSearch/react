import './App.css';
import ResultsPage from './pages/resultsPage/ResultsPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SearchPage from "./pages/searchPage/SearchPage";

function App() {
  return (
    <div className="App">
      <Router>
       <Route path="/" exact component={SearchPage} />
        <Route path="/search"  component={ResultsPage} />
      </Router>
    </div>
  );
}

export default App;

