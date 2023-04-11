import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './Page/Home';
import Signup from './Page/Signup';
import Login from './Page/Login';
import Profile from './Page/Profile';
import GetPrescription from './Components/GetPrescription';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Signup' element={<Signup/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Profile' element={<Profile/>} />
        <Route path='/editPrescription/' element={<GetPrescription/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
