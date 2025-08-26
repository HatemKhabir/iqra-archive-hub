import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import QuranVerse from "../components/QuranVerse";
import { Search, UserPlus, Globe, Heart } from "lucide-react";
import heroMosque from "../assets/hero-mosque.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative">
        <div 
          className="h-screen bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroMosque})` }}
        >
          <div className="absolute inset-0 islamic-gradient opacity-80"></div>
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white max-w-4xl mx-auto px-4">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in">
                Your Khutbah, Anywhere,
                <span className="block text-accent">In Any Language</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 slide-up">
                Access Islamic sermons from mosques worldwide with translations and audio
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center slide-up">
                <Link to="/browse" className="btn-hero flex items-center justify-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Find Khutbah</span>
                </Link>
                <Link to="/register-mosque" className="btn-accent flex items-center justify-center space-x-2">
                  <UserPlus className="h-5 w-5" />
                  <span>Register a Mosque</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Verse Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <QuranVerse />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Connecting Muslims Worldwide
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="mosque-card text-center">
              <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-foreground">Global Access</h3>
              <p className="text-muted-foreground">
                Browse khutbahs from mosques across different countries and cities
              </p>
            </div>
            
            <div className="mosque-card text-center">
              <Heart className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-foreground">Multiple Languages</h3>
              <p className="text-muted-foreground">
                Read and listen to sermons in Arabic, English, Urdu, and more
              </p>
            </div>
            
            <div className="mosque-card text-center">
              <UserPlus className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-foreground">Easy Sharing</h3>
              <p className="text-muted-foreground">
                Mosques can easily upload and share their weekly khutbahs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-foreground">Khotba Connect</h3>
              <p className="text-muted-foreground">
                Connecting the global Muslim community through shared wisdom and knowledge.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/browse" className="block text-muted-foreground hover:text-accent">Browse Khutbahs</Link>
                <Link to="/register-mosque" className="block text-muted-foreground hover:text-accent">Register Mosque</Link>
                <Link to="/admin" className="block text-muted-foreground hover:text-accent">Admin Portal</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-accent">About</a>
                <a href="#" className="block text-muted-foreground hover:text-accent">Contact</a>
                <a href="#" className="block text-muted-foreground hover:text-accent">Privacy Policy</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Connect</h4>
              <p className="text-muted-foreground text-sm">
                Join our mission to share Islamic knowledge across the world.
              </p>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 Khotba Connect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;