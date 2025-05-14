import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your components/pages
import Home from './pages/Home';
import Test from './pages/Test';
import Result from './pages/Result';

const App = () => {
  return (
    <Router>
      <div>
        {/* Routing */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
