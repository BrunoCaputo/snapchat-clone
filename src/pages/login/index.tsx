import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../features/appSlice";
import { auth, provider } from "../../firebase";
import "./login.scss";

export function Login() {
  const dispatch = useDispatch();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((credentials) => {
        const user = credentials.user;
        dispatch(
          login({
            username: user.displayName,
            profilePic: user.photoURL,
            id: user.uid,
          })
        );
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="login">
      <div className="login--container">
        <img
          src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
          alt="Snapchat Logo"
        />
        <Button className="login--button" variant="outlined" onClick={signIn}>
          Sign in
        </Button>
      </div>
    </div>
  );
}
