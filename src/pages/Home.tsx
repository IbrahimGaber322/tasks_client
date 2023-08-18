// Import necessary modules and components from Material-UI
import { Box } from "@mui/material";
import Header from "../components/Header";
import { useState } from "react";
import Task from "../components/Task";
import CreateTask from "../components/CreateTask";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import Pag from "../components/Pag";

// Define types for Comment, Content, and Data
type Comment = {
  creator: string;
  text: string;
  createdAt: Date;
  _id: string;
};

type Content = {
  text: string;
  done: boolean;
};

type Data = {
  createdAt: Date;
  _id: string;
  title: string;
  creator: string;
  content: Content[];
  comments: Comment[];
  name: string;
  dueDate: Date;
  isCompleted: boolean;
  tags: string[];
};

// Home component
const Home = ({ sort, setSort }: { sort: string; setSort: Function }) => {
  // Retrieve tasks from Redux state
  const tasks = useSelector((state: any) => state.tasks?.tasks);

  // State to manage list view
  const [list, setList] = useState(true);

  // Check if the screen is small using media query
  const smallScreen = useMediaQuery("(max-width:600px)");

  // Render the Home component
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Header
        sort={sort}
        setSort={setSort}
        smallScreen={smallScreen}
        list={list}
        setList={setList}
      />

      {/* CreateTask component */}
      <CreateTask
        setEdit={null}
        initialState={null}
        smallScreen={smallScreen}
      />

      <Box sx={{ maxWidth: 1200, mx: "auto", mb: 3 }}>
        {/* Task cards */}
        <Box
          sx={{
            width: list ? (smallScreen ? "100%" : 600) : "100%",
            display: "flex",
            justifyContent: "center",
            mx: "auto",
            flexDirection: list ? "column" : "row",
            flexWrap: "wrap",
            gap: 4,
            mt: 3,
          }}
        >
          {tasks?.map((task: Data, i: number) => (
            <Task key={i} options={true} task={task} list={list} />
          ))}
        </Box>
      </Box>

      {/* Pagination component */}
      <Pag sort={sort} />
    </Box>
  );
};

export default Home;
