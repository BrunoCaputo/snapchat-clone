import CloseIcon from "@mui/icons-material/Close";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CreateIcon from "@mui/icons-material/Create";
import NoteIcon from "@mui/icons-material/Note";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CropIcon from "@mui/icons-material/Crop";
import TimerIcon from "@mui/icons-material/Timer";
import SendIcon from "@mui/icons-material/Send";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetCameraImage,
  selectCameraImage,
} from "../../features/cameraSlice";
import { v4 as uuid } from "uuid";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import "./preview.scss";
import { selectUser } from "../../features/appSlice";

export function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cameraImage) {
      navigate("/");
    }
  }, [cameraImage, navigate]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  const sendPost = () => {
    const id = uuid();
    const path: string = `posts/${id}`;
    const storageRef = ref(storage, path);
    uploadString(storageRef, cameraImage, "data_url")
      .then(() => {
        getDownloadURL(storageRef).then((url) => {
          const col = collection(db, "posts");
          addDoc(col, {
            imageUrl: url,
            username: user.username,
            read: false,
            profilePic: user.profilePic,
            timestamp: serverTimestamp(),
          });
          navigate("/chats");
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="preview">
      <CloseIcon onClick={closePreview} className="preview--close" />
      <div className="preview--toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt="Preview" />
      <div onClick={sendPost} className="preview--footer">
        <h2>Send Now</h2>
        <SendIcon className="preview--sendIcon" />
      </div>
    </div>
  );
}
