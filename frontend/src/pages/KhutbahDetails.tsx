import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { sampleKhutbahs } from "../data/sampleData";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Globe, 
  Download, 
  Share, 
  Play, 
  Pause,
  Languages
} from "lucide-react";

const KhutbahDetails = () => {
  const { id } = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [isPlaying, setIsPlaying] = useState(false);

  const khutbah = sampleKhutbahs.find(k => k.id === id);

  if (!khutbah) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Khutbah Not Found</h1>
          <Link to="/browse" className="btn-hero">
            Return to Browse
          </Link>
        </div>
      </div>
    );
  }

  const availableLanguages = Object.keys(khutbah.content);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this khutbah: ${khutbah.title}`;
    
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/browse" className="inline-flex items-center space-x-2 text-primary hover:text-primary-glow mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Browse</span>
        </Link>

        {/* Header */}
        <div className="mosque-card mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-foreground mb-4">{khutbah.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{khutbah.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{khutbah.mosque}, {khutbah.city}, {khutbah.country}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Globe className="h-4 w-4" />
                  <span>{khutbah.language}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {khutbah.hasAudio && (
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="btn-hero flex items-center space-x-2"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span>{isPlaying ? "Pause" : "Play"} Audio</span>
                </button>
              )}
              
              <button className="btn-accent flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </button>
              
              <div className="relative group">
                <button className="btn-accent flex items-center space-x-2">
                  <Share className="h-4 w-4" />
                  <span>Share</span>
                </button>
                
                <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="p-2 space-y-1 min-w-[150px]">
                    <button
                      onClick={() => handleShare("whatsapp")}
                      className="w-full text-left px-3 py-2 hover:bg-muted rounded text-sm"
                    >
                      WhatsApp
                    </button>
                    <button
                      onClick={() => handleShare("twitter")}
                      className="w-full text-left px-3 py-2 hover:bg-muted rounded text-sm"
                    >
                      Twitter
                    </button>
                    <button
                      onClick={() => handleShare("facebook")}
                      className="w-full text-left px-3 py-2 hover:bg-muted rounded text-sm"
                    >
                      Facebook
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Audio Player */}
          {khutbah.hasAudio && isPlaying && (
            <div className="bg-muted/30 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="p-2 bg-primary text-primary-foreground rounded-full"
                  >
                    <Pause className="h-4 w-4" />
                  </button>
                  <div>
                    <p className="font-medium">Now Playing</p>
                    <p className="text-sm text-muted-foreground">{khutbah.title}</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">0:00 / 45:30</div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-1/4"></div>
                </div>
              </div>
            </div>
          )}

          {/* Language Toggle */}
          {availableLanguages.length > 1 && (
            <div className="flex items-center space-x-4 mb-6">
              <Languages className="h-5 w-5 text-accent" />
              <div className="flex space-x-2">
                {availableLanguages.map(lang => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-4 py-2 rounded-lg capitalize transition-all ${
                      selectedLanguage === lang
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mosque-card">
          <div className="prose max-w-none">
            {selectedLanguage === "arabic" ? (
              <div className="text-right font-arabic text-lg leading-relaxed">
                {khutbah.content[selectedLanguage as keyof typeof khutbah.content]}
              </div>
            ) : (
              <div className="text-lg leading-relaxed">
                {khutbah.content[selectedLanguage as keyof typeof khutbah.content]}
              </div>
            )}
          </div>

          {!khutbah.content[selectedLanguage as keyof typeof khutbah.content] && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Content not available in {selectedLanguage}. Please try another language.
              </p>
            </div>
          )}
        </div>

        {/* Related Info */}
        <div className="mt-8 mosque-card">
          <h3 className="text-xl font-semibold mb-4 text-foreground">About this Khutbah</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-accent mb-2">Topic</h4>
              <p className="text-muted-foreground">{khutbah.topic}</p>
            </div>
            <div>
              <h4 className="font-medium text-accent mb-2">Mosque</h4>
              <p className="text-muted-foreground">{khutbah.mosque}</p>
            </div>
            <div>
              <h4 className="font-medium text-accent mb-2">Location</h4>
              <p className="text-muted-foreground">{khutbah.city}, {khutbah.country}</p>
            </div>
            <div>
              <h4 className="font-medium text-accent mb-2">Available Formats</h4>
              <div className="flex space-x-2">
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Text</span>
                {khutbah.hasAudio && (
                  <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">Audio</span>
                )}
                {khutbah.hasVideo && (
                  <span className="px-2 py-1 bg-secondary/10 text-secondary-foreground text-xs rounded">Video</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KhutbahDetails;