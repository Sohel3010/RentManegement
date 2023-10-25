import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from './pages/Shop';
import Owner from './pages/Owner';
import Rent from './pages/Rent';
import DrawerClass from './Component/DrawerClass';
import Admin from './pages/Admin';
import ShopRent from "./pages/ShopRent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DrawerClass>
          <Routes>
            <Route path='/' element={<Rent />}></Route>
            <Route path='/shop' element={<Shop />}></Route>
            <Route path='/admin' element={<Admin />}></Route>
            <Route path='/shopRent' element={<ShopRent />}></Route>
          </Routes>
        </DrawerClass>
      </BrowserRouter>
    </div>
  );
}

export default App;
