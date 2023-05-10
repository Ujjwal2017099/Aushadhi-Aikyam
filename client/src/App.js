import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './Page/Home';
import Signup from './Page/Signup';
import Login from './Page/Login';
import Profile from './Page/Profile';
import GetPrescription from './Components/GetPrescription';
import { AnimatePresence } from "framer-motion";
import NotFound from './Page/NotFound';
import Seller from './Page/Seller';
import MyProducts from './Page/MyProducts';
import Cart from './Page/Cart';
import CustomerOrders from './Page/CustomerOrders';

function App() {
  return (
      <AnimatePresence>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Signup" element={<Signup />} />
                  <Route path="/Login" element={<Login />} />
                  <Route path="/Profile" element={<Profile />} />
                  <Route path="/SellerAccount" element={<Seller />} />
                  <Route
                      path="/editPrescription/"
                      element={<GetPrescription />}
                  />
                  <Route path="/MyProducts" element={<MyProducts />} />
                  <Route path="/Cart" element={<Cart />} />
                  <Route path="/CustomerOrders" element={<CustomerOrders />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
          </BrowserRouter>
      </AnimatePresence>
  );
}

export default App;
