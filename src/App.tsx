import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import { Container,CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "./theme/darkTheme";
import lightTheme from "./theme/lightTheme";
import MaterialUISwitch from "./components/MaterialUISwitch";

import './App.css';
import Home from "./pages/Home";

function App() {
  const darkState = localStorage.getItem("dark")!==null? JSON.parse(localStorage.getItem("dark") as string) : false;

 const user= "zeby";
 const [dark,setDark]  = useState(darkState);
 useEffect(()=>{
  localStorage.setItem("dark",JSON.stringify(dark));
 },[dark]);
  return (
    <BrowserRouter>
 
     <ThemeProvider theme={dark? darkTheme:lightTheme}>
     <CssBaseline enableColorScheme/>
      
         <Container sx={{minHeight:"100vh"}} maxWidth={false} disableGutters >
          
           <Routes>
             <Route path="/" element={user?<Home />:<Navigate to="/signin" />} />
            {/*  <Route path="/signin" element={user? <Navigate to="/posts?page=1" />:<SignIn />} />
             <Route path="/signup" element={user? <Navigate to="/posts?page=1" />:<SignUp />} /> */}
         {/*     <Route path="/confirmEmail/:token" element={<ConfirmEmail />} />
             <Route path="/confirmEmail" element={<ConfirmEmail />} /> */}
           
        {/*      <Route path="/forgotpassword" element={!user&& <ForgotPassword />} />
             <Route path="/resetpassword/:token" element={!user&& <ResetPassword />} />
             <Route path="/resetpassword" element={!user&& <ResetPassword />} /> */}
           
           </Routes>
           <MaterialUISwitch sx={{position:"absolute", bottom:0, right:0, m:1}}  checked={dark} onChange={(e:any)=> {setDark(e.target.checked)}}/>
           </Container>
      
     </ThemeProvider>
   
   </BrowserRouter>
  );
}

export default App;
