import { Box, Typography } from "@mui/material";
import Header from "../components/Header";
import { useState } from "react";
import Task from "../components/Task";
import useMediaQuery from "@mui/material/useMediaQuery";


const tasks: { title: string, content: { text: string, done: boolean }[], comments: { author: string, text: string }[] }[] = [
    {
      title: "hello world",
      content: [
        { text: "wake up", done: false },
        { text: "eat", done: true },
      ],
      comments: [{ author: "brhm", text: "zebyyy" }],
    },
    {
      title: "hello world",
      content: [
        { text: "wake up", done: false },
        { text: "eat", done: true },
      ],
      comments: [{ author: "brhm", text: "zebyyy" }],
    }
  ];

const Home = () => {
  const [list, setList] = useState(true);
  const smallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Header smallScreen={smallScreen} list={list} setList={setList} />
      <Box sx={{ width: (list ? (smallScreen?"100%":600) : "100%"), display: "flex", justifyContent:"center", mx:"auto", flexDirection:(list? "column":"row"), gap:4, mt:3, }}>
        {tasks.map((task)=>(<Task key={task.title} task={task} list={list} />))}
      </Box>
    </Box>
  );
};

export default Home;
