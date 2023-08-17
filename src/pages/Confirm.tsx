import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { confirm, sendConfirm, signOut } from "../actions/users";

const Confirm = () =>{
    const user = useSelector((state:any)=>state.user);
    console.log(user);
    const currentToken = user?.token;
    const [sent, setSent] = useState(false);
    const navigate = useNavigate();
    const { token } = useParams();
    const dispatch = useDispatch();
    const handleCLick = ()=>{
        dispatch(confirm(token,navigate));
    }
    const handleCLick2 = ()=>{
        dispatch(sendConfirm({token:currentToken}, setSent));
    }
    const handleCLick3 = ()=>{
        dispatch(signOut(navigate));
    }
    useEffect(()=>{
        if(token){
            dispatch(confirm(token,navigate));
        }
    },[dispatch,token,navigate])

return(token?
    <Box height={600} display={"flex"} flexWrap={"wrap"} justifyContent={"center"} alignItems={"center"}>
    <Paper>
    <Typography>You will be redirected automatically, if not:</Typography>
    <Button onClick={handleCLick}>Click here to confirm email</Button>
    </Paper>
    </Box>
    :
    <Box height={600} display={"flex"} flexWrap={"wrap"} justifyContent={"center"} flexDirection="column" alignItems={"center"}>
    <Paper elevation={0} sx={{display:"flex",flexDirection:"column", justifyContent:"center"}}>
    <Typography textAlign="center">Welcome back {user?.firstName+" " +user?.lastName},</Typography>
    {sent&&<Typography textAlign="center">Confirmation sent email successfully.</Typography>}
    <Typography >Please check the conformation email in your mailbox.</Typography>
     {!sent&&<Button sx={{mx:"auto"}} onClick={handleCLick2}>Resend Activation Email</Button>}
     <Button onClick={handleCLick3}>Not you? Sign Out</Button>
    </Paper>
    </Box>
)

}

export default Confirm;