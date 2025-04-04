import { Avatar, Typography } from "@mui/material";

interface PlayerInfoProps {
  name: string;
  photo: string;
}

export const PlayerInfo: React.FC<PlayerInfoProps> = ({ name, photo }) => (
  <>
    <Avatar alt={name} src={photo} sx={{ width: 100, height: 100, marginBottom: 2 }} />
    <Typography variant="h5" textAlign="center" marginBottom={2}>
      {name}
    </Typography>
  </>
);