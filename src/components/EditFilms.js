import { useState, useEffect } from "react";
import {
  Dialog,
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
} from "@mui/material";

const EditFilms = ({ film, open, handleClose }) => {
  const [updatedFilm, setUpdatedFilm] = useState(film);

  // This effect runs when the 'film' prop changes
  useEffect(() => {
    setUpdatedFilm(film);
  }, [film]);

  const handleInputChange = (event) => {
    setUpdatedFilm({
      ...updatedFilm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    const url = `https://64ac34619edb4181202f46db.mockapi.io/films/${film.id}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFilm),
    })
      .then((response) => response.json())
      .then((data) => {
        handleClose();
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Film</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <form>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                id="standard-basic"
                variant="standard"
                margin="dense"
                name="title"
                label="Title"
                value={updatedFilm ? updatedFilm.title : ""}
                onChange={handleInputChange}
                sx={{ marginBottom: "5%" }}
              />
              <TextField
                id="standard-basic"
                variant="standard"
                margin="dense"
                name="year"
                label="Year"
                value={updatedFilm ? updatedFilm.year : ""}
                onChange={handleInputChange}
                sx={{ marginBottom: "5%" }}
              />
              <TextField
                id="standard-basic"
                variant="standard"
                margin="dense"
                name="nation"
                label="Nation"
                value={updatedFilm ? updatedFilm.nation : ""}
                onChange={handleInputChange}
                sx={{ marginBottom: "5%" }}
              />
              <TextField
                id="standard-basic"
                variant="standard"
                margin="dense"
                name="details"
                label="Detail"
                multiline
                rows={4}
                value={updatedFilm ? updatedFilm.details : ""}
                onChange={handleInputChange}
                sx={{ marginBottom: "5%" }}
              />
              <Button
                sx={{ paddingLeft: 0, marginRight: 5, paddingRight: 9 }}
                onClick={handleSubmit}
              >
                Update
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Edited successfully
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditFilms;
