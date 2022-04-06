import { useSelector } from "react-redux";
import { selectCameraImage } from "../../features/cameraSlice";
import "./preview.scss";

export function Preview() {
  const cameraImage = useSelector(selectCameraImage);

  return (
    <div className="preview">
      <img src={cameraImage} alt="Preview" />
    </div>
  );
}
