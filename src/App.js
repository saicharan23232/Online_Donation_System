import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CampaignList from './pages/CampaignList';
import CampaignDetail from './pages/CampaignDetail';
import UserDashboard from './components/UserDashboard'; // Fixed path
import AdminDashboard from './components/AdminDashboard'; // Fixed path
import PaymentPage from './pages/PaymentPage';
import DonateForm from './components/DonateForm'; // Fixed path
import Login from './components/Login'; // Fixed path
import SignUp from './components/SignUp'; // Fixed path
import About from './components/About'; // Fixed path
import Contact from './components/Contact'; // Fixed path

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/campaigns" element={<CampaignList />} />
          <Route path="/campaign/:id" element={<CampaignDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/donate/:campaignId" element={<DonateForm />} />
          <Route path="/donate" element={<DonateForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;