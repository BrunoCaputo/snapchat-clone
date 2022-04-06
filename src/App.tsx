import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Preview } from "./components/Preview";
import { WebcamCapture } from "./components/WebcamCapture";

function App() {
  return (
    <div className="app">
      <Router>
        <div className="app--body">
          <Routes>
            <Route path="/preview" element={<Preview />} />
            <Route path="/" element={<WebcamCapture />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
