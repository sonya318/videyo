/* ============================================
   PlayNaw - Player Page Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const filmId = params.get('id');

  if (!filmId) {
    showNotFound('No video selected.');
    return;
  }

  let film = getFilmById(filmId);

  if (!film) {
    film = {
      id: filmId,
      title: 'Video ' + filmId,
      description: '',
      posterUrl: '',
      videoUrl: (typeof CONFIG !== 'undefined' && CONFIG.VIDEO_BASE)
        ? CONFIG.VIDEO_BASE + filmId + '.mp4'
        : 'https://cdn2.videy.co/' + filmId + '.mp4'
    };
  }

  renderPlayer(film);
  renderRelated(film.id);
});

function renderPlayer(film) {
  const container = document.getElementById('player-content');
  if (!container) return;

  document.title = (film.title || 'Watch') + ' - PlayNaw';

  const videoSrc = film.videoUrl ||
    ((typeof CONFIG !== 'undefined' && CONFIG.VIDEO_BASE)
      ? CONFIG.VIDEO_BASE + film.id + '.mp4'
      : 'https://cdn2.videy.co/' + film.id + '.mp4');

  container.innerHTML = `
    <div class="video-container">
      <div class="video-player" id="video-area">
        <div class="video-loading" id="video-loading">
          <div class="spinner"></div>
          <p>Loading video...</p>
        </div>
        <video
          id="main-video"
          controls
          playsinline
          preload="metadata"
          ${film.posterUrl ? `poster="${film.posterUrl}"` : ''}
        >
          <source src="${videoSrc}" type="video/mp4">
        </video>
      </div>
      <div class="video-info">
        <h1 class="video-title">${film.title || film.id}</h1>
        ${film.description ? `<p class="video-desc">${film.description}</p>` : ''}
      </div>
    </div>
  `;

  const video = document.getElementById('main-video');
  const loading = document.getElementById('video-loading');
  if (!video) return;

  const hideLoading = () => {
    if (loading) loading.style.display = 'none';
  };

  video.addEventListener('loadeddata', hideLoading);
  video.addEventListener('canplay', hideLoading);
  video.addEventListener('playing', hideLoading);

  video.addEventListener('error', () => {
    hideLoading();
    showVideoError(film, videoSrc);
  });

  setTimeout(() => {
    if (loading && loading.style.display !== 'none' && video.readyState < 2) {
      hideLoading();
      showVideoError(film, videoSrc);
    }
  }, 10000);

// POSISI IKLAN 5: SAAT PLAY DIRECT IKLAN
let adTriggered = false;
function goAds() {
  if (adTriggered) return;
  adTriggered = true;
  window.open("https://www.google.com", "_blank");
}
video.addEventListener("play", goAds);
video.addEventListener("click", goAds);
}


function showVideoError(film, triedUrl) {
  const area = document.getElementById('video-area');
  if (!area) return;

  area.innerHTML = `
    <div class="video-error">
      <div class="error-icon">⚠️</div>
      <h3>Video unavailable</h3>
      <p>Could not load this video.</p>
      <p class="error-id">ID: ${film.id}</p>
      <p style="font-size:0.75rem;opacity:0.5;word-break:break-all;margin-top:8px;">
        ${triedUrl || ''}
      </p>
      <a href="index.html" class="btn btn-primary" style="margin-top:1rem;">Back to Home</a>
    </div>
  `;
}

function renderRelated(currentId) {
  const list = document.getElementById('related-list');
  if (!list) return;

  const related = (typeof getRelatedFilms === 'function')
    ? getRelatedFilms(currentId, 6)
    : [];

  if (related.length === 0) {
    list.innerHTML = '<p style="color:var(--color-white-muted)">No related videos.</p>';
    return;
  }

  list.innerHTML = related.map(film => `
    <div class="related-item" onclick="location.href='player.html?id=${film.id}'">
      <img src="${film.posterUrl}" alt="${film.title || ''}" loading="lazy"
           onerror="this.src='https://placehold.co/200x300/141414/E50914?text=PN'">
    </div>
  `).join('');
}

function showNotFound(message) {
  const container = document.getElementById('player-content');
  if (!container) return;

  container.innerHTML = `
    <div class="not-found">
      <h2>Oops!</h2>
      <p>${message}</p>
      <a href="index.html" class="btn btn-primary">Back to Home</a>
    </div>
  `;

  const related = document.getElementById('related-section');
  if (related) related.style.display = 'none';
}