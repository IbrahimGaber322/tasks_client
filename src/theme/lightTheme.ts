// Import necessary function from MUI for creating themes
import { createTheme } from "@mui/material/styles";

// Create a customized MUI theme
const theme = createTheme({
  palette: {
    mode: "light", // Set the theme mode to light
    primary: {
      main: "#000000", // Main primary color
      contrastText: "#FFFFFF", // Contrast text color for primary elements
    },
    secondary: {
      main: "#000000", // Main secondary color
      contrastText: "#FFFFFF", // Contrast text color for secondary elements
    },
    background: {
      default: "#f0f0f0", // Default background color
      paper: "#f0f0f0", // Background color for paper elements
    },
    success: {
      main: "#67be23", // Success color
      contrastText: "#fff", // Contrast text color for success elements
    },
    error: {
      main: "#fa541c", // Error color
      contrastText: "#fff", // Contrast text color for error elements
    },
    warning: {
      main: "#fa8c16", // Warning color
      contrastText: "#fff", // Contrast text color for warning elements
    },
    info: {
      main: "#0b82f0", // Info color
      contrastText: "#fff", // Contrast text color for info elements
    },
    divider: "rgba(0,0,0,0)", // Divider color
    text: {
      primary: "#292929", // Primary text color
      secondary: "#626262", // Secondary text color
      disabled: "#c1c1c1", // Disabled text color
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
