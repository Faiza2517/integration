import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {AuthContext, AuthProvider} from "./context/AuthContext";
import {Navbar} from "./component/Navbar";
import {SignUp} from "./pages/sign-up";
import {Login} from "./pages/sign-in";
import Profile from "./pages/profile";
import EditProfile from "./pages/edit-profile";

function App() {
  return (
   <Router>
     <AuthProvider>
         <Navbar />
       <div className="container mt-4">
         <Routes>
           <Route path='/' element={<AuthContext.Consumer>
             {({ preventAuthAccess }) => preventAuthAccess(SignUp)}
           </AuthContext.Consumer>}/>
             <Route path="/Login" element={<AuthContext.Consumer>
                 {({ preventAuthAccess }) => preventAuthAccess(Login)}
             </AuthContext.Consumer>} />
             <Route path="/Profile" element={<AuthContext.Consumer>
                 {({ requireAuth }) => requireAuth(Profile)}
             </AuthContext.Consumer>} />
             <Route path="/Profile" element={<AuthContext.Consumer>
                 {({ requireAuth }) => requireAuth(EditProfile)}
             </AuthContext.Consumer>} />

         </Routes>
       </div>
     </AuthProvider>
   </Router>
  );
}

export default App;
