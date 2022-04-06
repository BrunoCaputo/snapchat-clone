import { LegacyRef, useCallback, useRef } from "react";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useDispatch } from "react-redux";
import { setCameraImage } from "../../features/cameraSlice";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

export function WebcamCapture() {
  const webcamRef: LegacyRef<Webcam> = useRef(null);
  const dispatch = useDispatch();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    dispatch(setCameraImage(imageSrc));
  }, [webcamRef]);

  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        width={videoConstraints.width}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />

      <RadioButtonUncheckedIcon
        className="webcamCapture--button"
        onClick={capture}
        fontSize="large"
      />
    </div>
  );
}
