import { useEffect, useState } from "react";
import { Box, Typography , ButtonBase, TextField , FormGroup , FormControlLabel, Checkbox , Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { createTask, fetchTasks } from "../actions/tasks";

type Content = {
    text:string;
    done:boolean;
}

type Data = {
    title:string;
    creator:string;
    content: Content[];
};


const CreateTask = ({ smallScreen }: { smallScreen: boolean }) => {
    
  
  const dispatch = useDispatch();
  const user = useSelector((state:any)=> state.user);
  const [expand, setExpand] = useState(false);
  const [data, setData] = useState<Data>({title:"", content:[] as Content[], creator:user?.email||""});
  const [note, setNote] = useState("");
 
  const handleSubmit = (e:any) =>{
    e.preventDefault();
    if(data&& data.title.length > 0){
        dispatch(createTask(data))
    }
    console.log(data);
  }

  useEffect(()=>{
    dispatch(fetchTasks())
  },[dispatch])

  const handleClear =()=>{
    setData({title:"", content:[] as Content[], creator:user?.email||""});
    setNote("");
    setExpand(false);
  }

  const handleKeyPressNote = (e:any) =>{
        if(e.keyCode===13 && note.length !== 0){
            const newItem = {text:note, done:false}
            setData({...data, content:[...data.content, newItem]});
            setNote("");
        }
  }
  return (
    <>
    {!expand&&<ButtonBase disableRipple sx={{cursor:"default", }} onClick={()=>setExpand(true)}>
    <Box sx={{width:smallScreen ? "90%" : 600, mx:"auto", mt:2}}>
      <Box
        sx={{
          height: "fit-content",
          border: "1px solid grey",
          borderRadius: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width:"100%"
        }}
      >
        <Typography ml={2} variant="h6">
          Create new task...
        </Typography>
        <AddIcon sx={{ mr: 2 }} />
      </Box>
      </Box>
    </ButtonBase>}

    {expand&&<Box sx={{width:smallScreen ? "90%" : 600, mx:"auto", mt:2}}><Box
    component="form"
        sx={{
          height: "fit-content",
          border: "1px solid grey",
          borderRadius: 4,
          display: "flex",
          justifyContent: "center",
          flexDirection:"column",
          width:"100%",
          px:2,
          gap:2
        }}
      >
        <TextField inputProps={{maxLength:60}}  variant="standard" placeholder="Title" fullWidth name="title" value={data?.title} onChange={(e)=>setData({...data, title:e.target.value})} />
        <FormGroup sx={{ml:2}}>
              {data.content.map((item,i)=>(<FormControlLabel key={i} disabled sx={{cursor:"default"}} control={<Checkbox checked={item.done} />} label={item.text} />))}

        </FormGroup>
        <TextField inputProps={{maxLength:60}} variant="outlined" placeholder="Take a note..." onKeyDown={handleKeyPressNote}  fullWidth name="note" value={note} onChange={(e)=>setNote(e.target.value)} />

        <Button onClick={handleSubmit} fullWidth>
         Add
        </Button>

        <Button onClick={handleClear} sx={{mb:2}} fullWidth>
            Clear
        </Button>
        
      </Box>
      </Box>}
    </>
  );
};

export default CreateTask;
