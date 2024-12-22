import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              bizel.link
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};