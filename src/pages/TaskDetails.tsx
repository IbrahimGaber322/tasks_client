import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTask } from "../actions/tasks";
import Task from "../components/Task";




const TaskDetails = () =>{
    const page = null;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [edit, setEdit] = useState(false);
    const [commentMessage,setCommentMessage] = useState("");
    const [commentSection,setCommentSection] = useState(false);
    const {isLoading, task} = useSelector((state:any) => state?.tasks);
    const user = useSelector((state:any)=>state?.user);
  
  
    useEffect(() => {
      if (id) {
        dispatch(fetchTask(id));
      }
    }, [id,dispatch]);


    return (
        <>
          <Task list={true} task={task}/>
        </>
    )
}


export default TaskDetails;