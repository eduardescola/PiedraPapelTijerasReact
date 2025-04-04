import type React from "react";
import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Box, Button, Typography } from "@mui/material";

interface CameraComponentProps {
  onPhotoCapture: (imageSrc: string) => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ onPhotoCapture }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        onPhotoCapture(imageSrc);
      }
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <Typography variant="body1" marginTop={2}>
        O usa la cámara:
      </Typography>

      {isCameraOn && (
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/png"
          style={{ width: "100%", maxWidth: "320px", marginTop: "12px", marginBottom: "12px" }}
        />
      )}

      <Box display="flex" gap={2} marginTop={2}>
        <Button variant="contained" onClick={() => setIsCameraOn(true)} disabled={isCameraOn}>
          Iniciar Cámara
        </Button>
        <Button variant="outlined" onClick={() => setIsCameraOn(false)} disabled={!isCameraOn}>
          Parar Cámara
        </Button>
      </Box>

      {isCameraOn && (
        <Button onClick={capturePhoto} variant="outlined" sx={{ marginTop: 1 }}>
          Tomar Foto
        </Button>
      )}
    </Box>
  );
};

export default CameraComponent;