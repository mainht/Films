import { Alert, Snackbar } from "@mui/material";
import React from "react";

const DeleteFilms = (id, setData) => {
  const url = `https://64ac34619edb4181202f46db.mockapi.io/films/${id}`;

  fetch(url, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        setData((prevState) => prevState.filter((film) => film.id !== id));
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default DeleteFilms;
