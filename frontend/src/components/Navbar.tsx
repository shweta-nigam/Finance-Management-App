"use client";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="h-30 p-6 bg w-full fixed flex items-center justify-between z-99">
      {/* Left Section*/}
      <div className="flex items-center">
        <div>
          <img src="/logo.png" className="w-16" alt="logo"></img>
        </div>
        <Link to="/" className="text-xl font-bold text-white">
          FinEase
        </Link>
      </div>

      {/* Center Section - Navigation Links */}
      <NavigationMenu>
        <NavigationMenuList className="flex gap-2">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
            { to: "/price", label: "Price" },
            { to: "/dashboard", label: "Dashboard" },
          ].map((item) => (
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

      {/* Right Section - Profile */}
      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          aria-label="Toggle theme"
        >
          <Moon className="h-5 w-5 text-white dark:hidden" />
          <Sun className="h-5 w-5 hidden dark:block text-yellow-400" />
        </button>

        {user ? (
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
            <button
              onClick={logout}
              className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn-D-blue btn-D-blue:hover btn-D-blue span"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
