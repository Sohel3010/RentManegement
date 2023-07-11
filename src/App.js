import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from './pages/Shop';
import Owner from './pages/Owner';
import Rent from './pages/Rent';


import DrawerClass from './Component/DrawerClass';
import Admin from './pages/Admin';
import DataTable from "./Component/DataTable";
import DataTablesss from "./Component/DataTable";
import EditUser from "./pages/EditUser";
function App() {
  return (
    <div className="App">

<BrowserRouter>
        <DrawerClass>
          <Routes>
            <Route path='/' element={<Owner />}></Route>
            {/* <Route path='/owner' element={<Owner/>}></Route> */}
            <Route path='/shop' element={<Shop />}></Route>
            <Route path='/admin' element={<Admin />}></Route>
            <Route path='/rent' element={<Rent />}></Route>
          </Routes>
        </DrawerClass>
      </BrowserRouter>


      {/* <EditUser/> */}
   {/* <DataTablesss/> */}

    
    </div>
  );
}

export default App;
