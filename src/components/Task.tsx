import * as React from "react";
import { Box, Checkbox, FormControlLabel, FormGroup, IconButton, Typography } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import { useDispatch } from "react-redux";
import { updateTask } from "../actions/tasks";
import dayjs from "dayjs";
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
  };

const Task = ({ list, task , commentButton }: {list:boolean; task:Data; commentButton:boolean;}) => {
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

        dispatch(updateTask(task?._id, {...task, content:updatedContent }));

    }
 
  return (
    <Box
      sx={{
        width: (list ? "90%" : 300),
        height: "fit-content",
        border: "1px solid grey",
        borderRadius:4,
        mx:(list?"auto":0),
        display:"flex",
        flexDirection:"column",
        p:2
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
        <Box sx={{display:"flex", width:"100%", mt:1}}>
            {commentButton&&<IconButton href={`/tasks/${task?._id}`}>
                 <CommentIcon fontSize="small" />
            </IconButton>}
        </Box>
    </Box>
  );
};

export default Task;
