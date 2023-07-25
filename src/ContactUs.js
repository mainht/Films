import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

export const ContactUs = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      program: 0,
      message: "",
      agree: false,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(formik.values));
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
      email: Yup.string().required("Required.").email("Invalid email"),
      phone: Yup.number().integer().typeError("Please enter a valid number"),
      program: Yup.number().integer().typeError("Please select a program."),
      message: Yup.string()
        .required("Required.")
        .min(10, "Must be 10 characters or more"),
      agree: Yup.boolean().oneOf(
        [true],
        "The terms and conditions must be accepted."
      ),
    }),
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding="3%"
      sx={{
        "& .MuiTextField-root": { width: "40ch" },
        width: "100%",
      }}
    >
      <Paper elevation={3} sx={{ p: 3, width: 500 }}>
        <form onSubmit={formik.handleSubmit}>
          <Box
            marginBottom="1rem"
            marginTop="2rem"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextField
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name && (
              <Alert severity="error" sx={{ width: "80%" }}>
                {formik.errors.name}
              </Alert>
            )}
          </Box>
          <Box
            marginBottom="1rem"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextField
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email && (
              <Alert severity="error" sx={{ width: "80%" }}>
                {formik.errors.email}
              </Alert>
            )}
          </Box>
          <Box
            marginBottom="1rem"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextField
              label="Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.errors.phone && (
              <Typography variant="caption" color="red">
                {formik.errors.phone}
              </Typography>
            )}
          </Box>
          <Box
            marginBottom="1rem"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <FormControl sx={{ minWidth: 355 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Program of Study
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                label="Program of Stydy"
                name="program"
                value={formik.values.program}
                onChange={formik.handleChange}
              >
                <MenuItem value={0}>
                  <em>Please select</em>
                </MenuItem>
                <MenuItem value={1}>Software Engineering</MenuItem>
                <MenuItem value={2}>Information System</MenuItem>
                <MenuItem value={3}>Information Assurance</MenuItem>
                <MenuItem value={4}>Internet of Things</MenuItem>
                <MenuItem value={5}>Artificial Intelligence</MenuItem>
                <MenuItem value={6}>Digital Art & Design</MenuItem>
              </Select>
              {formik.errors.program && (
                <Typography variant="caption" color="red">
                  {formik.errors.program}
                </Typography>
              )}
            </FormControl>
          </Box>
          <Box
            marginBottom="1rem"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextField
              id="outlined-multiline-static"
              label="Message"
              multiline
              name="message"
              rows={4}
              value={formik.values.message}
              onChange={formik.handleChange}
            />
            {formik.errors.message && (
              <Alert severity="error" sx={{ width: "80%" }}>
                {formik.errors.message}
              </Alert>
            )}
          </Box>

          <FormControlLabel
            sx={{
              justifyContent: "center",
              display: "flex",
            }}
            control={<Switch />}
            label="Agree to terms and conditions."
            name="agree"
            value={formik.values.agree}
            onClick={formik.handleChange}
          />
          {formik.errors.agree && (
            <Alert severity="error" sx={{ marginLeft: "10%", width: "80%" }}>
              {formik.errors.agree}
            </Alert>
          )}
          <Box
            marginBottom="1rem"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              type="submit"
              sx={{
                mt: "3%",
                width: "50%",
              }}
            >
              Send
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
