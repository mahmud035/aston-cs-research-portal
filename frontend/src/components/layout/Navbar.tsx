import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="bg-primary text-white">
      <div className="container mx-auto max-w-6xl flex items-center justify-between px-4 py-4">
        {/* Brand */}
        <Link to="/" className="text-lg font-bold tracking-wide">
          Aston Computer Science Department
        </Link>

        {/* Navigation */}
        <nav className="flex gap-6 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'underline font-semibold' : 'hover:underline'
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? 'underline font-semibold' : 'hover:underline'
            }
          >
            Search
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
