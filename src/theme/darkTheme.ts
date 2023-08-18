// Import necessary function from MUI for creating themes
import { createTheme } from "@mui/material/styles";

// Create a customized MUI dark theme
const theme = createTheme({
  palette: {
    mode: "dark", // Set the theme mode to dark
    primary: {
      main: "#FFFFFF", // Main primary color
      contrastText: "#000000", // Contrast text color for primary elements
    },
    secondary: {
      main: "#000000", // Main secondary color
      contrastText: "#FFFFFF", // Contrast text color for secondary elements
    },
    background: {
      default: "#212121", // Default background color
      paper: "#242424", // Background color for paper elements
    },
    success: {
      main: "#67be23", // Success color
      contrastText: "#fff", // Contrast text color for success elements
    },
    error: {
      main: "#ee2a1e", // Error color
      contrastText: "#fff", // Contrast text color for error elements
    },
    warning: {
      main: "#fa8c16", // Warning color
      contrastText: "#fff", // Contrast text color for warning elements
    },
    info: {
      main: "#1890ff", // Info color
      contrastText: "#fff", // Contrast text color for info elements
    },
    divider: "rgba(0,0,0,0)", // Divider color
    text: {
      primary: "#fff", // Primary text color
      secondary: "rgba(255,255,255,0.7)", // Secondary text color
      disabled: "#d1d1d1", // Disabled text color
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","), // Set the font family for typography
  },
});

// Export the customized theme
export default theme;
