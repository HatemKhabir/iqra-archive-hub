import { useEffect, useMemo, useState } from "react";
import Navigation from "../components/Navigation";
import {
  Building,
  Mail,
  MapPin,
  Upload,
  CheckCircle,
  Phone,
} from "lucide-react";
import { countries, cities } from "../data/sampleData";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { City, Country } from "country-state-city";
import { useMutation } from "@tanstack/react-query";
import { registerMosque } from "@/services/mosqueService";
import { useNavigate } from "react-router-dom";
const RegisterMosque = () => {
  const [formData, setFormData] = useState({
    mosqueName: "",
    country: "",
    countryCode: "",
    city: "",
    address: "",
    imamPhone: "",
    contactEmail: "",
    logo: null as File | null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const {
    mutate: submitRegistration,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: async () => {
      return registerMosque({
        country: formData.country,
        city: formData.city,
        address: formData.address,
        mosqueName: formData.mosqueName,
        adminEmail: formData.contactEmail,
        adminPhone: formData.imamPhone,
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    submitRegistration();

  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "country") {
      const c = Country.getAllCountries().find((c) => c.name === value);
      setFormData((prev) => ({
        ...prev,
        country: value,
        countryCode: c?.isoCode ?? "",
        city: "", 
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const clearForm = () => {
    setFormData({
      mosqueName: "",
      country: "",
      countryCode: "",
      city: "",
      address: "",
      imamPhone: "",
      contactEmail: "",
      logo: null,
    });
  };

  useEffect(() => {
  if (!isSuccess) return;

  const timer = setTimeout(() => {
    navigate("/"); // go to home
  }, 10000);

  return () => clearTimeout(timer);
}, [isSuccess, navigate]);

  if (isSuccess) {
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
                Thank you for registering {formData.mosqueName}. Our team will
                review your submission and contact you within 2-3 business days.
              </p>
              <button
                onClick={() => {
                 clearForm(); 
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
  const serverError =
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response &&
    error.response.data &&
    typeof error.response.data === "object" &&
    "message" in error.response.data
      ? (error as { response: { data: { message: string } } }).response.data
          .message
      : error instanceof Error
      ? error.message
      : undefined;
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Register Your Mosque
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our global network and share your khutbahs with Muslims
            worldwide. Registration is free and helps connect your community
            with the broader Ummah.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Error banner */}
          {isError && (
            <div className="mb-4 rounded-md border border-red-300 bg-red-50 text-red-700 p-3">
              {serverError ||
                "Failed to submit registration. Please try again."}
            </div>
          )}
          {/*success banner */}
       
          {/* Registration Form */}
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
                    {Country.getAllCountries().map((country) => (
                      <option key={country.isoCode} value={country.name}>
                        {country.name}
                      </option>
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
                    {City.getCitiesOfCountry(formData.countryCode).map((city,index) => (
                      <option key={city.countryCode+index} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter mosque address"
                  />
                </div>
              </div>
              {/* Imam Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Imam Phone Number *
                </label>
                <PhoneInput
                  placeholder="Enter phone number"
                  value={formData.imamPhone}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, imamPhone: value || "" }))
                  }
                  defaultCountry="US"
                  className="w-full pl-4 pr-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  international
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

              {/* Terms */}
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  By registering your mosque, you agree to our terms of service
                  and commit to sharing authentic Islamic content that adheres
                  to Quranic and Sunnah principles. All submissions will be
                  reviewed by our team.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className={`w-full btn-hero flex items-center justify-center space-x-2 ${
                  isPending ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isPending ? (
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
            <h3 className="text-lg font-semibold text-foreground mb-3">
              What happens next?
            </h3>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <p>
                  We review your mosque registration within 2-3 business days
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <p>You'll receive admin credentials via email upon approval</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <p>
                  Start uploading and sharing your khutbahs with the global
                  community
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterMosque;
