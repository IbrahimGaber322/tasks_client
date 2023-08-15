import { Box, Button, IconButton, Typography } from "@mui/material";
import icon from "../assets/task.png";
import Search from "./Search";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
function Header() {
  const [list, setList] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const smallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        width: "100%",
        height: "fit-content",
        borderBottom: (theme) => `1px solid ${theme.palette.primary.main}`,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        {(!smallScreen || !showSearch) && (
          <>
            <Box
              marginLeft={3}
              component="img"
              src={icon}
              alt="icon"
              height={30}
              width={30}
            />
            <Typography margin={1} variant="h5">
              Tasks
            </Typography>
          </>
        )}
        <Search showSearch={showSearch} setShowSearch={setShowSearch} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mr: 1,
        }}
      >
        <IconButton
          onClick={() => {
            setList(!list);
          }}
        >
          {list ? (
            <ViewListIcon fontSize="medium" />
          ) : (
            <GridViewIcon fontSize="medium" />
          )}
        </IconButton>
        <Button>Logout</Button>
      </Box>
    </Box>
  );
}
export default Header;
