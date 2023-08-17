import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  ButtonBase,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { createTask, fetchTasks, updateTask } from "../actions/tasks";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
type Content = {
  text: string;
  done: boolean;
};

type Data = {
  title: string;
  creator: string;
  content: Content[];
  isCompleted: boolean;
  dueDate: Date;
  name:string;
};

const CreateTask = ({ smallScreen, initialState, setEdit }: { smallScreen: boolean; initialState:any; setEdit:any; }) => {
  const today = new Date();
  
  console.log(dayjs(today));

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const emptyInitialState = {
    title: "",
    content: [] as Content[],
    creator: user?.email || "",
    isCompleted: false,
    dueDate: today,
    name:user?.name||"",
  };
  const [expand, setExpand] = useState(false);
  const [data, setData] = useState<Data>(initialState||emptyInitialState);
  const [note, setNote] = useState("");
  const [time,setTime] = useState<any>(dayjs(today));

  useEffect(()=>{
    if(initialState){
        setExpand(true);
    }
  },[initialState])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (data && data.title.length > 0 && data.content.length > 0) {
        if(initialState){
            dispatch(updateTask(initialState._id,{...data, dueDate:time.toDate()}));
            setData(initialState);
            setNote("");
            setEdit(false);
        }else{
            dispatch(createTask({...data, dueDate:time.toDate()}));
            setData(emptyInitialState);
            setNote("");
            setExpand(false);
        }
      
    }
  };



  const handleClear = () => {
    setData(initialState||emptyInitialState);
    setNote("");
    !initialState&& setExpand(false);
    initialState&&setEdit(false);
  };

  const handleKeyPressNote = (e: any) => {
    if (e.keyCode === 13 && note.length !== 0) {
      const newItem = { text: note, done: false };
      setData({ ...data, content: [...data.content, newItem] });
      setNote("");
    }
  };
  return (
    <>
      {!expand && (
        <ButtonBase
          disableRipple
          sx={{ cursor: "default" }}
          onClick={() => setExpand(true)}
        >
          <Box sx={{ width: smallScreen ? "90%" : 600, mx: "auto", mt: 2 }}>
            <Box
              sx={{
                height: "fit-content",
                border: "1px solid grey",
                borderRadius: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography ml={2} variant="h6">
                Create new task...
              </Typography>
              <AddIcon sx={{ mr: 2 }} />
            </Box>
          </Box>
        </ButtonBase>
      )}

      {expand && (
        <Box sx={{ width: smallScreen ? "90%" : 600, mx: "auto", mt: 2 }}>
          <Box
            component="form"
            sx={{
              height: "fit-content",
              border: "1px solid grey",
              borderRadius: 4,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "100%",
              px: 2,
              gap: 2,
            }}
          >
            <TextField
              inputProps={{ maxLength: 60 }}
              variant="standard"
              placeholder="Title"
              fullWidth
              name="title"
              value={data?.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <FormGroup sx={{ ml: 2 }}>
              {data.content.map((item, i) => (
                <FormControlLabel
                  key={i}
                  disabled
                  sx={{ cursor: "default" }}
                  control={<Checkbox checked={item.done} />}
                  label={item.text}
                />
              ))}
            </FormGroup>
            <TextField
              inputProps={{ maxLength: 60 }}
              variant="outlined"
              placeholder="Take a note..."
              onKeyDown={handleKeyPressNote}
              fullWidth
              name="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker onChange={(newValue) => setTime(newValue)} value={time} label="Set due date" />
            </LocalizationProvider>
            <Button onClick={handleSubmit} fullWidth>
              Add
            </Button>

            <Button onClick={handleClear} sx={{ mb: 2 }} fullWidth>
              Clear
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CreateTask;
