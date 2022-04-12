import { Avatar } from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SearchIcon from "@mui/icons-material/Search";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import "./chats.scss";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Chat } from "./components/Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/appSlice";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { resetCameraImage } from "../../features/cameraSlice";

export function Chats() {
  const [posts, setPosts] = useState<any[]>([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const col = collection(db, "posts");
    const q = query(col, orderBy("timestamp", "desc"));
    getDocs(q).then((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const takeSnap = () => {
    dispatch(resetCameraImage());
    navigate("/");
  };

  return (
    <div className="chats">
      <div className="chats--header">
        <Avatar
          src={user.profilePic}
          onClick={() => signOut(auth)}
          className="chats--avatar"
        />
        <div className="chats--search">
          <SearchIcon className="chats--searchIcon" />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubbleIcon className="chats--chatIcon" />
      </div>

      <div className="chats--posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </div>

      <RadioButtonUncheckedIcon
        className="chats--takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
}
