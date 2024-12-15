import { authPath } from "../../config";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useGlobal } from "../../context/GlobalProvider";
import { useAuth } from "../../context/AuthProvider";
import DropDownMenu from "./DropDownMenu";

const Header = () => {
  const { handleSignOut } = useAuth();
  const { user, currentPath } = useGlobal();

  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between h-14">
        {/* Web logo */}
        {authPath.includes(currentPath) ? (
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
            // authenticated display
            <DropDownMenu user={user} handleSignOut={handleSignOut} />
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
