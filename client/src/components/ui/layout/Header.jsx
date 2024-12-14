import { authPath } from "../../../config";
import {
  GraduationCap,
  LayoutDashboard,
  LogOut,
  UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useGlobal } from "../../../context/GlobalProvider";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const location = useLocation();
  const { user, handleSignOut } = useGlobal();

  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between h-14">
        {/* Web logo */}
        {authPath.includes(location.pathname) ? (
          <div className="px-4">
            <SidebarTrigger />
          </div>
        ) : (
          <Link to="/" className="flex items-center space-x-3">
            <GraduationCap />
            <h3>LearningSphere</h3>
          </Link>
        )}

        {/* Nav menu + button */}
        <div className="flex items-center justify-between gap-x-4 md:gap-x-8">
          <nav className="flex space-x-3">
            <Link to="/">Home</Link>
            <Link to="/e-learning">E-Learning</Link>
          </nav>
          {user ? (
            // Authenticated display
            <div className="px-6">
              <DropdownMenu className="right-12">
                <DropdownMenuTrigger>
                  <UserCircle />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-56 p-3">
                  <DropdownMenuLabel>john doe</DropdownMenuLabel>
                  <DropdownMenuLabel className="font-normal">
                    johndoe@gmail.com
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/dashboard/my-profile">
                    <DropdownMenuItem>
                      Profile
                      <DropdownMenuShortcut>
                        <LayoutDashboard />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuItem onClick={handleSignOut}>
                    Logout
                    <DropdownMenuShortcut>
                      <LogOut />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            // Non-authenticated display
            <div className="flex space-x-3">
              <Link to="/sign-in">
                <Button>Sign-In</Button>
              </Link>
              <Link to="/sign-up">
                <Button>Sign-Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
