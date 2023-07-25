import React from "react";
import { ListFilms } from "./shared/ListOfFilms";
import "./Films.css";
import Container from "@mui/material/Container";
import { CustomModal } from "./Modal";

export default function FilmsPresentation() {
  return (
    <Container fixed>
      <div className="film-grid">
        {ListFilms.map((film) => (
          <div className="film-card" key={film.id}>
            <img src={film.img} alt={film.title} className="film-image" />
            <div className="film-details">
              <CustomModal filmId={film.id} />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
