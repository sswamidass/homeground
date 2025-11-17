import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import MonthlyBox from './pages/MonthlyBox';
import Books from './pages/Books';
import Coffee from './pages/Coffee';
import Subscription from './pages/Subscription';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/monthly-box" element={<MonthlyBox />} />
          <Route path="/books" element={<Books />} />
          <Route path="/coffee" element={<Coffee />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
