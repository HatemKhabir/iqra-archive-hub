export interface Khutbah {
  id: string;
  title: string;
  date: string;
  mosque: string;
  city: string;
  country: string;
  language: string;
  topic: string;
  hasAudio: boolean;
  hasVideo: boolean;
  content: {
    arabic?: string;
    english?: string;
    urdu?: string;
  };
}

export const sampleKhutbahs: Khutbah[] = [
  {
    id: "1",
    title: "The Importance of Gratitude in Islam",
    date: "2024-01-12",
    mosque: "Masjid Al-Noor",
    city: "Dubai",
    country: "UAE",
    language: "Arabic",
    topic: "Gratitude",
    hasAudio: true,
    hasVideo: false,
    content: {
      arabic: "الحمد لله رب العالمين، والصلاة والسلام على أشرف المرسلين محمد وعلى آله وصحبه أجمعين. أما بعد: فإن الشكر من أعظم العبادات وأجل الطاعات...",
      english: "All praise is due to Allah, Lord of all the worlds, and prayers and peace be upon the most noble of messengers, Muhammad, and upon his family and companions. To proceed: Indeed, gratitude is among the greatest acts of worship and the most sublime acts of obedience..."
    }
  },
  {
    id: "2",
    title: "Unity Among Muslims",
    date: "2024-01-05",
    mosque: "Islamic Center of London",
    city: "London",
    country: "UK",
    language: "English",
    topic: "Unity",
    hasAudio: true,
    hasVideo: true,
    content: {
      english: "Dear brothers and sisters, today we gather to reflect on one of the most crucial aspects of our faith - unity among believers. The Quran reminds us: 'And hold firmly to the rope of Allah all together and do not become divided.' (3:103)",
      arabic: "أيها الإخوة والأخوات الأعزاء، نجتمع اليوم للتأمل في أحد أهم جوانب إيماننا - الوحدة بين المؤمنين..."
    }
  },
  {
    id: "3",
    title: "Seeking Knowledge in Islam",
    date: "2023-12-29",
    mosque: "Masjid Toronto",
    city: "Toronto",
    country: "Canada",
    language: "English",
    topic: "Education",
    hasAudio: false,
    hasVideo: true,
    content: {
      english: "The pursuit of knowledge holds a sacred place in Islam. Our beloved Prophet (peace be upon him) said: 'Seek knowledge from the cradle to the grave.' This beautiful hadith encapsulates the Islamic perspective on lifelong learning..."
    }
  },
  {
    id: "4",
    title: "صبر اور استقامت",
    date: "2024-01-01",
    mosque: "Jamia Masjid Karachi",
    city: "Karachi",
    country: "Pakistan",
    language: "Urdu",
    topic: "Patience",
    hasAudio: true,
    hasVideo: false,
    content: {
      urdu: "بھائیو اور بہنو، آج ہم صبر اور استقامت کے موضوع پر بات کرتے ہیں۔ قرآن مجید میں اللہ تعالیٰ فرماتا ہے: 'اور صبر کرنے والوں کو خوشخبری دے دو'...",
      english: "Brothers and sisters, today we speak on the topic of patience and perseverance. In the Holy Quran, Allah Almighty says: 'And give good tidings to the patient...'"
    }
  },
  {
    id: "5",
    title: "Community Service and Social Responsibility",
    date: "2023-12-22",
    mosque: "Sydney Islamic Centre",
    city: "Sydney",
    country: "Australia",
    language: "English",
    topic: "Community",
    hasAudio: true,
    hasVideo: true,
    content: {
      english: "Islam teaches us that we are not isolated individuals, but rather part of a larger community with responsibilities toward one another. The concept of social responsibility is deeply embedded in our faith..."
    }
  }
];

export const countries = [
  "UAE", "UK", "Canada", "Pakistan", "Australia", "USA", "Saudi Arabia", "Malaysia", "Indonesia", "Turkey"
];

export const cities = {
  "UAE": ["Dubai", "Abu Dhabi", "Sharjah"],
  "UK": ["London", "Birmingham", "Manchester"],
  "Canada": ["Toronto", "Vancouver", "Montreal"],
  "Pakistan": ["Karachi", "Lahore", "Islamabad"],
  "Australia": ["Sydney", "Melbourne", "Brisbane"],
  "USA": ["New York", "Los Angeles", "Chicago"],
  "Saudi Arabia": ["Riyadh", "Jeddah", "Mecca"],
  "Malaysia": ["Kuala Lumpur", "Penang", "Johor Bahru"],
  "Indonesia": ["Jakarta", "Surabaya", "Bandung"],
  "Turkey": ["Istanbul", "Ankara", "Izmir"]
};

export const mosques = {
  "Dubai": ["Masjid Al-Noor", "Jumeirah Mosque", "Al Farooq Omar Mosque"],
  "London": ["Islamic Center of London", "East London Mosque", "Regent's Park Mosque"],
  "Toronto": ["Masjid Toronto", "Islamic Society of Toronto", "Jami Mosque"],
  "Karachi": ["Jamia Masjid Karachi", "Masjid-e-Tooba", "Gizri Mosque"],
  "Sydney": ["Sydney Islamic Centre", "Auburn Gallipoli Mosque", "Lakemba Mosque"]
};