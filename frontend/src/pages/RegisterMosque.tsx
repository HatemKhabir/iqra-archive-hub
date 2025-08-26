import { useState } from "react";
import Navigation from "../components/Navigation";
import { Building, Mail, MapPin, Upload, CheckCircle } from "lucide-react";
import { countries, cities } from "../data/sampleData";

const RegisterMosque = () => {
  const [formData, setFormData] = useState({
    mosqueName: "",
    country: "",
    city: "",
    imamName: "",
    contactEmail: "",
    logo: null as File | null
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const availableCities = formData.country ? cities[formData.country as keyof typeof cities] || [] : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'country' ? { city: '' } : {})
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, logo: file }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="mosque-card">
              <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Registration Submitted!
              </h1>
              <p className="text-muted-foreground mb-6">
                Thank you for registering {formData.mosqueName}. Our team will review your submission and contact you within 2-3 business days.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    mosqueName: "",
                    country: "",
                    city: "",
                    imamName: "",
                    contactEmail: "",
                    logo: null
                  });
                }}
                className="btn-hero"
              >
                Register Another Mosque
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Register Your Mosque</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our global network and share your khutbahs with Muslims worldwide. 
            Registration is free and helps connect your community with the broader Ummah.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="mosque-card">
            <div className="space-y-6">
              {/* Mosque Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mosque Name *
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    name="mosqueName"
                    required
                    value={formData.mosqueName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter mosque name"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Country *
                  </label>
                  <select
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    City *
                  </label>
                  <select
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={!formData.country}
                    className="w-full px-3 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary disabled:opacity-50"
                  >
                    <option value="">Select City</option>
                    {availableCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Imam Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Imam Name *
                </label>
                <input
                  type="text"
                  name="imamName"
                  required
                  value={formData.imamName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter imam's name"
                />
              </div>

              {/* Contact Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Contact Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    name="contactEmail"
                    required
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="imam@mosque.com"
                  />
                </div>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mosque Logo (Optional)
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="cursor-pointer text-primary hover:text-primary-glow"
                  >
                    Click to upload logo
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG up to 5MB
                  </p>
                  {formData.logo && (
                    <p className="text-sm text-primary mt-2">
                      Selected: {formData.logo.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms */}
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  By registering your mosque, you agree to our terms of service and 
                  commit to sharing authentic Islamic content that adheres to Quranic 
                  and Sunnah principles. All submissions will be reviewed by our team.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full btn-hero flex items-center justify-center space-x-2 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Building className="h-4 w-4" />
                    <span>Register Mosque</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Info Card */}
          <div className="mosque-card mt-8">
            <h3 className="text-lg font-semibold text-foreground mb-3">What happens next?</h3>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <p>We review your mosque registration within 2-3 business days</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <p>You'll receive admin credentials via email upon approval</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <p>Start uploading and sharing your khutbahs with the global community</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterMosque;