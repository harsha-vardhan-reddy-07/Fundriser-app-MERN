import './App.css';
import {Route, Routes} from 'react-router-dom';
import Landing from './pages/Landing'
import Home from './pages/Home'
import NewFunding from './pages/NewFunding'
import Authenticate from './pages/Authenticate';
import Navbar from './components/Navbar';
import MyFundrisers from './pages/MyFundrisers'
import FundriserDetails from './pages/FundriserDetails';
import UpdateFunding from './pages/UpdateFunding';
import Admin from './pages/Admin';
import AllUsers from './pages/AllUsers';
import AllFundrisers from './pages/AllFundrisers';
import AllDonations from './pages/AllDonations';

function App() {
  return (
    <div className="App">

      <Navbar />
      
      <Routes>

            <Route path="/landing" element={<Landing />} />
            <Route path="/authenticate" element={<Authenticate />} />
            
            <Route path="/" element={<Home />} />
            <Route path="/new-fundriser" element={<NewFunding />} />
            <Route path='/my-fundrisers' element={<MyFundrisers />} />
            <Route path="/fundriser/:id" element={<FundriserDetails />} />
            <Route path="/update-fundriser/:id" element={<UpdateFunding />} />

            <Route path='/admin' element ={<Admin />} />
            <Route path='/all-users' element ={<AllUsers />} />
            <Route path='/fundrisers' element ={<AllFundrisers />} />
            <Route path='/donations' element ={<AllDonations />} />

      </Routes>
      
    </div>
  );
}

export default App;
