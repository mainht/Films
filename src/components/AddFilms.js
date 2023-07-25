import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  TextField,
  Button,
  Dialog,
  DialogContent,
  Snackbar,
  DialogTitle,
} from "@mui/material";

const AddFilms = ({ open, handleClose }) => {
  const baseUrl = "https://64ac34619edb4181202f46db.mockapi.io/films";
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      img: "",
      title: "",
      year: "",
      nation: "",
      details: "",
      videoURL: "",
    },

    onSubmit: (values) => {
      fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          handleClose();
          setSnackbarOpen(true);
        })
        .catch((error) => console.log(error.message));
    },
    validationSchema: Yup.object({
      img: Yup.string().required("Required."),
      title: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
      year: Yup.number().integer().typeError("Please type a number."),
      nation: Yup.string().required("Required."),
      details: Yup.string()
        .required("Required.")
        .min(50, "Must be more 50 characters or more"),
      videoURL: Yup.string().required("Required."),
    }),
  });
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Film</DialogTitle>
        <DialogContent sx={{width: 500}}>
          <form onSubmit={formik.handleSubmit}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
            <TextField
              id="standard-basic"
              variant="standard"
              autoFocus
              name="img"
              label="Image"
              type="text"
              value={formik.values.img}
              onChange={formik.handleChange}
            />
            {formik.errors.img && (
              <Alert severity="error" sx={{ width: "100%" }}>
                {formik.errors.img}
              </Alert>
            )}
            <TextField
              id="standard-basic"
              variant="standard"
              margin="dense"
              name="title"
              label="Title"
              type="text"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.errors.title && (
              <Alert severity="error" sx={{ width: "100%" }}>
                {formik.errors.title}
              </Alert>
            )}
            <TextField
              id="standard-basic"
              variant="standard"
              margin="dense"
              name="year"
              label="Year"
              type="text"
              value={formik.values.year}
              onChange={formik.handleChange}
            />
            {formik.errors.year && (
              <Alert severity="error" sx={{ width: "100%" }}>
                {formik.errors.year}
              </Alert>
            )}
            <TextField
              id="standard-basic"
              variant="standard"
              margin="dense"
              name="nation"
              label="Nation"
              value={formik.values.nation}
              onChange={formik.handleChange}
            />
            {formik.errors.nation && (
              <Alert severity="error" sx={{ width: "100%" }}>
                {formik.errors.nation}
              </Alert>
            )}
            <TextField
              id="standard-basic"
              variant="standard"
              margin="dense"
              name="details"
              label="Detail"
              multiline
              rows={4}
              value={formik.values.details}
              onChange={formik.handleChange}
            />
            {formik.errors.details && (
              <Alert severity="error" sx={{ width: "100%" }}>
                {formik.errors.details}
              </Alert>
            )}
            <TextField
              id="standard-basic"
              variant="standard"
              margin="dense"
              name="videoURL"
              label="Video"
              value={formik.values.videoURL}
              onChange={formik.handleChange}
            />
            {formik.errors.videoURL && (
              <Alert severity="error" sx={{ width: "100%" }}>
                {formik.errors.videoURL}
              </Alert>
            )}
            <Button variant="contained" size="small" type="submit" sx={{marginTop: "5%"}}>
              Add
            </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          Added successfully
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddFilms;
