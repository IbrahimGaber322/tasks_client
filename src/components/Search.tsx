import { useState } from "react";
import {
  Button,
  TextField,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import { MuiChipsInput } from "mui-chips-input";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";

function Search({
  showSearch,
  setShowSearch,
}: {
  showSearch: boolean;
  setShowSearch: Function;
}) {
  // Get the navigation function from react-router-dom
  const navigate = useNavigate();

  // State for search query and tags
  const [search, setSearch] = useState("");
  const [chips, setChips] = useState([]);
  const [chipInput, setChipInput] = useState("");
  const page = 1; // Page number for search results pagination

  // Function to trigger the search action
  const searchTasks = () => {
    const searchQuery = search?.trim() || null;
    const searchTags = chips?.join(",") || null;

    // Navigate to search results page with appropriate query parameters
    if (searchQuery || searchTags) {
      navigate(
        `/search?searchQuery=${searchQuery}&searchTags=${searchTags}&page=${page}`
      );
    } else {
      navigate("/?page=1"); // Navigate to default page when no search parameters
    }
  };

  // Update chip values when user selects or deletes chips
  const handleChange = (newChips: any) => {
    setChips(newChips);
    setChipInput("");
  };

  // Update chip input value as user types
  const handleChipInput = (e: any) => {
    setChipInput(e.target.value);
  };

  // Handle key press events, such as pressing Enter in the input
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      searchTasks(); // Trigger search when Enter is pressed
    }
  };

  // Handle cancellation of search and reset input values
  const handleCancel = () => {
    setShowSearch(false);
    setSearch("");
    setChipInput("");
    navigate("/?page=1"); // Navigate to default page when canceling search
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" ml={4}>
      {!showSearch && (
        // Display the "Search" button when search is not active
        <Button onClick={() => setShowSearch(true)}>Search</Button>
      )}
      {showSearch && (
        // Display search input fields when search is active
        <Box py={2}>
          <Box display="flex" flexDirection="column">
            {/* Search by text */}
            <Box
              display="flex"
              maxWidth={"md"}
              justifyContent="center"
              m="auto"
            >
              <TextField
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        sx={{ p: 0, borderRadius: 5, cursor: "default" }}
                      >
                        <SearchIcon fontSize="medium" />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleCancel}
                        sx={{ p: 0, borderRadius: 5 }}
                      >
                        <CancelIcon fontSize="medium" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                name="search"
                value={search}
                autoFocus
                fullWidth
                variant="outlined"
              ></TextField>
            </Box>

            {/* Search by tags */}
            <Box
              maxWidth={"md"}
              display="flex"
              justifyContent="center"
              m="auto"
            >
              <Box display="flex">
                <MuiChipsInput
                  color="secondary"
                  autoFocus
                  onInput={(e) => handleChipInput(e)}
                  inputValue={chipInput}
                  variant="standard"
                  placeholder="Search by tags"
                  fullWidth
                  value={chips}
                  onChange={handleChange}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Search;
