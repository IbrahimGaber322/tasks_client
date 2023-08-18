// Import necessary modules and components from Material-UI
import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { confirm, sendConfirm, signOut } from "../actions/users";

// Confirm component
const Confirm = () => {
  // Get user data from Redux state
  const user = useSelector((state: any) => state.user);
  const currentToken = user?.token;

  // State to manage whether confirmation email is sent
  const [sent, setSent] = useState(false);

  const navigate = useNavigate();
  const { token } = useParams();
  const dispatch = useDispatch();

  // Handle click to confirm email
  const handleClick = () => {
    dispatch(confirm(token, navigate));
  };

  // Handle click to resend activation email
  const handleClick2 = () => {
    dispatch(sendConfirm({ token: currentToken }, setSent));
  };

  // Handle click to sign out
  const handleClick3 = () => {
    dispatch(signOut(navigate));
  };

  // Dispatch confirmation action if token is available
  useEffect(() => {
    if (token) {
      dispatch(confirm(token, navigate));
    }
  }, [dispatch, token, navigate]);

  return token ? (
    // Display for confirmation link click
    <Box
      height={600}
      display={"flex"}
      flexWrap={"wrap"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Paper>
        <Typography>You will be redirected automatically, if not:</Typography>
        <Button onClick={handleClick}>Click here to confirm email</Button>
      </Paper>
    </Box>
  ) : (
    // Display for confirmed user
    <Box
      height={600}
      display={"flex"}
      flexWrap={"wrap"}
      justifyContent={"center"}
      flexDirection="column"
      alignItems={"center"}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography textAlign="center">
          Welcome back {user?.firstName + " " + user?.lastName},
        </Typography>
        {sent && (
          <Typography textAlign="center">
            Confirmation sent email successfully.
          </Typography>
        )}
        <Typography>
          Please check the confirmation email in your mailbox.
        </Typography>
        {!sent && (
          <Button sx={{ mx: "auto" }} onClick={handleClick2}>
            Resend Activation Email
          </Button>
        )}
        <Button onClick={handleClick3}>Not you? Sign Out</Button>
      </Paper>
    </Box>
  );
};

export default Confirm;
