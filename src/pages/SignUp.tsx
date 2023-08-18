// Importing necessary components and styles from MUI and React
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import { signUp } from "../actions/users";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Function for displaying copyright information
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Tasks
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// Initial state for the form
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
};

// Initial state for error handling
const initialErrorState = {
  firstName: false,
  lastName: false,
  email: false,
  password: false,
  confirmPassword: false,
};

// Component for user registration (sign up)
export default function SignUp() {
  // Redux dispatch and navigation hook
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State management
  const [formData, setFormData] = React.useState(initialState);
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState(initialErrorState);

  // Toggles password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  // Handles input change in the form fields
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      name: `${formData.firstName} ${formData.lastName}`,
    });
    setError({ ...error, [e.target.name]: false });
  };

  // Handles form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validation checks for form fields
    if (
      formData.firstName.length === 0 ||
      formData.lastName.length === 0 ||
      !formData.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) ||
      !formData.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i) ||
      formData.confirmPassword !== formData.password
    ) {
      setError({
        firstName: formData.firstName.length === 0,
        lastName: formData.lastName.length === 0,
        email: !formData.email.match(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        ),
        password: !formData.password.match(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i
        ),
        confirmPassword: formData.confirmPassword !== formData.password,
      });
    } else {
      // Dispatches sign-up action if form data is valid
      dispatch(signUp(formData, navigate));
    }
  };

  // JSX code for rendering the sign-up form
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                helperText={
                  error.firstName ? "Please enter your first name." : false
                }
                value={formData.firstName}
                inputProps={{ maxLength: 20 }}
                error={error.firstName}
                onChange={handleChange}
              />
            </Grid>
            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                inputProps={{ maxLength: 20 }}
                helperText={
                  error.lastName ? "Please enter your last name." : false
                }
                error={error.lastName}
                onChange={handleChange}
              />
            </Grid>
            {/* Hidden field for full name */}
            <TextField
              name="name"
              value={`${formData.firstName} ${formData.lastName}`}
              sx={{ display: "none" }}
            />
            {/* Email */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                value={formData.email}
                error={error.email}
                helperText={
                  error.email ? "Please enter your email correctly." : false
                }
                onChange={handleChange}
              />
            </Grid>
            {/* Password */}
            <Grid item xs={12}>
              <FormControl
                error={error.password}
                required
                fullWidth
                variant="outlined"
              >
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  name="password"
                  value={formData.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                <FormHelperText>
                  {error.password
                    ? "Password must be at least 8 chars long and contain a number."
                    : false}
                </FormHelperText>
              </FormControl>
            </Grid>
            {/* Confirm Password */}
            <Grid pt={2} item xs={12}>
              <FormControl
                error={error.confirmPassword}
                required
                fullWidth
                variant="outlined"
              >
                <InputLabel>Confirm Password</InputLabel>
                <OutlinedInput
                  type="password"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  name="confirmPassword"
                  label="Confirm Password"
                />
                <FormHelperText>
                  {error.confirmPassword ? "Passwords don't match." : false}
                </FormHelperText>
              </FormControl>
            </Grid>
            {/* Checkbox */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          {/* Sign-up Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          {/* Link to Sign In */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* Copyright Information */}
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
