import { useFormik } from "formik";
import * as Yup from 'yup';
import { TextField, Button, Checkbox } from "@mui/material";
import * as React from 'react';
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import DialogActions from "@mui/material/DialogActions";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateStaff() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [staffData, setStaffData] = useState({
    name: "",
    dateofbirth: "",
    gender: true, // Default to female
    class: "",
    image: "",
    feedback: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const getStaffUrl = `https://65459188fe036a2fa9546e5b.mockapi.io/api/v1/students/${id}`;

  useEffect(() => {
    axios.get(getStaffUrl)
      .then((response) => {
        setStaffData(response.data);
      })
      .catch((error) => console.log(error.message));
  }, [getStaffUrl]);

  const updateStaffUrl = `https://65459188fe036a2fa9546e5b.mockapi.io/api/v1/students/${id}`;

  const formik = useFormik({
    initialValues: staffData,
    onSubmit: (values) => {
      axios.put(updateStaffUrl, values)
        .then((response) => {
          return response.data;
        })
        .then((data) => setOpen(true))
        .catch((error) => console.log(error.message));
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required').min(3, 'Must be at least 3 characters'),
      dateofbirth: Yup.string().required('Required'),
      class: Yup.string().required('Required'),
      image: Yup.string().url('Please enter a valid URL').required('Required'),
      feedback: Yup.string().required('Required'),
    }),
  });

  return (
    <div>
      <h1 className="font-pages">Update Staff Information</h1>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && <Typography variant="caption" color="error">{formik.errors.name}</Typography>}
          <TextField
            label="Date of Birth"
            name="dateofbirth"
            value={formik.values.dateofbirth}
            onChange={formik.handleChange}
          />
          {formik.errors.dateofbirth && <Typography variant="caption" color="error">{formik.errors.dateofbirth}</Typography>}
          <TextField
            label="Gender (Check the box if it is male)"
            name="gender"
            type="checkbox"
            value={formik.values.gender}
            onChange={formik.handleChange}
          />
          <TextField
            label="Class"
            name="class"
            value={formik.values.class}
            onChange={formik.handleChange}
          />
          {formik.errors.class && <Typography variant="caption" color="error">{formik.errors.class}</Typography>}
          <TextField
            label="Image URL"
            name="image"
            value={formik.values.image}
            onChange={formik.handleChange}
          />
          {formik.errors.image && <Typography variant="caption" color="error">{formik.errors.image}</Typography>}
          <TextField
            label="Feedback"
            name="feedback"
            value={formik.values.feedback}
            onChange={formik.handleChange}
          />
          {formik.errors.feedback && <Typography variant="caption" color="error">{formik.errors.feedback}</Typography>}
        </Stack>
        <Button variant="contained" size="small" type="submit">
          Update
        </Button>
      </form>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Success</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert severity="success">
              <AlertTitle>Update successful!</AlertTitle>
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button>
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              Dashboard
            </Link>
          </Button>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
