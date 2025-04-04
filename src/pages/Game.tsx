import React, { useState, useRef } from "react";
import { Button, Box, Typography, Avatar, TextField } from "@mui/material";
import { toast } from "react-toastify";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import Webcam from "react-webcam"; // Importamos la cámara

interface GameProps {
  playerName: string;
  playerPhoto: string;
  onReset: () => void;
  onUpdatePlayer: (newName: string, newPhoto: string) => void; // Función para actualizar el nombre y foto
}

const Game: React.FC<GameProps> = ({
  playerName,
  playerPhoto,
  onReset,
  onUpdatePlayer,
}) => {
  const choices = ["Piedra", "Papel", "Tijera"];
  const [playerChoice, setPlayerChoice] = useState("");
  const [opponentChoice, setOpponentChoice] = useState("");

  // Resultados de las partidas
  const [result, setResult] = useState("");
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [ties, setTies] = useState(0);
  const [victoryPercen, setVictoryPercen] = useState(0);

  // Edición del perfil
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(playerName);
  const [newPhoto, setNewPhoto] = useState(playerPhoto);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  // Función para determinar el ganador del juego
  const determineWinner = (player: string, opponent: string) => {
    if (player === opponent) return "Empate";
    if (
      (player === "Piedra" && opponent === "Tijera") ||
      (player === "Papel" && opponent === "Piedra") ||
      (player === "Tijera" && opponent === "Papel")
    ) {
      return "Ganaste";
    }
    return "Perdiste";
  };

  // Función para manejar la elección del jugador
  const handleChoice = (choice: string) => {
    setPlayerChoice(choice);
    const opponent = choices[Math.floor(Math.random() * choices.length)];
    setOpponentChoice(opponent);
    const gameResult = determineWinner(choice, opponent);
    setResult(gameResult);

    // Actualizar el contador de victorias, derrotas y empates
    if (gameResult === "Ganaste") setWins((prev) => prev + 1);
    if (gameResult === "Perdiste") setLosses((prev) => prev + 1);
    if (gameResult === "Empate") setTies((prev) => prev + 1);

    // Calcular el porcentaje de victorias
    const totalGames = wins + losses + ties + 1;
    const percentage = ((wins / totalGames) * 100).toFixed(2);
    setVictoryPercen(Number(percentage));

    // Notificación del resultado
    toast(
      gameResult === "Empate"
        ? "😐 ¡Es un empate!"
        : gameResult === "Ganaste"
        ? "🏆 ¡Has ganado!"
        : "💀 Perdiste...",
      {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: () => (
          <span>
            {gameResult === "Ganaste"
              ? "🔥"
              : gameResult === "Empate"
              ? "🤝"
              : "☠️"}
          </span>
        ),
        style: {
          background:
            gameResult === "Ganaste"
              ? "#28a745"
              : gameResult === "Empate"
              ? "#ffc107"
              : "#dc3545",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
          borderRadius: "8px",
          textAlign: "center",
        },
      }
    );
  };
  //Toast para mostrar que se ha actualizado el perfil exitosamente
  const showProfileUpdatedToast = () => {
    toast("🎉 ¡Perfil actualizado exitosamente!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      icon: () => <span>✨</span>,
      style: {
        background: "#28a745", // Verde para éxito
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
        borderRadius: "8px",
        textAlign: "center",
      },
    });
  };
  // Función para resetear el marcador
  const handleResetScoreboard = () => {
    setWins(0);
    setLosses(0);
    setTies(0);
    setVictoryPercen(0);
  };

  // Función para manejar los cambios en el nombre y foto del jugador
  const handleSaveChanges = () => {
    if (newName.trim() !== "") {
      onUpdatePlayer(newName, newPhoto); // Actualiza el nombre y la foto en el componente padre
      setEditMode(false); // Salir del modo de edición
    }
  };

  // Función para cargar una imagen desde el dispositivo
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setNewPhoto(reader.result as string); // Establece la foto para el nuevo perfil
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para capturar una foto desde la cámara
  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImagePreview(imageSrc);
    }
  };

  return (
    <Box display="flex" justifyContent="center" padding={3}>
      {/* Columna izquierda: Juego */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding={3}
        borderRight={1}
        borderColor="grey.300"
      >
        <Avatar
          alt={playerName}
          src={imagePreview || playerPhoto}
          sx={{ width: 100, height: 100, marginBottom: 2 }}
        />
        <Typography
          variant="h5"
          textAlign="center"
          minWidth="100px"
          marginBottom={2}
        >
          {playerName}
        </Typography>

        <Button
          variant="outlined"
          size="small"
          sx={{ mb: 3 }}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Cancelar edición" : "Editar jugador"}
        </Button>

        {editMode && (
          <Box
            mt={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nuevo nombre"
            />

            <input type="file" accept="image/*" onChange={handleImageChange} />
            <Button
              variant="contained"
              onClick={() => setIsCameraOn(true)}
              color="success"
              sx={{ marginTop: 1 }}
            >
              Iniciar Cámara
            </Button>
            <Button
              variant="outlined"
              onClick={() => setIsCameraOn(false)}
              color="error"
              sx={{ marginTop: 1 }}
            >
              Parar Cámara
            </Button>
            {isCameraOn && (
              <>
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/png"
                  className="w-64 h-48 border"
                />
                <Button
                  variant="outlined"
                  onClick={capturePhoto}
                  sx={{ marginTop: 1 }}
                >
                  Tomar Foto
                </Button>
              </>
            )}

            <Button
              variant="contained"
              size="small"
              onClick={() => {
                handleSaveChanges();
                setIsCameraOn(false);
                setEditMode(false);
                showProfileUpdatedToast();
              }}
              sx={{ marginTop: 2, mb: 3 }}
            >
              Guardar cambios
            </Button>
          </Box>
        )}

        <Box
          display="flex"
          justifyContent="space-between"
          gap={2}
          marginBottom={2}
        >
          {choices.map((choice) => (
            <Button
              key={choice}
              variant="contained"
              onClick={() => handleChoice(choice)}
            >
              {choice}
            </Button>
          ))}
        </Box>

        <Typography variant="h6" marginBottom={2}>
          Elegiste: {playerChoice}
        </Typography>
        <Typography variant="h6" marginBottom={2}>
          La máquina eligió: {opponentChoice}
        </Typography>
        <Typography variant="h6">{result}</Typography>

        <Button variant="outlined" onClick={onReset} sx={{ marginTop: 3 }}>
          Jugar otra vez
        </Button>
      </Box>

      {/* Columna derecha: Contador */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding={3}
        width="300px"
      >
        <Typography
          variant="h5"
          marginBottom={2}
          minWidth="200px"
          textAlign="center"
          sx={{
            backgroundColor: "#ff0606",
            padding: "8px",
            borderRadius: "8px",
          }}
        >
          ⚔ Marcador ⚔
        </Typography>

        {/* Contador del jugador con avatar y número alineados en la misma línea */}
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start"
          gap={1}
          sx={{ width: "100%" }}
        >
          <Avatar
            alt={playerName}
            src={playerPhoto}
            sx={{ width: 30, height: 30 }}
          />
          <Typography
            variant="h6"
            textAlign="left"
            sx={{
              width: "auto",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {playerName}
          </Typography>
        </Box>

        <Typography variant="h6">Victorias: {wins}</Typography>
        <Typography variant="h6">Derrotas: {losses}</Typography>
        <Typography variant="h6">Empates: {ties}</Typography>
        <Typography variant="h6">
          Porcentaje de victorias: {victoryPercen}%
        </Typography>

        <Button
          variant="contained"
          onClick={handleResetScoreboard}
          sx={{ marginTop: 3 }}
        >
          Restablecer marcador
        </Button>
      </Box>
    </Box>
  );
};

export default Game;
