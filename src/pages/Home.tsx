import { Box, Typography } from "@mui/material";
import Header from "../components/Header";
import { useState } from "react";
import Task from "../components/Task";
import CreateTask from "../components/CreateTask";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import Pag from "../components/Pag";

type Comment = {
    creator:string;
    text:string;
    createdAt:Date;
    _id:string;
}

type Content = {
    text:string;
    done:boolean;
}

type Data = {
    createdAt:Date;
    _id:string;
    title:string;
    creator:string;
    content: Content[];
    comments:Comment[];
};


const Home = () => {
  const tasks = useSelector((state:any)=>state.tasks?.tasks);
  console.log(`all tasks ${tasks.length}`)
  const [list, setList] = useState(true);
  const smallScreen = useMediaQuery("(max-width:600px)");

  

  return (
    <Box
      sx={{
        minHeight:"100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header smallScreen={smallScreen} list={list} setList={setList} />
      <CreateTask smallScreen={smallScreen} />
      <Box sx={{maxWidth:1200, mx:"auto", mb:3}}>
      <Box sx={{ width: (list ? (smallScreen?"100%":600) : "100%"), display: "flex", justifyContent:"center", mx:"auto", flexDirection:(list? "column":"row"),flexWrap:"wrap", gap:4, mt:3, }}>
        {tasks?.map((task:Data,i:number)=>(<Task key={i} task={task} list={list} />))}
      </Box>
      </Box>
      <Pag />
    </Box>
  );
};

export default Home;
