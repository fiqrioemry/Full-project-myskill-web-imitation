/* eslint-disable react/prop-types */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { LayoutDashboard, LogOut, UserCircle } from "lucide-react";

const DropDownMenu = ({ user, handleSignOut }) => {
  return (
    <div className="px-6">
      <DropdownMenu className="right-12">
        <DropdownMenuTrigger>
          <UserCircle />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-56 p-3">
          <DropdownMenuLabel>{user.userName}</DropdownMenuLabel>
          <DropdownMenuLabel className="font-normal">
            {user.userEmail}
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
  );
};

export default DropDownMenu;