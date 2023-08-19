// Import necessary modules and components
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
  InputAdornment,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask } from "../actions/tasks";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// Define types for the content and data
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
  name: string;
  tags: string[];
};

// Create the CreateTask component
const CreateTask = ({
  smallScreen,
  initialState,
  setEdit,
}: {
  smallScreen: boolean;
  initialState: any;
  setEdit: any;
}) => {
  const today = new Date();

  // Set up Redux dispatch and user data
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  // Define initial state for form data
  const emptyInitialState = {
    title: "",
    content: [] as Content[],
    creator: user?.email || "",
    isCompleted: false,
    dueDate: today,
    name: user?.name || "",
    tags: [],
  };

  // State variables for form interaction
  const [expand, setExpand] = useState(false);
  const [data, setData] = useState<Data>(initialState || emptyInitialState);
  const [note, setNote] = useState("");
  const [time, setTime] = useState<any>(dayjs(today));

  // If initialState is provided, expand the form
  useEffect(() => {
    if (initialState) {
      setExpand(true);
    }
  }, [initialState]);

  // Handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (data && data.title.length > 0 && data.content.length > 0) {
      if (initialState) {
        // Update existing task
        dispatch(
          updateTask(initialState._id, { ...data, dueDate: time.toDate() })
        );
        setData(initialState);
        setNote("");
        setEdit(false);
      } else {
        // Create a new task
        dispatch(createTask({ ...data, dueDate: time.toDate() }));
        setData(emptyInitialState);
        setNote("");
        setExpand(false);
      }
    }
  };

  // Handle clearing the form
  const handleClear = () => {
    setData(initialState || emptyInitialState);
    setNote("");
    !initialState && setExpand(false);
    initialState && setEdit(false);
  };

  // Handle key press for adding a note
  const handleKeyPressNote = (e: any) => {
    if (e.keyCode === 13 && note.length !== 0) {
      const newItem = { text: note, done: false };
      setData({ ...data, content: [...data.content, newItem] });
      setNote("");
    }
  };
  //addNote button
  const addNote = () => {
    if (note.length !== 0) {
      const newItem = { text: note, done: false };
      setData({ ...data, content: [...data.content, newItem] });
      setNote("");
    }
  };

  return (
    <>
      {!expand && (
        // Button to expand the form
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
        // Expanded form section
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
            {/* Input for title */}
            <TextField
              inputProps={{ maxLength: 60 }}
              variant="standard"
              placeholder="Title"
              fullWidth
              name="title"
              value={data?.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            {/* Display content as checkboxes */}
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
            {/* Input for adding note */}
            <OutlinedInput
              inputProps={{ maxLength: 60 }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={addNote}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Take a note..."
              onKeyDown={handleKeyPressNote}
              fullWidth
              name="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            {/* DateTimePicker for setting due date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                onChange={(newValue) => setTime(newValue)}
                value={time}
                label="Set due date"
              />
            </LocalizationProvider>
            {/* Input for adding tags */}
            <TextField
              name="tags"
              variant="outlined"
              label='Tags : "tag1,tag2,tag3..."'
              fullWidth
              value={data.tags}
              onChange={(e) => {
                setData({
                  ...data,
                  tags: e?.target?.value?.split(",")?.map((tag) => tag.trim()),
                });
              }}
            />
            {/* Submit button */}
            <Button onClick={handleSubmit} fullWidth>
              Add
            </Button>
            {/* Clear button */}
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
