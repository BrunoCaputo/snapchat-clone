import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import { WebcamCapture } from "./components/WebcamCapture";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="App--body">
          <Routes>
            <Route path="/" element={<WebcamCapture />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
