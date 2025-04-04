import type React from "react";
import { useState } from "react";
import { Avatar, Box } from "@mui/material";

interface AvatarUploadProps {
  onPhotoSelected: (photo: string) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ onPhotoSelected }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setImagePreview(imageData);
        onPhotoSelected(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <Avatar alt="Perfil" src={imagePreview || undefined} sx={{ width: 100, height: 100, marginBottom: 2 }} />
      <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginBottom: "12px" }} />
    </Box>
  );
};

export default AvatarUpload;