/* ============================================
   PlayNaw - Film Data & CDN Configuration
   ============================================ */

(function () {
  'use strict';

  // Cegah deklarasi ganda
  if (window.CONFIG) return;

  window.CONFIG = {
    CDN_BASE: 'https://cdn.aceimg.com/',
    VIDEO_BASE: 'https://cdn2.videy.co/',

    getPosterUrl: function (id) {
      return this.CDN_BASE + id + '.jpg';
    },

    getVideoUrl: function (id) {
      return this.VIDEO_BASE + id + '.mp4';
    },

    LOGO_URL: 'https://cdn.aceimg.com/cFnF98ngQ.jpg',
    SITE_NAME: 'PlayNaw',
    SITE_TAGLINE: 'Watch Movies & Series Anytime'
  };

  window.FILMS = [
    {
      id: 'h4pJqNKT1',
      title: 'He be wild… and I’m still down bad 😂',
      year: 2025,
      rating: 8.5,
      genre: 'Trending',
      duration: '—',
      description: 'He be wild… and I’m still down bad 😂',
      posterUrl: 'https://cdn.aceimg.com/GiCPY2Jbm.jpg'
    },
    {
      id: 'aiAOqELW1',
      title: 'I was gaspin fr 😮‍',
      year: 2025,
      rating: 8.3,
      genre: 'Trending',
      duration: '—',
      description: 'I was gaspin fr 😮‍',
      posterUrl: 'https://cdn.aceimg.com/MLBojCs1o.jpg'
    },
    {
      id: 'CezkZXHn1',
      title: 'Nah why I’m really thinkin bout it rn 😂',
      year: 2025,
      rating: 8.1,
      genre: 'Trending',
      duration: '—',
      description: 'Nah why I’m really thinkin bout it rn 😂',
      posterUrl: 'https://cdn.aceimg.com/sS6nQ2dBz.jpg'
    },
    {
      id: 'UOXvLtD61',
      title: 'Oh… this angle hit diff 😏',
      year: 2025,
      rating: 8.6,
      genre: 'Trending',
      duration: '—',
      description: 'Oh… this angle hit diff 😏',
      posterUrl: 'https://cdn.aceimg.com/uVKeKkOsW.jpg'
    },
    {
      id: 'kmIuAo5e1',
      title: 'Wait… what style is THIS fr 😳',
      year: 2025,
      rating: 8.4,
      genre: 'Trending',
      duration: '—',
      description: 'Wait… what style is THIS fr 😳',
      posterUrl: 'https://cdn.aceimg.com/HJ2NW02Kg.jpg'
    },
    {
      id: 'J4bwiWFP1',
      title: 'You ridin like a cowboy fr 🤠',
      year: 2025,
      rating: 8.2,
      genre: 'Trending',
      duration: '—',
      description: 'You ridin like a cowboy fr 🤠',
      posterUrl: 'https://cdn.aceimg.com/CP5AZZyU7.jpg'
    },
    {
      id: 'JVkljja21',
      title: 'Ain’t no way everybody not want you 😳',
      year: 2025,
      rating: 8.7,
      genre: 'Trending',
      duration: '—',
      description: 'Ain’t no way everybody not want you 😳',
      posterUrl: 'https://cdn.aceimg.com/3sgH89fov.jpg'
    },
    {
      id: 'bHQcsieZ1',
      title: 'After some weeks… I leveled up fr 😏',
      year: 2025,
      rating: 8.0,
      genre: 'Trending',
      duration: '—',
      description: 'After some weeks… I leveled up fr 😏',
      posterUrl: 'https://cdn.aceimg.com/cSAW6Zzf7.jpg'
    },
    {
      id: 'Tfz6RMmM1',
      title: 'Nah… our story ain’t done yet 😏',
      year: 2025,
      rating: 8.3,
      genre: 'Trending',
      duration: '—',
      description: 'Nah… our story ain’t done yet 😏',
      posterUrl: 'https://cdn.aceimg.com/WEiEuIAyx.jpg'
    },
    {
      id: 'JRP3wcl71',
      title: 'Vibin like a Spanish girl 😳',
      year: 2025,
      rating: 8.5,
      genre: 'Trending',
      duration: '—',
      description: 'Vibin like a Spanish girl 😳',
      posterUrl: 'https://cdn.aceimg.com/UTk4w7tpr.jpg'
    },
    {
      id: 'BrgWsAg71',
      title: 'Ain’t No Way It Feel Like This 😭',
      year: 2025,
      rating: 8.5,
      genre: 'Trending',
      duration: '—',
      description: 'Ain’t No Way It Feel Like This 😭',
      posterUrl: 'https://cdn.aceimg.com/4wrQeISd7.jpg'
    },
    {
      id: 'YM4K6GbX1',
      title: 'Wait... He Was There Already?! 🤯',
      year: 2025,
      rating: 8.5,
      genre: 'Trending',
      duration: '—',
      description: 'Wait... He Was There Already?! 🤯',
      posterUrl: 'https://cdn.aceimg.com/R6sMNkxwl.jpg'
    },
    {
      id: 'uZnNjbuQ1',
      title: 'Did It Without Him, No Cap 😤',
      year: 2025,
      rating: 8.5,
      genre: 'Trending',
      duration: '—',
      description: 'Did It Without Him, No Cap 😤',
      posterUrl: 'https://cdn.aceimg.com/a7n3nAre8.jpg'
    },
    {
      id: 'Qq9I3ZUM1',
      title: 'Whole Time They Was Fakin 😬',
      year: 2025,
      rating: 8.5,
      genre: 'Trending',
      duration: '—',
      description: 'Whole Time They Was Fakin 😬',
      posterUrl: 'https://cdn.aceimg.com/hQzWpuJRx.jpg'
    },
    {
      id: '49XTS3W61',
      title: 'Nahh, That Move Too Wild 😳',
      year: 2025,
      rating: 8.5,
      genre: 'Trending',
      duration: '—',
      description: 'Nahh, That Move Too Wild 😳',
      posterUrl: 'https://cdn.aceimg.com/b3piVXxwB.jpg'
    },
    {
      id: 'raMzK8Il1',
      title: 'Nah Fr, This Water Changed Me 😳',
      year: 2025,
      rating: 8.5,
      genre: 'Trending',
      duration: '—',
      description: 'Nah Fr, This Water Changed Me 😳',
      posterUrl: 'https://cdn.aceimg.com/A7vh5P3Wh.jpg'
    },
    {
      id: 'g8gKdM6v1',
      title: 'That Position Got Him Zoomin 😭',
      year: 2025,
      rating: 8.5,
      genre: 'Trending',
      duration: '—',
      description: 'That Position Got Him Zoomin 😭',
      posterUrl: 'https://cdn.aceimg.com/Ztjpkuy1T.jpg'
    },
    {
      id: 'MuJ76Ith1',
      title: 'Nah Fr, I m Lovin This Vibe 😌',
      year: 2025,
      rating: 8.5,
      genre: 'Trending',
      duration: '—',
      description: 'Nah Fr, I m Lovin This Vibe 😌',
      posterUrl: 'https://cdn.aceimg.com/9oBbuktZ5.jpg'
    },
    {
      id: 'zNwXgA7b1',
      title: 'Nah Fr, He Know Every Style 😮',
      year: 2025,
      rating: 8.5,
      genre: 'Trending',
      duration: '—',
      description: 'Nah Fr, He Know Every Style 😮',
      posterUrl: 'https://cdn.aceimg.com/8udATxgAs.jpg'
    },
    {
      id: 'Lz0IJA1G1',
      title: 'They Got Me Feelin Special 👑',
      year: 2025,
      rating: 8.5,
      genre: 'Trending',
      duration: '—',
      description: 'They Got Me Feelin Special 👑',
      posterUrl: 'https://cdn.aceimg.com/TAUDYqG8o.jpg'
    }
  ];

  window.getFilmById = function (id) {
    var film = window.FILMS.find(function (f) { return f.id === id; });
    if (!film) return null;
    return Object.assign({}, film, {
      posterUrl: film.posterUrl || window.CONFIG.getPosterUrl(film.id),
      videoUrl: film.videoUrl || window.CONFIG.getVideoUrl(film.id)
    });
  };

  window.getAllFilms = function () {
    return window.FILMS.map(function (film) {
      return Object.assign({}, film, {
        posterUrl: film.posterUrl || window.CONFIG.getPosterUrl(film.id),
        videoUrl: film.videoUrl || window.CONFIG.getVideoUrl(film.id)
      });
    });
  };

  window.getFeaturedFilms = function () {
    var all = window.getAllFilms();
    return {
      main: all[0] || null,
      side: all.slice(1, 4)
    };
  };

  window.getRelatedFilms = function (currentId, limit) {
    limit = limit || 5;
    return window.getAllFilms()
      .filter(function (f) { return f.id !== currentId; })
      .slice(0, limit);
  };
})();