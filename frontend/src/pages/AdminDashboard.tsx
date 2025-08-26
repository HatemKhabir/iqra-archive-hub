import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { 
  Building, 
  FileText, 
  Calendar, 
  Check, 
  X, 
  Clock,
  LogOut,
  BarChart3,
  Users,
  AlertCircle
} from "lucide-react";

interface PendingMosqueRequest {
  id: string;
  mosqueName: string;
  country: string;
  city: string;
  imamName: string;
  contactEmail: string;
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
}

interface PendingKhutbah {
  id: string;
  title: string;
  mosqueName: string;
  country: string;
  city: string;
  date: string;
  language: string;
  topic: string;
  hasAudio: boolean;
  hasVideo: boolean;
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"mosques" | "khutbahs">("mosques");
  
  const [pendingMosques, setPendingMosques] = useState<PendingMosqueRequest[]>([
    {
      id: "1",
      mosqueName: "Al-Noor Islamic Center",
      country: "United States",
      city: "New York",
      imamName: "Sheikh Ahmed Ibrahim",
      contactEmail: "imam@alnoor.org",
      submittedDate: "2024-01-15",
      status: "pending"
    },
    {
      id: "2",
      mosqueName: "Masjid Al-Hidayah",
      country: "United Kingdom",
      city: "London",
      imamName: "Imam Mohammad Hassan",
      contactEmail: "info@alhidayah.uk",
      submittedDate: "2024-01-18",
      status: "pending"
    }
  ]);

  const [pendingKhutbahs, setPendingKhutbahs] = useState<PendingKhutbah[]>([
    {
      id: "1",
      title: "The Importance of Brotherhood in Islam",
      mosqueName: "Grand Mosque",
      country: "Saudi Arabia",
      city: "Mecca",
      date: "2024-01-20",
      language: "Arabic",
      topic: "Brotherhood",
      hasAudio: true,
      hasVideo: false,
      submittedDate: "2024-01-21",
      status: "pending"
    },
    {
      id: "2",
      title: "Seeking Knowledge: A Muslim's Duty",
      mosqueName: "Islamic Center of Toronto",
      country: "Canada",
      city: "Toronto",
      date: "2024-01-19",
      language: "English",
      topic: "Knowledge",
      hasAudio: false,
      hasVideo: true,
      submittedDate: "2024-01-20",
      status: "pending"
    }
  ]);


  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    
    if (auth === "true") {
      setIsAuthenticated(true);
    } else {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/admin");
  };

  const approveMosque = (id: string) => {
    setPendingMosques(prev => prev.map(mosque => 
      mosque.id === id ? { ...mosque, status: "approved" as const } : mosque
    ));
  };

  const rejectMosque = (id: string) => {
    setPendingMosques(prev => prev.map(mosque => 
      mosque.id === id ? { ...mosque, status: "rejected" as const } : mosque
    ));
  };

  const approveKhutbah = (id: string) => {
    setPendingKhutbahs(prev => prev.map(khutbah => 
      khutbah.id === id ? { ...khutbah, status: "approved" as const } : khutbah
    ));
  };

  const rejectKhutbah = (id: string) => {
    setPendingKhutbahs(prev => prev.map(khutbah => 
      khutbah.id === id ? { ...khutbah, status: "rejected" as const } : khutbah
    ));
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Website Manager Dashboard</h1>
            <p className="text-lg text-muted-foreground">Manage mosque registrations and khutbah submissions</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button
              onClick={handleLogout}
              className="btn-accent flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="mosque-card">
            <div className="flex items-center space-x-3">
              <Building className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingMosques.filter(m => m.status === 'pending').length}</p>
                <p className="text-sm text-muted-foreground">Pending Mosque Requests</p>
              </div>
            </div>
          </div>
          
          <div className="mosque-card">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-accent" />
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingKhutbahs.filter(k => k.status === 'pending').length}</p>
                <p className="text-sm text-muted-foreground">Pending Khutbah Submissions</p>
              </div>
            </div>
          </div>
          
          <div className="mosque-card">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingMosques.filter(m => m.status === 'approved').length + pendingKhutbahs.filter(k => k.status === 'approved').length}</p>
                <p className="text-sm text-muted-foreground">Total Approved</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab("mosques")}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              activeTab === "mosques"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Mosque Requests
          </button>
          <button
            onClick={() => setActiveTab("khutbahs")}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              activeTab === "khutbahs"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Khutbah Submissions
          </button>
        </div>

        {/* Mosque Requests Tab */}
        {activeTab === "mosques" && (
          <div className="mosque-card">
            <h2 className="text-xl font-bold text-foreground mb-6">Pending Mosque Registration Requests</h2>
            
            <div className="space-y-4">
              {pendingMosques.filter(mosque => mosque.status === 'pending').map(mosque => (
                <div key={mosque.id} className="border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-lg mb-2">{mosque.mosqueName}</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                          <p><span className="font-medium">Location:</span> {mosque.city}, {mosque.country}</p>
                          <p><span className="font-medium">Imam:</span> {mosque.imamName}</p>
                        </div>
                        <div>
                          <p><span className="font-medium">Email:</span> {mosque.contactEmail}</p>
                          <p><span className="font-medium">Submitted:</span> {mosque.submittedDate}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 ml-4">
                      <button
                        onClick={() => approveMosque(mosque.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors"
                      >
                        <Check className="h-4 w-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => rejectMosque(mosque.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors"
                      >
                        <X className="h-4 w-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {pendingMosques.filter(m => m.status === 'pending').length === 0 && (
              <div className="text-center py-8">
                <Building className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No pending mosque requests</h3>
                <p className="text-muted-foreground">All mosque registration requests have been processed</p>
              </div>
            )}
          </div>
        )}

        {/* Khutbah Submissions Tab */}
        {activeTab === "khutbahs" && (
          <div className="mosque-card">
            <h2 className="text-xl font-bold text-foreground mb-6">Pending Khutbah Submissions</h2>
            
            <div className="space-y-4">
              {pendingKhutbahs.filter(khutbah => khutbah.status === 'pending').map(khutbah => (
                <div key={khutbah.id} className="border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-lg mb-2">{khutbah.title}</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                        <div>
                          <p><span className="font-medium">Mosque:</span> {khutbah.mosqueName}</p>
                          <p><span className="font-medium">Location:</span> {khutbah.city}, {khutbah.country}</p>
                          <p><span className="font-medium">Language:</span> {khutbah.language}</p>
                        </div>
                        <div>
                          <p><span className="font-medium">Topic:</span> {khutbah.topic}</p>
                          <p><span className="font-medium">Date:</span> {khutbah.date}</p>
                          <p><span className="font-medium">Submitted:</span> {khutbah.submittedDate}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        {khutbah.hasAudio && (
                          <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">Audio</span>
                        )}
                        {khutbah.hasVideo && (
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Video</span>
                        )}
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>Pending Review</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 ml-4">
                      <button
                        onClick={() => approveKhutbah(khutbah.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors"
                      >
                        <Check className="h-4 w-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => rejectKhutbah(khutbah.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors"
                      >
                        <X className="h-4 w-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {pendingKhutbahs.filter(k => k.status === 'pending').length === 0 && (
              <div className="text-center py-8">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No pending khutbah submissions</h3>
                <p className="text-muted-foreground">All khutbah submissions have been reviewed</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;