// CinePulse Rich Mock Movie Database Service

export const mockMovies = [
  {
    id: 1,
    title: "Interstellar",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    rating: 8.7,
    releaseYear: 2014,
    releaseDate: "November 7, 2014",
    runtime: "169 min",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    director: "Christopher Nolan",
    budget: "$165,000,000",
    revenue: "$701,729,206",
    cast: [
      { name: "Matthew McConaughey", character: "Cooper", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
      { name: "Anne Hathaway", character: "Brand", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" },
      { name: "Jessica Chastain", character: "Murph", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80" },
      { name: "Michael Caine", character: "Professor Brand", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" }
    ],
    reviews: [
      { id: 101, author: "AstroGeek", rating: 9, content: "A masterpiece of modern cinema. The visual fidelity and Hans Zimmer's organ-heavy score combined to create an emotional, epic journey through space-time.", date: "June 12, 2026" },
      { id: 102, author: "Cinephile99", rating: 8, content: "Stunning visuals and great performances, though the third act's metaphysical resolutions feel slightly forced. Still, a must-watch on the biggest screen possible.", date: "June 20, 2026" }
    ],
    trailerUrl: "https://www.youtube.com/embed/zSWdZVtXT7E",
    similar: [2, 3, 7]
  },
  {
    id: 2,
    title: "Inception",
    tagline: "Your mind is the scene of the crime.",
    overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets, is offered a chance to regain his old life as payment for a task considered to be impossible: inception.",
    rating: 8.8,
    releaseYear: 2010,
    releaseDate: "July 16, 2010",
    runtime: "148 min",
    genres: ["Sci-Fi", "Action", "Thriller"],
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&auto=format&fit=crop&q=80",
    director: "Christopher Nolan",
    budget: "$160,000,000",
    revenue: "$836,836,967",
    cast: [
      { name: "Leonardo DiCaprio", character: "Cobb", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" },
      { name: "Joseph Gordon-Levitt", character: "Arthur", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80" },
      { name: "Elliot Page", character: "Ariadne", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
      { name: "Tom Hardy", character: "Eames", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" }
    ],
    reviews: [
      { id: 201, author: "DreamWeaver", rating: 10, content: "Mind-bending execution. The folding city scene is iconic, and the balance of heist mechanics and emotional gravity is perfect. Spinning top still leaves me guessing.", date: "May 10, 2026" }
    ],
    trailerUrl: "https://www.youtube.com/embed/YoHD9XEInc0",
    similar: [1, 3, 8]
  },
  {
    id: 3,
    title: "Blade Runner 2049",
    tagline: "There's still a page left.",
    overview: "Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos.",
    rating: 8.0,
    releaseYear: 2017,
    releaseDate: "October 6, 2017",
    runtime: "164 min",
    genres: ["Sci-Fi", "Drama", "Mystery"],
    poster: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1547483238-f400e65ccd56?w=1200&auto=format&fit=crop&q=80",
    director: "Denis Villeneuve",
    budget: "$150,000,000",
    revenue: "$267,700,000",
    cast: [
      { name: "Ryan Gosling", character: "K", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" },
      { name: "Harrison Ford", character: "Rick Deckard", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80" },
      { name: "Ana de Armas", character: "Joi", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
      { name: "Sylvia Hoeks", character: "Luv", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" }
    ],
    reviews: [
      { id: 301, author: "NeoTokyo", rating: 9, content: "Roger Deakins' cinematography is breathtaking. Every frame is a painting. A slow-burn masterpiece that respects the original while forging its own path.", date: "June 2, 2026" }
    ],
    trailerUrl: "https://www.youtube.com/embed/gCcx85zLyLI",
    similar: [1, 2, 8]
  },
  {
    id: 4,
    title: "Spirited Away",
    tagline: "Nothing that happens is ever forgotten, even if you can't remember it.",
    overview: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    rating: 8.6,
    releaseYear: 2001,
    releaseDate: "July 20, 2001",
    runtime: "125 min",
    genres: ["Anime", "Fantasy", "Adventure"],
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80",
    director: "Hayao Miyazaki",
    budget: "$19,000,000",
    revenue: "$395,800,000",
    cast: [
      { name: "Rumi Hiiragi", character: "Chihiro (voice)", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
      { name: "Miyu Irino", character: "Haku (voice)", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80" },
      { name: "Mari Natsuki", character: "Yubaba (voice)", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" }
    ],
    reviews: [
      { id: 401, author: "GhibliFan", rating: 10, content: "Pure magic. The hand-drawn animation, the themes of identity and greed, and the whimsical yet melancholic tone. Miyazaki at his absolute peak.", date: "March 15, 2026" }
    ],
    trailerUrl: "https://www.youtube.com/embed/ByXuk9QqQkk",
    similar: [5, 10]
  },
  {
    id: 5,
    title: "Your Name.",
    tagline: "Once in a while when I wake up. I find myself crying.",
    overview: "Two strangers find themselves linked in a bizarre way. When a connection is formed, will distance be the only thing to keep them apart?",
    rating: 8.4,
    releaseYear: 2016,
    releaseDate: "August 26, 2016",
    runtime: "106 min",
    genres: ["Anime", "Romance", "Drama"],
    poster: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=500&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=1200&auto=format&fit=crop&q=80",
    director: "Makoto Shinkai",
    budget: "$3,400,000",
    revenue: "$382,238,181",
    cast: [
      { name: "Ryunosuke Kamiki", character: "Taki Tachibana (voice)", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80" },
      { name: "Mone Kamishiraishi", character: "Mitsuha Miyamizu (voice)", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" }
    ],
    reviews: [
      { id: 501, author: "AnimeLover", rating: 9, content: "Gorgeous animation! Shinkai's depiction of the sky, clouds, and light is unparalleled. The emotional climax left me in tears.", date: "April 29, 2026" }
    ],
    trailerUrl: "https://www.youtube.com/embed/xU47yPb44Mw",
    similar: [4, 9]
  },
  {
    id: 6,
    title: "Pulp Fiction",
    tagline: "Just because you are a character doesn't mean that you have character.",
    overview: "A burger-loving hitman, his philosophical partner, a drug-addled gangster's moll, and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that weave back and forth.",
    rating: 8.9,
    releaseYear: 1994,
    releaseDate: "October 14, 1994",
    runtime: "154 min",
    genres: ["Crime", "Drama", "Thriller"],
    poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80",
    director: "Quentin Tarantino",
    budget: "$8,000,000",
    revenue: "$213,928,762",
    cast: [
      { name: "John Travolta", character: "Vincent Vega", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
      { name: "Samuel L. Jackson", character: "Jules Winnfield", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80" },
      { name: "Uma Thurman", character: "Mia Wallace", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
      { name: "Bruce Willis", character: "Butch Coolidge", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80" }
    ],
    reviews: [
      { id: 601, author: "TarantinoStan", rating: 10, content: "Revolutionary non-linear structure, dialogue that popped, and unforgettable scenes. It redefined independent cinema in the 90s.", date: "January 14, 2026" }
    ],
    trailerUrl: "https://www.youtube.com/embed/s7EdQ4FqbhY",
    similar: [2, 7]
  },
  {
    id: 7,
    title: "The Dark Knight",
    tagline: "Why So Serious?",
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
    rating: 9.0,
    releaseYear: 2008,
    releaseDate: "July 18, 2008",
    runtime: "152 min",
    genres: ["Action", "Crime", "Drama"],
    poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=500&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80",
    director: "Christopher Nolan",
    budget: "$185,000,000",
    revenue: "$1,006,234,167",
    cast: [
      { name: "Christian Bale", character: "Bruce Wayne / Batman", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" },
      { name: "Heath Ledger", character: "Joker", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80" },
      { name: "Aaron Eckhart", character: "Harvey Dent / Two-Face", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" }
    ],
    reviews: [
      { id: 701, author: "GothamKnight", rating: 10, content: "Heath Ledger gave the performance of a lifetime. The movie is less of a standard comic book film and more of a gritty crime epic.", date: "June 11, 2026" }
    ],
    trailerUrl: "https://www.youtube.com/embed/EXeTwQWrcwY",
    similar: [2, 6]
  },
  {
    id: 8,
    title: "Dune: Part Two",
    tagline: "Long live the fighters.",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
    rating: 8.6,
    releaseYear: 2024,
    releaseDate: "March 1, 2024",
    runtime: "166 min",
    genres: ["Sci-Fi", "Adventure", "Action"],
    poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1200&auto=format&fit=crop&q=80",
    director: "Denis Villeneuve",
    budget: "$190,000,000",
    revenue: "$712,000,000",
    cast: [
      { name: "Timothée Chalamet", character: "Paul Atreides", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80" },
      { name: "Zendaya", character: "Chani", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
      { name: "Rebecca Ferguson", character: "Lady Jessica", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" },
      { name: "Austin Butler", character: "Feyd-Rautha Harkonnen", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80" }
    ],
    reviews: [
      { id: 801, author: "ArrakisDreamer", rating: 9, content: "Stunning sound design and visuals. The spice harvesting scenes and the sandworm ride were epic. Villeneuve did justice to Frank Herbert's universe.", date: "March 20, 2026" }
    ],
    trailerUrl: "https://www.youtube.com/embed/Way9Dexny3w",
    similar: [1, 3]
  },
  {
    id: 9,
    title: "La La Land",
    tagline: "Here's to the fools who dream.",
    overview: "Sebastian and Mia are drawn together by their common desire to do what they love. But as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.",
    rating: 8.0,
    releaseYear: 2016,
    releaseDate: "December 9, 2016",
    runtime: "128 min",
    genres: ["Romance", "Drama", "Music"],
    poster: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&auto=format&fit=crop&q=80",
    director: "Damien Chazelle",
    budget: "$30,000,000",
    revenue: "$447,402,761",
    cast: [
      { name: "Ryan Gosling", character: "Sebastian", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" },
      { name: "Emma Stone", character: "Mia", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" }
    ],
    reviews: [
      { id: 901, author: "JazzLover", rating: 9, content: "Charming musical numbers, vibrant colors, and a bittersweet ending that hits hard. Ryan Gosling and Emma Stone have amazing chemistry.", date: "May 25, 2026" }
    ],
    trailerUrl: "https://www.youtube.com/embed/0pdqf4P9MB8",
    similar: [5, 10]
  },
  {
    id: 10,
    title: "Spider-Man: Into the Spider-Verse",
    tagline: "More than one wears the mask.",
    overview: "Miles Morales is juggling his life between being a high school student and being a spider-man. When Wilson 'Kingpin' Fisk uses a super collider, others from across the Spider-Verse are pulled into this dimension.",
    rating: 8.4,
    releaseYear: 2018,
    releaseDate: "December 14, 2018",
    runtime: "117 min",
    genres: ["Anime", "Action", "Adventure"],
    poster: "https://images.unsplash.com/photo-1608889174633-41443632238c?w=500&auto=format&fit=crop&q=80",
    backdrop: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&auto=format&fit=crop&q=80",
    director: "Bob Persichetti",
    budget: "$90,000,000",
    revenue: "$375,540,831",
    cast: [
      { name: "Shameik Moore", character: "Miles Morales (voice)", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80" },
      { name: "Jake Johnson", character: "Peter B. Parker (voice)", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80" },
      { name: "Hailee Steinfeld", character: "Gwen Stacy (voice)", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" }
    ],
    reviews: [
      { id: 1001, author: "ComicBookFan", rating: 10, content: "Visual triumph! The style resembles a comic book coming to life. The soundtrack is fire and the message is incredibly inspiring.", date: "April 18, 2026" }
    ],
    trailerUrl: "https://www.youtube.com/embed/g4Hbz2yWDVM",
    similar: [4, 5, 7]
  }
];

// Helper functions
export const getMovieById = (id) => {
  return mockMovies.find(m => m.id === parseInt(id));
};

export const searchMockMovies = (query) => {
  if (!query) return mockMovies;
  const q = query.toLowerCase();
  return mockMovies.filter(m => 
    m.title.toLowerCase().includes(q) || 
    m.genres.some(g => g.toLowerCase().includes(q)) ||
    m.director.toLowerCase().includes(q)
  );
};

export const getMoviesByGenre = (genre) => {
  return mockMovies.filter(m => m.genres.includes(genre));
};

export const getAllGenres = () => {
  const genresSet = new Set();
  mockMovies.forEach(m => m.genres.forEach(g => genresSet.add(g)));
  return Array.from(genresSet);
};
