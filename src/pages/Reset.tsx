// Import necessary modules and components from Material-UI
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { reset } from "../actions/users";
import {
  Grid,
  Box,
  Typography,
  Button,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
  FormControl,
  FormHelperText,
  Paper,
} from "@mui/material";

// Initial state for the form fields and error messages
const initialState = { password: "", confirmPassword: "" };
const initialErrorState = { password: false, confirmPassword: false };

// Reset component
const Reset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to manage form data and errors
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(initialErrorState);
  const [showPassword, setShowPassword] = useState(false);

  // Get the token parameter from the URL
  const { token } = useParams();

  // Function to handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Validate password format and match
    if (
      !formData.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i) ||
      formData.confirmPassword !== formData.password
    ) {
      setError({
        password: !formData.password.match(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i
        ),
        confirmPassword: formData.confirmPassword !== formData.password,
      });
    } else {
      dispatch(reset({ password: formData?.password, token: token }, navigate));
    }
  };

  // Function to toggle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Function to prevent default behavior of mouse down event
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  // Function to handle changes in form fields
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: false });
  };

  // Render the Reset component
  return token ? (
    // Display reset password form
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
      component="form"
      noValidate
      onSubmit={handleSubmit}
    >
      <Paper
        elevation={10}
        sx={{
          maxWidth: "sm",
          borderRadius: 4,
          mt: 4,
          p: 3,
          "@media only screen and (max-width: 600px)": { p: 1 },
        }}
      >
        <Grid container>
          <Grid pt={2} item xs={12}>
            <Typography textAlign="center" variant="h4">
              Enter new password
            </Typography>
          </Grid>
          {/* Password input field */}
          <Grid pt={2} item xs={12}>
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
          {/* Confirm password input field */}
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
          {/* Submit button */}
          <Grid pt={2} item xs={12}>
            <Button
              className="button-submit"
              variant="contained"
              type="submit"
              fullWidth
            >
              <Typography fontWeight={600}>Submit</Typography>
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  ) : (
    // Display message if no token
    <Box
      height={600}
      display={"flex"}
      flexWrap={"wrap"}
      justifyContent={"center"}
      alignContent={"center"}
    >
      <Paper>
        <Typography>
          Please check the reset password email in your mailbox.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Reset;
