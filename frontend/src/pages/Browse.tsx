import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import KhutbahCard from "../components/KhutbahCard";
import { sampleKhutbahs, cities, mosques } from "../data/sampleData";
import { Search, Filter, Calendar, MapPin } from "lucide-react";
import { Country, City, State } from "country-state-city";
import {
  fetchKhotbasLanguages,
  fetchKhotbasTypes,
} from "@/services/filtersServices";
import { fetchFilteredKhotbas } from "@/services/khotbaService";
import { fetchRegisteredMosques } from "@/services/mosqueService";
import { PaginatedKhotbas } from "@/data/khotbaInterface";

const Browse = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedMosque, setSelectedMosque] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<{
    code: string;
    name: string;
  } | null>(null);
  const [selectedType, setSelectedType] = useState<{ khotbaType: string }>(
    null
  );
  const [filteredKhutbahs, setFilteredKhutbahs] = useState<PaginatedKhotbas>({
    content: [],
    pageable: {
      pageNumber: 0,
      pageSize: 10,
      sort: {
        sorted: false,
        unsorted: false,
        empty: true,
      },
      offset: 0,
      paged: true,
      unpaged: false,
    },
    last: true,
    totalElements: 0,
    totalPages: 0,
    size: 10,
    number: 0,
    first: true,
    numberOfElements: 0,
    sort: {
      sorted: false,
      unsorted: false,
      empty: true,
    },
    empty: true,
  });
  const [availableMosques, setAvailableMosques] = useState<
    Array<{ id: number; mosqueName: string; country: string; city: string }>
  >([]);
  const [languages, setLanguages] = useState<
    Array<{ code: string; name: string }>
  >([]);
  const [types, setTypes] = useState<Array<{ khotbaType: string }>>([]);

  useEffect(() => {
    fetchKhotbasLanguages()
      .then((data) => setLanguages(data))
      .catch((err) => console.error(err));
    fetchKhotbasTypes()
      .then((data) => setTypes(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!selectedCountry || !selectedCity) {
      return;
    }
    fetchRegisteredMosques(selectedCountry, selectedCity)
      .then((data) => setAvailableMosques(data))
      .catch((err) => console.error(err));
  }, [selectedCountry, selectedCity]);

  useEffect(() => {
    setFilteredKhutbahs({
      content: [],
      pageable: {
        pageNumber: 0,
        pageSize: 10,
        sort: {
          sorted: false,
          unsorted: false,
          empty: true,
        },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      last: true,
      totalElements: 0,
      totalPages: 0,
      size: 10,
      number: 0,
      first: true,
      numberOfElements: 0,
      sort: {
        sorted: false,
        unsorted: false,
        empty: true,
      },
      empty: true,
    });
  }, [selectedCountry, selectedCity,selectedMosque]);

  useEffect(() => {
    if (selectedMosque) {
      fetchFilteredKhotbas(
        parseInt(selectedMosque),
        selectedLanguage?.name,
        selectedType?.khotbaType
      )
        .then((data) => setFilteredKhutbahs(data))
        .catch((err) => {
          console.error("Failed to fetch khutbahs:", err);
          setFilteredKhutbahs({
            content: [],
            pageable: {
              pageNumber: 0,
              pageSize: 10,
              sort: {
                sorted: false,
                unsorted: false,
                empty: true,
              },
              offset: 0,
              paged: true,
              unpaged: false,
            },
            last: true,
            totalElements: 0,
            totalPages: 0,
            size: 10,
            number: 0,
            first: true,
            numberOfElements: 0,
            sort: {
              sorted: false,
              unsorted: false,
              empty: true,
            },
            empty: true,
          });
        });
    } else {
      setFilteredKhutbahs({
        content: [],
        pageable: {
          pageNumber: 0,
          pageSize: 10,
          sort: {
            sorted: false,
            unsorted: false,
            empty: true,
          },
          offset: 0,
          paged: true,
          unpaged: false,
        },
        last: true,
        totalElements: 0,
        totalPages: 0,
        size: 10,
        number: 0,
        first: true,
        numberOfElements: 0,
        sort: {
          sorted: false,
          unsorted: false,
          empty: true,
        },
        empty: true,
      });
    }
  }, [selectedMosque, selectedLanguage, selectedType]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Browse Khutbahs
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover inspiring sermons from mosques around the world
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mosque-card mb-8">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mb-6">
            {/* Country Filter */}
            <select
              className="px-3 py-2 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary"
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSelectedCountryCode(
                  Country.getAllCountries().find(
                    (c) => c.name === e.target.value
                  )?.isoCode || ""
                );
                setSelectedCity("");
                setSelectedMosque("");
              }}
            >
              <option value="">All Countries</option>
              {Country.getAllCountries().map((country, index) => (
                <option key={country.isoCode + index} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>

            {/* City Filter */}
            <select
              className="px-3 py-2 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary"
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setSelectedMosque("");
              }}
              disabled={!selectedCountry}
            >
              <option value="">All Cities</option>
              {City.getCitiesOfCountry(selectedCountryCode).map(
                (city, index) => (
                  <option key={city.countryCode + index} value={city.name}>
                    {city.name}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
            {/* Mosque Filter */}
            <select
              className="px-3 py-2 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary"
              value={selectedMosque}
              onChange={(e) => {
                setSelectedMosque(e.target.value);
                fetchFilteredKhotbas(
                  selectedMosque ? parseInt(selectedMosque) : null,
                  selectedLanguage?.code,
                  selectedType?.khotbaType
                )
                  .then((data) => setFilteredKhutbahs(data))
                  .catch((err) => console.error(err));
              }}
              disabled={!selectedCity}
            >
              <option value="">All Mosques</option>
              {availableMosques.map((mosque, index) => (
                <option key={`${mosque.id}-${index}`} value={mosque.id}>
                  {mosque.mosqueName}
                </option>
              ))}
            </select>

            {/* Language Filter */}
            <select
              className="px-3 py-2 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary"
              value={selectedLanguage?.code || ""}
              onChange={(e) => {
                const lang = languages.find((l) => l.code === e.target.value);
                setSelectedLanguage(lang || null);
              }}
            >
              <option value="">All Languages</option>
              {languages.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.name}
                </option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              className="px-3 py-2 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary"
              value={selectedType?.khotbaType || ""}
              onChange={(e) => {
                setSelectedType({ khotbaType: e.target.value });
              }}
            >
              <option value="">All Types</option>
              {types.map((type) => (
                <option key={type.khotbaType} value={type.khotbaType}>
                  {type.khotbaType}
                </option>
              ))}
            </select>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSelectedCountry("");
                setSelectedCity("");
                setSelectedMosque("");
                setFilteredKhutbahs(null);
                setSelectedType(null);
                setSelectedLanguage(null);
              }}
              className="btn-accent flex items-center justify-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Clear Filters</span>
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredKhutbahs.content.length} khutbah
            {filteredKhutbahs.content.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Khutbah Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredKhutbahs.content.map((khutbah) => (
            <KhutbahCard
              key={khutbah.mosqueId}
              id={khutbah.khotbaId}
              title={khutbah.title}
              date={
                khutbah.creationDate ? new Date(khutbah.creationDate) : null
              }
              mosque={khutbah.mosqueName}
              city={khutbah.city}
              country={khutbah.country}
              language={khutbah.officialLanguage}
              topic={khutbah.title}
              hasAudio={khutbah.hasAudio}
            />
          ))}
        </div>

        {filteredKhutbahs.content.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No khutbahs found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
