import type React from "react";
import FormFields from "../components/Form/FormFields";

interface ProfileFormProps {
  onStartGame: (name: string, photo: string) => void;
  localData: any;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  onStartGame,
  localData,
}) => {
  console.log(localData());
  return (
    <FormFields
      onStartGame={onStartGame}
    />
  );
};

export default ProfileForm;
