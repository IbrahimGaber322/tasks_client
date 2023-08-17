import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { Container,CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "./theme/darkTheme";
import lightTheme from "./theme/lightTheme";
import MaterialUISwitch from "./components/MaterialUISwitch";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import './App.css';
import Home from "./pages/Home";
import Confirm from "./pages/Confirm";
import Forget from "./pages/Forget";
import Reset from "./pages/Reset";
import TaskDetails from "./pages/TaskDetails";
import { useSelector } from "react-redux";

function App() {
  const darkState = localStorage.getItem("dark")!==null? JSON.parse(localStorage.getItem("dark") as string) : false;

 const user = useSelector((state:any)=>state.user);
console.log(user)
 const [dark,setDark]  = useState(darkState);
 useEffect(()=>{
  localStorage.setItem("dark",JSON.stringify(dark));
 },[dark]);
  return (
    <BrowserRouter>
 
     <ThemeProvider theme={dark? darkTheme:lightTheme}>
     <CssBaseline enableColorScheme/>
      
         <Container sx={{minHeight:"100vh", position:"relative"}} maxWidth={false} disableGutters >
          
           <Routes>
             <Route path="/" element={user.token?<Home />:<Navigate to="/sign-in" />} />
             <Route path="/sign-in" element={user.token? <Navigate to="/?page=1" />:<SignIn />} />
             <Route path="/sign-up" element={user.token? <Navigate to="/?page=1" />:<SignUp />} />
             <Route path="/confirm/:token" element={<Confirm />} />
             <Route path="/confirm" element={<Confirm />} />
             <Route path="/tasks/:id" element={<TaskDetails />} />
             <Route path="/forget" element={!user.token&& <Forget />} />
             <Route path="/reset/:token" element={!user&& <Reset />} />
             <Route path="/reset" element={!user.token&& <Reset />} />
           
           </Routes>
           <MaterialUISwitch sx={{position:"absolute", bottom:0, right:0, m:1}}  checked={dark} onChange={(e:any)=> {setDark(e.target.checked)}}/>
           </Container>
      
     </ThemeProvider>
   
   </BrowserRouter>
  );
}

export default App;
