import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import api from './lib/api';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ZaloButton from './components/ZaloButton';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import PriceList from './pages/PriceList';
import Reviews from './pages/Reviews';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dat-lich" element={<Booking />} />
          <Route path="/lien-he" element={<Contact />} />
          <Route path="/bang-gia" element={<PriceList />} />
          <Route path="/danh-gia" element={<Reviews />} />
        </Routes>
      </main>
      <Footer />
      <ZaloButton />
    </>
  );
}

export default function App() {
  useEffect(() => {
    api.get('/api/images').then(res => {
      const url = res.data?.favicon?.[0]?.url;
      if (url) {
        const link = document.querySelector("link[rel='icon']");
        if (link) link.href = url;
      }
    }).catch(() => {});
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="*" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
