import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from './Navbar';

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <Outlet />
      <ScrollRestoration />
    </div>
  );
}
