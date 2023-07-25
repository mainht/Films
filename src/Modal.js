import React, { useState, useEffect } from "react";
import { Button, Box, Modal, Typography, useTheme } from "@mui/material";
import "./Modal.css";

export const CustomModal = ({ filmId }) => {
  const [open, setOpen] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilmClick = () => {
    handleOpen();
  };

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await fetch(`https://64ac34619edb4181202f46db.mockapi.io/films/${filmId}`);
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        const filmData = await response.json();
        setSelectedFilm(filmData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilm();
  }, [filmId]);

  return (
    <>
      <Button onClick={handleFilmClick}>Detail</Button>

      <Modal open={open} onClose={handleClose} className="custom-modal">
        <Box
          className="custom-modal-content"
          sx={{
            backgroundColor: isDarkMode ? "#000000" : "#ffffff",
            color: isDarkMode ? "#ffffff" : "inherit",
            p: 2,
          }}
        >
          {selectedFilm && (
            <div className="film-card" key={selectedFilm.id}>
              <div className="video-container">
                <iframe
                  title="Movie Video"
                  width="100%"
                  height="315"
                  src={selectedFilm.videoURL}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
              <Typography variant="h5">{selectedFilm.title}</Typography>
              <Typography variant="body1">{selectedFilm.details}</Typography>
              <Typography variant="body1">Year: {selectedFilm.year}</Typography>
              <Typography variant="body1">
                Nation: {selectedFilm.nation}
              </Typography>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};
