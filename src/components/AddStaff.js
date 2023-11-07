
import { useFormik } from "formik";
import * as Yup from 'yup';
import {TextField,Button} from "@mui/material";
import * as React from 'react';
import Stack from "@mui/material/Stack";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import DialogActions from "@mui/material/DialogActions";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AddStaff() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const postStaffUrl = 'https://65459188fe036a2fa9546e5b.mockapi.io/api/v1/students';

  const formik = useFormik({
    initialValues: {
      name: '',
      dateofbirth: '',
      gender: true, 
      class: '',
      image: '',
      feedback: '',
    },
    onSubmit: (values) => {
      axios.post(postStaffUrl, values)
        .then((response) => {
          return response.data;
        })
        .then((data) => setOpen(true))
        .catch((error) => console.log(error.message));
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required.').min(3, 'Must be at least 3 characters'),
      dateofbirth: Yup.string().required('Required'),
      gender: Yup.boolean().required('Required'),
      class: Yup.string().required('Required'),
      image: Yup.string().url('Please enter a valid URL').required('Required'),
      feedback: Yup.string().required('Required'),
    }),
  });

  return (
    <div>
      <h1 className="font-pages">Add new student</h1>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && <Typography variant="caption" color="red">{formik.errors.name}</Typography>}
          <TextField
            label="Date of Birth"
            name="dateofbirth"
            value={formik.values.dateofbirth}
            onChange={formik.handleChange}
          />
          {formik.errors.dateofbirth && <Typography variant="caption" color="red">{formik.errors.dateofbirth}</Typography>}
          <TextField
            label="Gender (Check the box if it is male)"
            name="gender"
            type="checkbox"
            value={formik.values.gender}
            onChange={formik.handleChange}
          />
          {formik.errors.gender && <Typography variant="caption" color="red">{formik.errors.gender}</Typography>}
          <TextField
            label="Class"
            name="class"
            value={formik.values.class}
            onChange={formik.handleChange}
          />
          {formik.errors.class && <Typography variant="caption" color="red">{formik.errors.class}</Typography>}
          <TextField
            label="Image URL"
            name="image"
            value={formik.values.image}
            onChange={formik.handleChange}
          />
          {formik.errors.image && <Typography variant="caption" color="red">{formik.errors.image}</Typography>}
          <TextField
            label="Feedback"
            name="feedback"
            value={formik.values.feedback}
            onChange={formik.handleChange}
          />
          {formik.errors.feedback && <Typography variant="caption" color="red">{formik.errors.feedback}</Typography>}
        </Stack>
        <Button variant="contained" size="small" type="submit">
          Save
        </Button>
      </form>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Congratulation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert severity="success">
              <AlertTitle>Adding successful!</AlertTitle>
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