"use client";
import { Link } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import useAuth from "@/context/AuthContext";
import { useState } from "react";

export function Navbar() {
   const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/contact", label: "Contact" },
    { to: "/about", label: "About" },
    { to: "/price", label: "Price" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className="h-30 p-6 bg w-full fixed flex items-center justify-between z-99">
      {/* Left Section */}
      <div className="flex items-center">
        <div>
          <img src="/logo.png" className="w-16" alt="logo" />
        </div>
        <Link to="/" className="text-xl font-bold text-white ml-2">
          FinEase
        </Link>
      </div>

      {/* Desktop Nav */}
      <NavigationMenu className="hidden md:block">
        <NavigationMenuList className="flex gap-2">
          {navLinks.map((item) => (
            <NavigationMenuItem key={item.to}>
              <NavigationMenuLink asChild>
                <Link
                  to={item.to}
                  className="btn-D-blue btn-D-blue:hover btn-D-blue span"
                >
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Theme toggle */}
        <button
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          aria-label="Toggle theme"
        >
          <Moon className="h-5 w-5 text-white dark:hidden" />
          <Sun className="h-5 w-5 hidden dark:block text-yellow-400" />
        </button>

        {/* User section */}
        {user ? (
          <div className="hidden md:flex items-center gap-3">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="user avatar"
                className="w-16 h-16 rounded-full mx-auto mb-2"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-white text-xl mx-auto mb-2">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}
            <button
              onClick={logout}
              className="px-5 py-3 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="hidden md:block btn-D-blue btn-D-blue:hover btn-D-blue span"
          >
            Login
          </Link>
        )}

        {/* Hamburger btn for mobile */}
        <button
          className="md:hidden p-2 rounded bg-white/10 hover:bg-white/20"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-D-blue flex flex-col items-center py-4 md:hidden">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="py-2 text-white w-full text-center hover:bg-blue-700"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {user ? (
            <button
              onClick={() => {
                logout();
                setMobileOpen(false);
              }}
              className="mt-2 px-3 py-2 rounded bg-blue-400 text-white hover:bg-blue-500"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="mt-2 px-3 py-2 rounded bg-green-500 text-white hover:bg-green-600"
              onClick={() => setMobileOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
