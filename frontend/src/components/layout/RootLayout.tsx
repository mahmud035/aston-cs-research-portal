import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

export default function RootLayout() {
  return (
    <div className=" bg-bg">
      <Navbar />

      {/* Main content */}
      <div className="min-h-[calc(100vh-60px)]">
        <Outlet />
      </div>

      <Footer />

      <ScrollRestoration />
    </div>
  );
}
