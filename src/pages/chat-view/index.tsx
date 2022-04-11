/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectSelectedImage } from "../../features/appSlice";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./chat-view.scss";

export function ChatView() {
  const selectedImage = useSelector(selectSelectedImage);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedImage) {
      exit();
    }
  }, [selectedImage]);

  const exit = () => {
    navigate("/chats");
  };

  const onFinish = () => {
    exit();
  };

  return (
    <div className="chatView">
      <img src={selectedImage} onClick={exit} alt="" />
      <div className="chatView--timer">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={6}
          size={50}
          colors={["#004777", "#F7B801", "#A30000"]}
          colorsTime={[10, 5, 0]}
          onComplete={onFinish}
        >
          {({ remainingTime }) => (
            <div className="chatView--timer--countdown">{remainingTime}</div>
          )}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}
