import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import LinkM from "@mui/material/Link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forget } from "../actions/users";
import { Link, useNavigate } from "react-router-dom";



export default function Forget(){
  const [sent, setSent] = useState<boolean>(false);
    
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const handleSubmit = (e:any) =>{
        e.preventDefault();
        dispatch(forget({userEmail:email}, setSent));
    }
    return (
        sent?<Box
          sx={{ width: "100%",height:"100vh", display: "flex",flexDirection:"column", justifyContent: "center", alignItems:"center" }}
          onSubmit={handleSubmit}
          component="form"
          
        >
        <Paper 
            elevation={10}
            sx={{
              maxWidth:"sm" ,
              borderRadius: 4,
              p: 3,
              "@media only screen and (max-width: 600px)": { m: 1 },
            }}>
        
                <Typography fontWeight={600}>Check the reset mail in mailbox.</Typography>
             
          
          </Paper>
        </Box>:
         <Box
         sx={{ width: "100%",height:"100vh", display: "flex",flexDirection:"column", justifyContent: "center", alignItems:"center" }}
         onSubmit={handleSubmit}
         component="form"
         
       >
       <Paper 
           elevation={10}
           sx={{
             maxWidth:"sm" ,
             borderRadius: 4,
             p: 3,
             "@media only screen and (max-width: 600px)": { m: 1 },
           }}>
         <Grid container>
           <Grid pt={2} item xs={12}>
             <Typography textAlign="center" variant="h4">
               Enter your email
             </Typography>
           </Grid>
   
           <Grid pt={2} item xs={12}>
             <TextField
               type="email"
               name="email"
               variant="outlined"
               value={email}
               label="Email Address"
               required
               fullWidth
               autoFocus
               onChange={(e)=>setEmail(e.target.value)}
             />
           </Grid>
          
          
           <Grid pt={2} item xs={12}>
             <Button
               variant="outlined"
               type="submit"
               fullWidth
             >
               <Typography fontWeight={600}>Send reset link</Typography>
             </Button>
           </Grid>
           <Grid pt={2} item xs={12} display={"flex"} justifyContent={"end"}>
            
               <LinkM component={Link} to={"/signin"} >Go back to sign in</LinkM>
             
           </Grid>
         </Grid>
         </Paper>
       </Box>
      );

}