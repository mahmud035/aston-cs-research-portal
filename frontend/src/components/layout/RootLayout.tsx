import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from './Navbar';

export default function RootLayout() {
  return (
    <div>
      <Navbar />

      {/* Outlet */}
      <div className="min-h-[calc(100vh-300px)]">
        <Outlet />
      </div>

      <ScrollRestoration />
    </div>
  );
}
