import * as React from "react";
import { Box, Checkbox, FormControlLabel, FormGroup, IconButton, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useDispatch } from "react-redux";
import { updateTask } from "../actions/tasks";
import dayjs from "dayjs";
import Tooltip from '@mui/material/Tooltip';
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
    createdAt: Date;
    _id: string;
    title: string;
    creator: string;
    content: Content[];
    comments: Comment[];
    name:string;
    dueDate:Date;
    isCompleted:boolean;
    tags:string[];
  };

const Task = ({ list, task , options }: {list:boolean; task:Data; options:boolean;}) => {
    const date = dayjs(task?.dueDate).format('DD/MM/YYYY HH:mm:A');
     const dispatch = useDispatch();
    const handleClick = (done:boolean, text:string) =>{
        const updatedContent = [...task?.content].map((step)=>{
            if(step.text === text){
                return {...step, done:!done}
            }else{
                return step;
            }
        })
        const check = updatedContent.filter((step)=>(step.done === false));
        console.log(check.length === 0);

        dispatch(updateTask(task?._id, {...task, content:updatedContent, isCompleted:(check.length===0) }));

    }
 
  return (
    <Tooltip title={task?.tags.map((tag) => ` #${tag}`)}>
    <Box
      sx={{
        width: (list ? "90%" : 300),
        height: "fit-content",
        border: "1px solid grey",
        borderRadius:4,
        mx:(list?"auto":0),
        display:"flex",
        flexDirection:"column",
        p:2,
        position:"relative"
      }}
    >
        <Box sx={{display:"flex", justifyContent:"space-between"}}>
            <Typography>{`Due: ${date}`}</Typography>
            <Typography textAlign="right">{`Status: ${task?.isCompleted?"Done":"Not Done"}`}</Typography>
        </Box>
        <Typography variant="h6" sx={{textAlign:"center", overflowWrap:"anywhere"}}>{task?.title}</Typography>
        <FormGroup >
            <Typography  textAlign="center">To Do</Typography>
        {task?.content?.map((step,i)=>{
            return(
                <React.Fragment key={i}>
                {!step.done&&<FormControlLabel onClick={()=>handleClick(step.done,step.text)}  sx={{cursor:"default"}} control={<Checkbox checked={step.done} />} label={<Typography sx={{ overflowWrap:"anywhere"}}>{step.text}</Typography>} />}
                
                </React.Fragment>
            )
        })}
       <Box component="hr" sx={{height:1, width:"80%"}} />
       <Typography  textAlign="center">Completed</Typography>
        {task?.content?.map((step,i)=>{
            return(
                <React.Fragment key={i}>
                {step.done&&<FormControlLabel onClick={()=>handleClick(step.done,step.text)} sx={{cursor:"default"}} control={<Checkbox checked={step.done} />} label={<Typography sx={{ overflowWrap:"anywhere"}}>{step.text}</Typography>} />}
                
                </React.Fragment>
            )
        })}
        </FormGroup>
       
            {options&&<IconButton sx={{position:"absolute", bottom:0, right:0}} href={`/tasks/${task?._id}`}>
                 <ArrowForwardIcon fontSize="small" />
            </IconButton>}
      
    </Box>
    </Tooltip>
  );
};

export default Task;
