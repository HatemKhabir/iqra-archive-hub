import { Calendar, MapPin, Globe, Play, FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface KhutbahCardProps {
  id: string;
  title: string;
  date: Date | null;
  mosque: string;
  city: string;
  country: string;
  language: string;
  topic: string;
  hasAudio: boolean;
}

const KhutbahCard = ({
  id,
  title,
  date,
  mosque,
  city,
  country,
  language,
  topic,
  hasAudio,
}: KhutbahCardProps) => {
  return (
    <div className="mosque-card">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-foreground mb-1">
            {title}
          </h3>
          <div className="flex items-center text-sm text-muted-foreground space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>
                {date
                  ? date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "No date"}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>
                {city}, {country}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {hasAudio && (
            <div className="p-1 bg-accent/10 rounded">
              <Play className="h-3 w-3 text-accent" />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Mosque:</span> {mosque}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Topic:</span> {topic}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Globe className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium text-accent">{language}</span>
        </div>

        <div className="flex space-x-2">
          <Link
            to={`/khutbah/${id}`}
            className="btn-accent flex items-center space-x-1"
          >
            <FileText className="h-4 w-4" />
            <span>Read</span>
          </Link>
          {hasAudio && (
            <button className="btn-hero flex items-center space-x-1">
              <Play className="h-4 w-4" />
              <span>Listen</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default KhutbahCard;
