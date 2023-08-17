import { Box, Button, IconButton, Typography } from "@mui/material";
import icon from "../assets/task.png";
import Search from "./Search";

import { useEffect, useState } from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../actions/users";
function Header({list,setList,smallScreen}:{list:boolean, setList:Function, smallScreen:boolean}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
 
  const handleSignOut = () =>{
    dispatch(signOut(navigate));
  }
  useEffect(()=>{
    smallScreen&& setList(true);
  },[smallScreen,setList])

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
        {!smallScreen&&<IconButton
          onClick={() => {
            setList(!list);
          }}
        >
          {list ? (
            <ViewListIcon fontSize="medium" />
          ) : (
            <GridViewIcon fontSize="medium" />
          )}
        </IconButton>}
        <Button onClick={handleSignOut}>Logout</Button>
      </Box>
    </Box>
  );
}
export default Header;
