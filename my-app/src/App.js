import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import IPO from './IPO';
import CompanyFinancials from './CompanyFinancials';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Quote from './Quote';
import CompanyProfile from './CompanyProfile';
function App() {

  return (
    <div className="App">
       <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ipo" element={<IPO />} />
          <Route path="/company" element={<CompanyFinancials />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/companyProfile" element={<CompanyProfile />} />
       
        </Routes>

      </Router>      
      
    </div>
  );
}

export default App;
