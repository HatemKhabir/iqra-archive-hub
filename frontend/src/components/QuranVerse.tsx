import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

const quranVerses = [
  {
    arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
    translation: "And whoever fears Allah - He will make for him a way out.",
    reference: "Quran 65:2"
  },
  {
    arabic: "وَبَشِّرِ الصَّابِرِينَ",
    translation: "And give good tidings to the patient.",
    reference: "Quran 2:155"
  },
  {
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "Indeed, with hardship [will be] ease.",
    reference: "Quran 94:6"
  },
  {
    arabic: "وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ",
    translation: "And my success is not but through Allah.",
    reference: "Quran 11:88"
  },
  {
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً",
    translation: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good.",
    reference: "Quran 2:201"
  }
];

const QuranVerse = () => {
  const [currentVerse, setCurrentVerse] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshVerse = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCurrentVerse(Math.floor(Math.random() * quranVerses.length));
      setIsRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    setCurrentVerse(Math.floor(Math.random() * quranVerses.length));
  }, []);

  const verse = quranVerses[currentVerse];

  return (
    <div className="verse-container fade-in">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-accent">Daily Verse</h3>
        <button
          onClick={refreshVerse}
          className={`p-2 rounded-lg bg-accent/10 hover:bg-accent/20 transition-all ${
            isRefreshing ? "animate-spin" : ""
          }`}
        >
          <RefreshCw className="h-4 w-4 text-accent" />
        </button>
      </div>
      
      <div className="space-y-4">
        <p className="text-2xl font-arabic text-right leading-relaxed text-foreground">
          {verse.arabic}
        </p>
        
        <div className="border-t border-accent/20 pt-3">
          <p className="text-lg italic text-muted-foreground mb-2">
            "{verse.translation}"
          </p>
          <p className="text-sm font-medium text-accent">
            {verse.reference}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuranVerse;