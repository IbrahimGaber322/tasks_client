import {
  Box,
  Button,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import icon from "../assets/task.png";
import Search from "./Search";
import { useEffect, useState } from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../actions/users";
import CancelIcon from "@mui/icons-material/Cancel";
function Header({
  list,
  setList,
  smallScreen,
  sort,
  setSort
}: {
  list: boolean;
  setList: Function;
  smallScreen: boolean;
  sort:string;
  setSort:Function
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
 
  const [showSort, setShowSort] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  const handleSignOut = () => {
    dispatch(signOut(navigate));
  };
  useEffect(() => {
    smallScreen && setList(true);
  }, [smallScreen, setList]);

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Box
        sx={{
          width: "100%",
          height: "fit-content",
          borderBottom: (theme) => `1px solid ${theme.palette.primary.main}`,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          {(!smallScreen || !showSearch) && (
            <>
              <Box
                marginLeft={3}
                component="img"
                src={icon}
                alt="icon"
                height={30}
                width={30}
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              />
              <Typography
                onClick={() => navigate("/")}
                sx={{ mx: 1, cursor: "pointer" }}
                variant="h5"
              >
                Tasks
              </Typography>
            </>
          )}
          <Search showSearch={showSearch} setShowSearch={setShowSearch} />
          <Button onClick={() => setShowSort(true)}>Sort</Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mr: 1,
            ml:"auto"
          }}
        >
          {!smallScreen && (
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
          )}
          <Button onClick={handleSignOut}>Logout</Button>
        </Box>
      </Box>
      {showSort && (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <FormControl sx={{ width: "fit-content" }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sort} label="Sort By" onChange={handleChange}>
              <MenuItem value={"createdAt"}>CreatedAt</MenuItem>
              <MenuItem value={"completed"}>Completed</MenuItem>
              <MenuItem value={"notCompleted"}>Not Completed</MenuItem>
              <MenuItem value={"dueDate"}>Due Date</MenuItem>
            </Select>
          </FormControl>
          <IconButton
            onClick={() => {
              setShowSort(false);
            }}
          >
            <CancelIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
export default Header;
