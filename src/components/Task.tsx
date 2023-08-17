import * as React from "react";
import { Box, Checkbox, Divider, FormControlLabel, FormGroup, IconButton, Typography } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import { useDispatch } from "react-redux";
import { updateTask } from "../actions/tasks";

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

const Task = ({ list, task }: {list:boolean; task:Data;}) => {
     const dispatch = useDispatch();
    const handleClick = (done:boolean, text:string) =>{
        const updatedContent = [...task.content].map((step)=>{
            if(step.text === text){
                return {...step, done:!done}
            }else{
                return step;
            }
        })

        dispatch(updateTask(task._id, {...task, content:updatedContent }));

    }
    
  return (
    <Box
      sx={{
        width: (list ? "90%" : 240),
        height: "fit-content",
        border: "1px solid grey",
        borderRadius:4,
        mx:(list?"auto":0),
        display:"flex",
        flexDirection:"column"
      }}
    >
        <Typography variant="h5" sx={{textAlign:"center", mt:1, overflowWrap:"anywhere"}}>{task.title}</Typography>
        <FormGroup sx={{ml:2}}>
        {task?.content?.map((step,i)=>{
            return(
                <React.Fragment key={i}>
                {!step.done&&<FormControlLabel onClick={()=>handleClick(step.done,step.text)}  sx={{cursor:"default"}} control={<Checkbox checked={step.done} />} label={<Typography sx={{ overflowWrap:"anywhere"}}>{step.text}</Typography>} />}
                
                </React.Fragment>
            )
        })}
       <Box component="hr" sx={{height:1, width:"80%"}} />
        {task?.content?.map((step,i)=>{
            return(
                <React.Fragment key={i}>
                {step.done&&<FormControlLabel onClick={()=>handleClick(step.done,step.text)} sx={{cursor:"default", wordWrap:"normal"}} control={<Checkbox checked={step.done} />} label={<Typography sx={{ overflowWrap:"anywhere"}}>{step.text}</Typography>} />}
                
                </React.Fragment>
            )
        })}
        </FormGroup>
        <Box sx={{display:"flex", width:"100%", mt:1}}>
            <IconButton href={`/tasks/${task._id}`}>
                 <CommentIcon fontSize="small" />
            </IconButton>
        </Box>
    </Box>
  );
};

export default Task;
