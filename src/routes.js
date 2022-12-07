import { Route, Routes } from "react-router";
import CreateUser from "./pages/user/createUser";
import EditUser from "./pages/user/editUser";
import UserList from './pages/user/userList';

const AllRoutes=()=>{
    return(
        <Routes>
            <Route exact path="/createUser" element={<CreateUser/>}></Route>
            <Route exact path="/" element={<UserList/>}></Route>
            <Route exact path="/editUser/:id" element={<EditUser/>}/>
        </Routes>
    )
}

export default AllRoutes