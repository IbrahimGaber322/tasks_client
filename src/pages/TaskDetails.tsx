import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { comment, deleteTask, fetchTask } from "../actions/tasks";
import Task from "../components/Task";
import Header from "../components/Header";
import { Box, Button, TextField, Typography, Backdrop } from "@mui/material";
import CreateTask from "../components/CreateTask";

const TaskDetails = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    dispatch(deleteTask(task._id, navigate));
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const [list, setList] = useState(true);
  const page = null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const [commentText, setCommentText] = useState("");

  const { isLoading, task } = useSelector((state: any) => state?.tasks);
  const user = useSelector((state: any) => state?.user);
  console.log(task.comments);
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
  console.log(task);

  useEffect(() => {
    if (id) {
      dispatch(fetchTask(id));
    }
  }, [id, dispatch]);

  return (
    <>
      <Header list={list} setList={setList} smallScreen={true} />
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
        <Typography
          textAlign="center"
          variant="h6"
        >{`${task.name}'s Task`}</Typography>
        {user.email === task.creator&& <Box sx={{display:"flex", mx:"auto", gap:2}}><Button onClick={handleOpen}>Delete Task</Button>
        <Button onClick={()=>setEdit(true)}>Edit Task</Button>
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
          <Typography>Are you sure you want to delete this task?</Typography>
          <Button variant="contained" onClick={handleClose}>
            Yes
          </Button>
          <Button variant="contained" onClick={() => setOpen(false)}>
            No
          </Button>
        </Backdrop></Box>}
        {edit?<CreateTask setEdit={setEdit} initialState={task} smallScreen={true} /> : <Task task={task} list={true} commentButton={false} />}

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
            mb:2
          }}
        >
          <Typography variant="h6" textAlign="center">
            Comments
          </Typography>
          <TextField
            inputProps={{ maxLength: 100 }}
            label="Add comment..."
            name="commentText"
            value={commentText}
            onKeyDown={handleKeyDown}
            onChange={(e: any) => setCommentText(e.target.value)}
            fullWidth
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxHeight: 400,
              overflowY: "auto"
            }}
          >
            {task?.comments?.map((c: any) => {
              return (
                <Box
                  sx={{
                    borderBottom: "1px solid black",
                    ml: 2,
                    display: "flex",
                    height: "fit-content",
                  }}
                >
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
                  <Typography sx={{ overflowWrap: "anywhere" }}>
                    {c.text}
                  </Typography>
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
