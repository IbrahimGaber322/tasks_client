import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "./theme/darkTheme";
import lightTheme from "./theme/lightTheme";
import MaterialUISwitch from "./components/MaterialUISwitch";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import "./App.css";
import Home from "./pages/Home";
import Confirm from "./pages/Confirm";
import Forget from "./pages/Forget";
import Reset from "./pages/Reset";
import TaskDetails from "./pages/TaskDetails";
import { useSelector } from "react-redux";

/**
 * Main application component that handles routing and theme switching.
 */
function App() {
  // Retrieve dark mode state from local storage or set to default.
  const darkState =
    localStorage.getItem("dark") !== null
      ? JSON.parse(localStorage.getItem("dark") as string)
      : false;

  // State to manage task sorting.
  const [sort, setSort] = useState("createdAt");

  // Fetch user data from Redux state.
  const user = useSelector((state: any) => state.user);

  // State to manage dark mode.
  const [dark, setDark] = useState(darkState);

  // Store dark mode preference in local storage.
  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(dark));
  }, [dark]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={dark ? darkTheme : lightTheme}>
        <CssBaseline enableColorScheme />

        {/* Main container */}
        <Container
          sx={{ minHeight: "100vh", position: "relative" }}
          maxWidth={false}
          disableGutters
        >
          {/* Routing configuration */}
          <Routes>
            <Route
              path="/sign-in"
              element={user.token ? <Navigate to="/?page=1" /> : <SignIn />}
            />
            <Route
              path="/sign-up"
              element={user.token ? <Navigate to="/?page=1" /> : <SignUp />}
            />
            <Route
              path="/confirm/:token"
              element={
                user.confirmed ? <Navigate to="/?page=1" /> : <Confirm />
              }
            />
            <Route
              path="/confirm"
              element={
                user.confirmed ? <Navigate to="/?page=1" /> : <Confirm />
              }
            />
            <Route
              path="/tasks/:id"
              element={<TaskDetails sort={sort} setSort={setSort} />}
            />
            <Route path="/forget" element={!user.token && <Forget />} />
            <Route path="/reset/:token" element={!user.token && <Reset />} />
            <Route path="/reset" element={!user.token && <Reset />} />
            <Route
              path="/search"
              element={
                user.token ? (
                  <Home setSort={setSort} sort={sort} />
                ) : (
                  <Navigate to="/sign-in" />
                )
              }
            />
            <Route
              path="/"
              element={
                user.token ? (
                  <Home setSort={setSort} sort={sort} />
                ) : (
                  <Navigate to="/sign-in" />
                )
              }
            />
          </Routes>

          {/* Dark mode switch */}
          <MaterialUISwitch
            sx={{ position: "absolute", bottom: 0, right: 0, m: 1 }}
            checked={dark}
            onChange={(e: any) => {
              setDark(e.target.checked);
            }}
          />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
