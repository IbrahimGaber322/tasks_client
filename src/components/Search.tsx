import React, { useState } from "react";
import {
  Button,
  Grow,
  TextField,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import { MuiChipsInput } from "mui-chips-input";
import CancelIcon from "@mui/icons-material/Cancel";
function Search({showSearch, setShowSearch}:{showSearch:boolean; setShowSearch:Function}) {
  const [expand, setExpand] = useState(false);
 

  const [search, setSearch] = useState("");
  const [chips, setChips] = useState([]);
  const [chipInput, setChipInput] = useState("");

  const searchTasks = () => {
    const searchQuery = search?.trim() || null;
    const searchTags = chips?.join(",") || null;
  };

  const handleChange = (newChips: any) => {
    setChips(newChips);
    setChipInput("");
  };
  const handleChipInput = (e: any) => {
    setChipInput(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      searchTasks();
    }
  };
  const handleExpand = () => {
    if (!expand) {
      setExpand(true);
    } else {
      searchTasks();
    }
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" ml={4}>
      {!showSearch && (
        <Button onClick={() => setShowSearch(true)}>Search</Button>
      )}
      {showSearch && (
        <Box py={2}>
          <Box display="flex" flexDirection="column">
            <Box
              display="flex"
              maxWidth={"md"}
              justifyContent="center"
              m="auto"
            >
              <Grow in>
                <TextField
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          onClick={handleExpand}
                          sx={{ p: 0, borderRadius: 5 }}
                        >
                          <SearchIcon fontSize="medium" />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setShowSearch(false);
                          }}
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
              </Grow>
            </Box>

            <Box
              maxWidth={"md"}
              display="flex"
              justifyContent="center"
              m="auto"
            >
              <Box display="flex">
                <MuiChipsInput
                  color="primary"
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
