import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { FeatureCard } from "@/components/FeatureCard";
import { Link } from "react-router-dom";
import { UserPlus, Share2, Palette } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Your Professional Identity,{" "}
            <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              Simplified
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create and share your digital business card, landing page, and CV in minutes.
            Make a lasting impression with a professional online presence.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-white">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Three Simple Steps to Your Professional Online Presence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Sign Up"
              description="Create your account in seconds and start building your professional presence."
              icon={UserPlus}
              step={1}
            />
            <FeatureCard
              title="Create Your Profile"
              description="Use our intuitive wizard to build your perfect profile with all your professional details."
              icon={Palette}
              step={2}
            />
            <FeatureCard
              title="Share Everywhere"
              description="Share your digital business card, landing page, and CV with anyone, anywhere."
              icon={Share2}
              step={3}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>© 2024 bizel.link. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;