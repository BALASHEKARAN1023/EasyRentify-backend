// import { StyleProvider } from '@ant-design/cssinjs';
import{BrowserRouter,Routes,Route,redirect,useParams }from"react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCars from './pages/BookingCars';
import UserBookings from "./pages/UserBookings";
import AddCar from "./pages/AddCar";
import AdminHome from "./pages/AdminHome";
import EditCar from "./pages/EditCar";
import Main from "./pages/Main";
function App() {
  // let {id}=useParams();//URL access in inside
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Main/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/booking/:carid" element={<BookingCars/>}/>
    <Route path="/userbookings" element={<UserBookings/>}/>
    <Route path="/addcar" element={<AddCar/>}/>
    <Route path="/admin" element={<AdminHome/>}/>
    <Route path="/editcar/:carid" element={<EditCar/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

// element={<ProtectedRoute render={(params) => ({ ...params })} BookingCars/> />}
export default App
//protected unKoow person was not be booked so we have to use this funcation 
export function ProtectedRoute(props){
   if(localStorage.getItem('user')){
    return <Route{...props}/>

   }
   else
   {
     return redirect("/login");
   }        

}
