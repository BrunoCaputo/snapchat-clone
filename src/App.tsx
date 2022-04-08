import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Chats } from "./pages/chats";
import { Preview } from "./pages/preview";
import { WebcamCapture } from "./pages/webcamCapture";

function App() {
  return (
    <div className="app">
      <Router>
        <div className="app--body">
          <Routes>
            <Route path="/chats" element={<Chats />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/" element={<WebcamCapture />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
