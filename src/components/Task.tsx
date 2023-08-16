import { Box, Checkbox, Divider, FormControlLabel, FormGroup, IconButton, Typography } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';

interface Props {
  list: boolean;
  task: 
  {
    title: string;
    content: { text: string; done: boolean }[];
    comments: { author: string; text: string }[];
  }
  ;
}

const Task = ({ list, task }: Props) => {
    console.log(list);
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
        <Typography variant="h5" sx={{textAlign:"center", mt:1}}>{task.title}</Typography>
        <FormGroup sx={{ml:2}}>
        {task.content.map((step)=>{
            return(
                <>
                {!step.done&&<FormControlLabel sx={{cursor:"default"}} control={<Checkbox checked={step.done} />} label={step.text} />}
                
                </>
            )
        })}
       <Box component="hr" sx={{height:1, width:"80%"}} />
        {task.content.map((step)=>{
            return(
                <>
                {step.done&&<FormControlLabel sx={{cursor:"default"}} control={<Checkbox checked={step.done} />} label={step.text} />}
                
                </>
            )
        })}
        </FormGroup>
        <Box sx={{display:"flex", width:"100%", mt:1}}>
            <IconButton>
                 <CommentIcon fontSize="small" />
            </IconButton>
        </Box>
    </Box>
  );
};

export default Task;
