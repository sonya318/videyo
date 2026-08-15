/* ============================================
   PlayNaw - Landing Page Interactions
   ============================================ */

(function () {
  'use strict';

  var state = {
    currentGenre: 'all',
    currentSearch: '',
    displayedCount: 0,
    perPage: 8
  };

  document.addEventListener('DOMContentLoaded', function () {
    initHeader();
    initHeroSlider();
    renderTrendingMovies(true);
    renderFeatured();
    initSearch();
    initGenreFilter();
    initLoadMore();
    initMobileMenu();
  });

  function initHeader() {
    var header = document.querySelector('.header');
    if (!header) return;
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  function initHeroSlider() {
    var slider = document.getElementById('hero-slider');
    var dotsContainer = document.getElementById('hero-dots');
    if (!slider || typeof getAllFilms !== 'function') return;

    var films = getAllFilms().slice(0, 6);
    if (!films.length) return;

    slider.innerHTML = films.map(function (film, i) {
      return '<div class="hero-slide' + (i === 0 ? ' active' : '') + '">' +
        '<img src="' + film.posterUrl + '" alt="' + (film.title || '') + '" loading="eager" ' +
        'onerror="this.src=\'https://placehold.co/1600x900/141414/E50914?text=PlayNaw\'">' +
        '</div>';
    }).join('');

    if (dotsContainer) {
      dotsContainer.innerHTML = films.map(function (_, i) {
        return '<button class="hero-dot' + (i === 0 ? ' active' : '') + '" data-index="' + i + '"></button>';
      }).join('');
      dotsContainer.querySelectorAll('.hero-dot').forEach(function (dot) {
        dot.addEventListener('click', function () {
          goToSlide(parseInt(dot.getAttribute('data-index'), 10));
        });
      });
    }

    var current = 0;
    var timer = null;
    var INTERVAL = 4500;

    function goToSlide(index) {
      var slides = slider.querySelectorAll('.hero-slide');
      var dots = dotsContainer ? dotsContainer.querySelectorAll('.hero-dot') : [];
      if (slides[current]) slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      if (slides[current]) slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
      clearInterval(timer);
      timer = setInterval(function () { goToSlide(current + 1); }, INTERVAL);
    }

    timer = setInterval(function () { goToSlide(current + 1); }, INTERVAL);
  }

  function getFilteredFilms() {
    var films = typeof getAllFilms === 'function' ? getAllFilms() : [];

    if (state.currentGenre && state.currentGenre !== 'all') {
      films = films.filter(function (f) {
        return (f.genre || '').toLowerCase().indexOf(state.currentGenre.toLowerCase()) !== -1;
      });
    }

    if (state.currentSearch) {
      var q = state.currentSearch.toLowerCase();
      films = films.filter(function (f) {
        return (f.title || '').toLowerCase().indexOf(q) !== -1 ||
               (f.description || '').toLowerCase().indexOf(q) !== -1 ||
               (f.genre || '').toLowerCase().indexOf(q) !== -1;
      });
    }

    return films;
  }

  function renderTrendingMovies(reset) {
    var grid = document.getElementById('trending-grid');
    var loadBtn = document.getElementById('load-more-btn');
    var countEl = document.getElementById('result-count');
    var searchInfo = document.getElementById('search-info');
    if (!grid) return;

    if (reset) {
      state.displayedCount = 0;
      grid.innerHTML = '';
    }

    var films = getFilteredFilms();
    var total = films.length;

    if (countEl) {
      countEl.textContent = total > 0 ? total + ' video' + (total > 1 ? 's' : '') : '';
    }

    if (searchInfo) {
      if (state.currentSearch) {
        searchInfo.style.display = 'block';
        searchInfo.innerHTML = 'Search results for "<strong>' + state.currentSearch + '</strong>" — ' + total +
          ' found <button type="button" class="clear-search" id="clear-search-btn">Clear</button>';
        var clearBtn = document.getElementById('clear-search-btn');
        if (clearBtn) clearBtn.onclick = clearSearch;
      } else {
        searchInfo.style.display = 'none';
      }
    }

    if (total === 0) {
      grid.innerHTML = '<div class="empty-state">No videos found.</div>';
      if (loadBtn) loadBtn.style.display = 'none';
      return;
    }

    var next = films.slice(state.displayedCount, state.displayedCount + state.perPage);
    state.displayedCount += next.length;

    grid.insertAdjacentHTML('beforeend', next.map(function (film) {
      return '<article class="movie-card" data-id="' + film.id + '">' +
        '<div class="movie-poster">' +
          '<img src="' + film.posterUrl + '" alt="' + (film.title || '') + '" loading="lazy" ' +
          'onerror="this.src=\'https://placehold.co/300x450/141414/E50914?text=PlayNaw\'">' +
          '<div class="movie-overlay"><button class="play-btn" type="button" aria-label="Play">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button></div>' +
        '</div>' +
        '<div class="movie-info"><h3 class="movie-title">' + (film.title || '') + '</h3></div>' +
      '</article>';
    }).join(''));

    grid.querySelectorAll('.movie-card').forEach(function (card) {
      card.onclick = function () {
        goToPlayer(card.getAttribute('data-id'));
      };
    });

    if (loadBtn) {
      loadBtn.style.display = state.displayedCount < total ? 'inline-flex' : 'none';
    }
  }

  function initLoadMore() {
    var btn = document.getElementById('load-more-btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      renderTrendingMovies(false);
    });
  }

  function initGenreFilter() {
    var cards = document.querySelectorAll('.genre-card');
    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        cards.forEach(function (c) { c.classList.remove('active'); });
        card.classList.add('active');
        state.currentGenre = card.getAttribute('data-genre') || 'all';
        renderTrendingMovies(true);
        var el = document.getElementById('trending');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  function initSearch() {
    var input = document.getElementById('search-input');
    if (!input) return;
    var debounce;
    input.addEventListener('input', function (e) {
      clearTimeout(debounce);
      debounce = setTimeout(function () {
        state.currentSearch = e.target.value.trim();
        renderTrendingMovies(true);
      }, 300);
    });
  }

  function clearSearch() {
    state.currentSearch = '';
    var input = document.getElementById('search-input');
    if (input) input.value = '';
    renderTrendingMovies(true);
  }

  function renderFeatured() {
    if (typeof getFeaturedFilms !== 'function') return;
    var featured = getFeaturedFilms();
    if (!featured.main) return;

    var mainEl = document.getElementById('featured-main');
    var sideEl = document.getElementById('featured-side');

    if (mainEl) {
      mainEl.innerHTML =
        '<img src="' + featured.main.posterUrl + '" alt="' + featured.main.title + '" ' +
        'onerror="this.src=\'https://placehold.co/800x450/141414/E50914?text=PlayNaw\'">' +
        '<div class="featured-main-content">' +
          '<h3>' + featured.main.title + '</h3>' +
          '<p>' + (featured.main.description || '') + '</p>' +
          '<button type="button" class="btn btn-primary" data-id="' + featured.main.id + '">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> Watch Now</button>' +
        '</div>';
      var btn = mainEl.querySelector('button[data-id]');
      if (btn) btn.onclick = function () { goToPlayer(btn.getAttribute('data-id')); };
    }

    if (sideEl) {
      sideEl.innerHTML = featured.side.map(function (film) {
        return '<div class="featured-side-item" data-id="' + film.id + '">' +
          '<img src="' + film.posterUrl + '" alt="' + film.title + '" ' +
          'onerror="this.src=\'https://placehold.co/180x270/141414/E50914?text=PN\'">' +
          '<div class="featured-side-info"><h4>' + film.title + '</h4><p>' + (film.genre || '') + '</p></div></div>';
      }).join('');
      sideEl.querySelectorAll('.featured-side-item').forEach(function (item) {
        item.onclick = function () { goToPlayer(item.getAttribute('data-id')); };
      });
    }
  }

  function initMobileMenu() {
    var toggle = document.querySelector('.menu-toggle');
    var nav = document.querySelector('.nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  function goToPlayer(id) {
    window.location.href = 'player.html?id=' + encodeURIComponent(id);
  }

  // expose clearSearch if needed
  window.clearSearch = clearSearch;
})();