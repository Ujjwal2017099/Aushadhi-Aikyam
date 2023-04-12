import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './Page/Home';
import Signup from './Page/Signup';
import Login from './Page/Login';
import Profile from './Page/Profile';
import GetPrescription from './Components/GetPrescription';
import { AnimatePresence } from "framer-motion";

function App() {
  return (
      <AnimatePresence>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Signup" element={<Signup />} />
                  <Route path="/Login" element={<Login />} />
                  <Route path="/Profile" element={<Profile />} />
                  <Route
                      path="/editPrescription/"
                      element={<GetPrescription />}
                  />
              </Routes>
          </BrowserRouter>
      </AnimatePresence>
  );
}

export default App;
