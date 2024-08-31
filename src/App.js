import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {AuthContext, AuthProvider} from "./context/AuthContext";
import {Navbar} from "./component/Navbar";
import {SignUp} from "./pages/sign-up";
import {Login} from "./pages/sign-in";
import Profile from "./pages/profile";
import EditProfilePage from "./pages/editprofile";
import Products from "./pages/product";
import Orders from "./pages/orderlist";
import OrderList from "./pages/addorder";
import Error from "./pages/error"
import SingleProduct from "./pages/singleproduct";
import OrderDetails from "./pages/oderdetail";
import {Cart} from "./pages/cart";
import {Checkout} from "./pages/checkout";

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
             <Route path="/EditProfilePage" element={<AuthContext.Consumer>
                 {({ requireAuth }) => requireAuth(EditProfilePage)}
             </AuthContext.Consumer>} />
             <Route path="/Products" element={<AuthContext.Consumer>
                 {({ requireAuth }) => requireAuth(Products)}
             </AuthContext.Consumer>} />
           <Route path="/Product/:id" element={<AuthContext.Consumer>
             {({ requireAuth }) => requireAuth(SingleProduct)}
           </AuthContext.Consumer>} />
           <Route path="/Orders" element={<AuthContext.Consumer>
                 {({ requireAuth }) => requireAuth(Orders)}
             </AuthContext.Consumer>} />
           <Route path="/Orders/:id" element={<AuthContext.Consumer>
             {({ requireAuth }) => requireAuth(OrderDetails)}
           </AuthContext.Consumer>} />
             <Route path="/OrderList" element={<AuthContext.Consumer>
                 {({ requireAuth }) => requireAuth(OrderList)}
             </AuthContext.Consumer>} />
           <Route path="/cart" element={<AuthContext.Consumer>
             {({ requireAuth }) => requireAuth(Cart)}
           </AuthContext.Consumer>} />
           <Route path="/Checkout" element={<AuthContext.Consumer>
             {({ requireAuth }) => requireAuth(Checkout)}
           </AuthContext.Consumer>} />
           <Route path="*" element={<Error />} />
         </Routes>
       </div>
     </AuthProvider>
   </Router>
  );
}

export default App;
