import { Avatar } from "@mui/material";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import "./chat.scss";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import ReactTimeago from "react-timeago";
import { useDispatch } from "react-redux";
import { selectImage } from "../../../../features/appSlice";
import { db } from "../../../../firebase";
import { useNavigate } from "react-router-dom";

interface ChatData {
  id: string;
  username: string;
  timestamp: Timestamp;
  imageUrl: string;
  read: boolean;
  profilePic: string;
}

export function Chat({
  id,
  username,
  timestamp,
  imageUrl,
  read,
  profilePic,
}: ChatData) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      const docRef = doc(db, `posts/${id}`);
      setDoc(docRef, { read: true }, { merge: true });
      navigate("/chats/view");
    }
  };

  return (
    <div onClick={open} className="chat">
      <Avatar className="chat--avatar" src={profilePic} />
      <div className="chat--info">
        <h4>{username}</h4>
        <p>
          Tap to view -{" "}
          <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
        </p>
      </div>

      {!read && <StopRoundedIcon className="chat--readIcon" />}
    </div>
  );
}
