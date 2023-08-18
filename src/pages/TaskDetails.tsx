// Importing necessary dependencies and components
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  comment,
  deleteComment,
  deleteTask,
  fetchTask,
} from "../actions/tasks";
import Task from "../components/Task";
import Header from "../components/Header";
import {
  Box,
  Button,
  TextField,
  Typography,
  Backdrop,
  IconButton,
} from "@mui/material";
import CreateTask from "../components/CreateTask";
import DeleteIcon from "@mui/icons-material/Delete";

// Component for displaying task details
const TaskDetails = ({
  sort,
  setSort,
}: {
  sort: string;
  setSort: Function;
}) => {
  // State management
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    dispatch(deleteTask(task._id, navigate));
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const [list, setList] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const [commentText, setCommentText] = useState("");

  // Redux state retrieval
  const { task } = useSelector((state: any) => state?.tasks);
  const user = useSelector((state: any) => state?.user);

  // Handles "Enter" key press for submitting comments
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13 && commentText.length > 0) {
      dispatch(
        comment(
          { text: commentText, creator: user.email, name: user.name },
          task._id
        )
      );
      setCommentText("");
    }
  };
  // Copy current URL to clip for sharing
  async function copyToClip() {
    await navigator.clipboard.writeText(window.location.href);
  }

  // Fetches task details when the "id" parameter changes
  useEffect(() => {
    if (id) {
      dispatch(fetchTask(id));
    }
  }, [id, dispatch]);

  // JSX code for rendering the task details page
  return (
    <>
      {/* Header */}
      <Header
        sort={sort}
        setSort={setSort}
        list={list}
        setList={setList}
        smallScreen={true}
      />
      <Box
        sx={{
          mt: 4,
          maxWidth: 1000,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* Task Name */}
        <Typography
          textAlign="center"
          variant="h6"
        >{`${task.name}'s Task`}</Typography>
        {/* Task Deletion and Editing */}
        {user.email === task.creator && (
          <Box sx={{ display: "flex", mx: "auto", gap: 2 }}>
            <Button onClick={handleOpen}>Delete Task</Button>
            <Button onClick={() => setEdit(true)}>Edit Task</Button>
            <Button onClick={copyToClip}>Share Task</Button>
            <Backdrop
              open={open}
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {/* Task Deletion Confirmation */}
              <Typography>
                Are you sure you want to delete this task?
              </Typography>
              <Button variant="contained" onClick={handleClose}>
                Yes
              </Button>
              <Button variant="contained" onClick={() => setOpen(false)}>
                No
              </Button>
            </Backdrop>
          </Box>
        )}
        {/* Task Editing */}
        {edit ? (
          <CreateTask
            setEdit={setEdit}
            initialState={task}
            smallScreen={true}
          />
        ) : (
          <Task task={task} list={true} options={false} />
        )}

        {/* Comments Section */}
        <Box
          sx={{
            width: list ? "90%" : 300,
            height: "fit-content",
            border: "1px solid grey",
            borderRadius: 4,
            mx: list ? "auto" : 0,
            display: "flex",
            flexDirection: "column",
            px: 2,
            py: 1,
            mb: 2,
          }}
        >
          {/* Comments Title */}
          <Typography variant="h6" textAlign="center">
            Comments
          </Typography>
          {/* Comment Input */}
          <TextField
            inputProps={{ maxLength: 100 }}
            label="Add comment..."
            name="commentText"
            value={commentText}
            onKeyDown={handleKeyDown}
            onChange={(e: any) => setCommentText(e.target.value)}
            fullWidth
          />
          {/* Comment List */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxHeight: 400,
              overflowY: "auto",
            }}
          >
            {/* Mapping through comments */}
            {task?.comments?.map((c: any) => {
              return (
                <Box
                  sx={{
                    borderBottom: "1px solid black",
                    ml: 2,
                    display: "flex",
                    height: "fit-content",
                    position: "relative",
                  }}
                >
                  {/* Comment Creator */}
                  <Typography
                    sx={{
                      mr: 1,
                      width: "fit-content",
                      fontWeight: 700,
                      textAlign: "right",
                    }}
                  >
                    {c.name}:
                  </Typography>
                  {/* Comment Text */}
                  <Typography sx={{ overflowWrap: "anywhere", pr: 3 }}>
                    {c.text}
                  </Typography>
                  {/* Delete Comment Button */}
                  <IconButton
                    onClick={() => {
                      dispatch(deleteComment(task._id, c._id));
                    }}
                    sx={{ position: "absolute", bottom: 0, right: 0, p: 0 }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TaskDetails;
