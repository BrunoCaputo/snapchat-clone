import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import { login, logout, selectUser } from "./features/appSlice";
import { auth } from "./firebase";
import { ChatView } from "./pages/chat-view";
import { Chats } from "./pages/chats";
import { Login } from "./pages/login";
import { Preview } from "./pages/preview";
import { WebcamCapture } from "./pages/webcamCapture";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <div className="app--body">
            <Routes>
              <Route path="/chats/view" element={<ChatView />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/preview" element={<Preview />} />
              <Route path="/" element={<WebcamCapture />} />
            </Routes>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
